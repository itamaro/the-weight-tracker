# The Weight Tracker App

> Fun little weight tracking app

## Build & Dev Setup

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn run dev

# build for production with minification
yarn build

# build for production and view the bundle analyzer report
yarn run build --report

# run unit tests
yarn run unit

# run e2e tests
yarn run e2e

# run all tests
yarn test
```


## Firebase Setup

Create a Firebase project through the [Firebase console](https://console.firebase.google.com/), and set up Google Sign-In method (https://firebase.google.com/docs/auth/).

The Firebase configuration for this project was created by running `firebase init` in the project root dir, after installing the Firebase CLI (`brew install firebase-cli`).

Run `firebase login` to authenticate.

Deploy the entire app:

```
yarn build
firebase deploy
```

Deploy only database rules (described in `database.rules.json`):

```
firebase deploy --only database
```
