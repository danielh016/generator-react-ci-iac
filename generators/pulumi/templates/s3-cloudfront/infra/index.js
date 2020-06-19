const pulumi = require('@pulumi/pulumi');
const aws = require('@pulumi/aws');

const config = new pulumi.Config();
const bucketName = config.require('bucketName');

// Create an AWS resource (S3 Bucket)
const bucket = new aws.s3.Bucket(bucketName, {
  website: {
    errorDocument: 'index.html',
    indexDocument: 'index.html',
  },
});

const originAccessIdentity = new aws.cloudfront.OriginAccessIdentity('originAccessIdentity', {
  comment: `Access Identity for ${bucketName}`,
});

const s3Distribution = new aws.cloudfront.Distribution('s3Distribution', {
  comment: bucketName,
  defaultCacheBehavior: {
    allowedMethods: ['GET', 'HEAD'],
    cachedMethods: ['GET', 'HEAD'],
    defaultTtl: 3600,
    forwardedValues: {
      cookies: {
        forward: 'none',
      },
      queryString: false,
    },
    maxTtl: 86400,
    minTtl: 0,
    targetOriginId: bucket.arn,
    viewerProtocolPolicy: 'redirect-to-https',
  },
  defaultRootObject: 'index.html',
  enabled: true,
  isIpv6Enabled: true,
  origins: [
    {
      domainName: bucket.bucketRegionalDomainName,
      originId: bucket.arn,
      s3OriginConfig: {
        originAccessIdentity: originAccessIdentity.cloudfrontAccessIdentityPath,
      },
    },
  ],
  priceClass: 'PriceClass_All',
  restrictions: {
    geoRestriction: {
      restrictionType: 'none',
    },
  },
  customErrorResponses: [
    { errorCode: 404, responseCode: 200, responsePagePath: '/index.html' },
    { errorCode: 403, responseCode: 200, responsePagePath: '/index.html' },
  ],
  viewerCertificate: {
    cloudfrontDefaultCertificate: true,
  },
});

function publicReadPolicyForBucket(bName, originAccessArn) {
  return JSON.stringify({
    Version: '2012-10-17',
    Statement: [
      {
        Sid: '1',
        Effect: 'Allow',
        Principal: {
          AWS: [`${originAccessArn}`],
        },
        Action: ['s3:GetObject'],
        Resource: [`arn:aws:s3:::${bName}/*`],
      },
    ],
  });
}

const bucketPolicy = new aws.s3.BucketPolicy(`${bucketName}-policy`, {
  bucket: bucket.bucket,
  policy: pulumi
    .all([bucket.bucket, originAccessIdentity.iamArn])
    .apply(([bName, originAccessArn]) => publicReadPolicyForBucket(bName, originAccessArn)),
});

// Export the name of the bucket
exports.bucket = bucket;
exports.bucketPolicy = bucketPolicy;
exports.originAccessIdentity = originAccessIdentity;
exports.cloudfrontDistribution = s3Distribution;
