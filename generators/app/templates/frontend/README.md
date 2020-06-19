# <%= appName %>

## Before starting the app

1. `$ yarn install` to install the `node_modules`
2. `$ yarn start` to execute the project and run on http://localhost:3000 by default

### Other available commands

- `$ yarn test` to run the testing scripts; you can also do `$ yarn test --watchAll` to test continuously
- `$ yarn build` to build the static version application, which stores in `./build/` directory
- `$ yarn lint` to run ESLint. However, our linter will execute whenever you `git commit`
- This React application has not been `eject`ed and was not recommended to do this

## File Structure

```
|- public/ -> The templates used by webpack
|- src/ -> All major project codebase
   |- components/ -> All the React components that are not routing logics (ideally pure components)
   |- pages/ -> The page components which handles the routing logics
   |- states/ -> The actions, reducers, sagas, and types used by Redux
   |- utils/ -> Stores the utilities shared by the project (e.g. constants.js / routes.js)
|- .editorconfig   --------|
|- .eslintrc.json  --------|
|- .eslintignore   --------|
|- .huskyrc.json   --------|
|- .lintedstagedrc.json ---|
|- .prettierrc     --------|--- were all linting and styling setups
|- .prettierignore --------|
```
