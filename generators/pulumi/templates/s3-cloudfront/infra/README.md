## To run:

1. `yarn install`
2. `pulumi up --config-file stacks/dev/Pulumi.dev.yaml`

## Environmental Variables

Add your environmental variables like this:

`AWS_REGION:`
The region that the application is currently deployed in.

To create secret variables, do:
`pulumi config set --secret {{VAR_NAME}} {{VAR_VALUE}}`
