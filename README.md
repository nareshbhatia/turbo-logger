# Turbo Logger

Turbo Logger is a library for instrumenting your web apps to log messages to a
server. What can you do with that?

1. Analyze user actions (sign in, sign out, button clicks, page navigations,
   etc.)
2. Monitor API calls and response times
3. Diagnose uncaught exceptions

Turbo Logger itself is a TypeScript library that is agnostic of the front-end
framework. We have given an example of integrating it with React.

## Features

- 5 log levels: trace, debug, info, warn, error
- Typesafe data structures using TypeScript discriminating unions
- Batch uploads for efficient network and server usage
- Integrations:
  - [react-router](https://reactrouter.com/): to log page views
  - [react-error-boundary](https://github.com/bvaughn/react-error-boundary): to
    log uncaught errors in the React component tree. A fallback dialog is
    provided to alert the user and retry the operation.
  - [useErrorBoundary API](https://tkdodo.eu/blog/react-query-error-handling#error-boundaries):
    to catch errors for event handlers and asynchronous code, because error
    boundaries in React do not catch these errors (this hook is provided by
    React Query )
  - [clientjs](http://clientjs.org/): to provide device fingerprints in the logs

## Log Types

Following Log types are available out of the box:

- ApiCallLog: call to an API
- MessageLog: a general message
- PageViewLog: navigation to a new page
- SignInErrorLog: failed sign-in attempt
- SignInLog: successful sign-in
- SignOutLog: sign out
- UiElementEventLog: event produced by a UI element
- UncaughtErrorLog: uncaught error

For further details, see [Log.ts](packages/logger/src/Log.ts) and the
[Logger API](packages/logger/src/Logger.ts).

### Example Log

```json
[
  {
    "timestamp": "2022-09-01T22:26:36.265Z",
    "level": "info",
    "appId": "turbo-logger-demo",
    "sessionId": "591c2c8c-cf12-493c-817c-577a670db417",
    "environment": "development",
    "userId": "unknown",
    "fingerprint": {
      "browser": "Chrome",
      "browserVersion": "104.0.0.0",
      "os": "Mac OS",
      "osVersion": "10.15.7",
      "screenResolution": "2560x1440",
      "timezone": "-04",
      "language": "en-US"
    },
    "type": "UiElementEvent",
    "event": "blur",
    "container": "SignInPage",
    "elementType": "input",
    "elementId": "password"
  },
  {
    "timestamp": "2022-09-01T22:26:36.382Z",
    "level": "info",
    "appId": "turbo-logger-demo",
    "sessionId": "591c2c8c-cf12-493c-817c-577a670db417",
    "environment": "development",
    "userId": "demo",
    "fingerprint": {
      "browser": "Chrome",
      "browserVersion": "104.0.0.0",
      "os": "Mac OS",
      "osVersion": "10.15.7",
      "screenResolution": "2560x1440",
      "timezone": "-04",
      "language": "en-US"
    },
    "type": "SignIn"
  },
  {
    "timestamp": "2022-09-01T22:26:36.394Z",
    "level": "info",
    "appId": "turbo-logger-demo",
    "sessionId": "591c2c8c-cf12-493c-817c-577a670db417",
    "environment": "development",
    "userId": "demo",
    "fingerprint": {
      "browser": "Chrome",
      "browserVersion": "104.0.0.0",
      "os": "Mac OS",
      "osVersion": "10.15.7",
      "screenResolution": "2560x1440",
      "timezone": "-04",
      "language": "en-US"
    },
    "type": "PageView",
    "pathname": "/demo",
    "url": "http://localhost:3000/demo"
  },
  {
    "timestamp": "2022-09-01T22:26:36.439Z",
    "level": "info",
    "appId": "turbo-logger-demo",
    "sessionId": "591c2c8c-cf12-493c-817c-577a670db417",
    "environment": "development",
    "userId": "demo",
    "fingerprint": {
      "browser": "Chrome",
      "browserVersion": "104.0.0.0",
      "os": "Mac OS",
      "osVersion": "10.15.7",
      "screenResolution": "2560x1440",
      "timezone": "-04",
      "language": "en-US"
    },
    "type": "ApiCall",
    "url": "http://localhost:8000/top-10-movies",
    "method": "get",
    "startTime": "2022-09-01T22:26:36.394Z",
    "endTime": "2022-09-01T22:26:36.438Z",
    "durationMillis": 44,
    "status": 200,
    "statusText": "OK"
  }
]
```

## Building the Demo App

```shell
# Run ci in the root directory to install dependencies
npm ci

# Run a full build to make sure everything is set up correctly
npm run build

# Run the demo app
npm run dev
```

- Now point your browser to http://localhost:3000/. You will see the demo app as
  shown below.
- Open the Chrome debugger
- Try out the suggested operations to see the logs in the chrome debugger.

![Turbo Repo Demo](assets/screenshot.png)

> Note: Do not run `npm install` or `npm ci` in any of the subdirectories. It
> will break the build. There should be only one `package-lock.json` file in the
> entire repo (at the root).

## Integrating Turbo Logger with your React App

### Install Turbo Logger

Install Turbo Logger and its peer dependencies

`npm install @turboutils/logger axios`

### Initialize the Logger

Initialize Turbo Logger as soon as your application starts. See example
[here](apps/turbo-logger-demo/src/main.tsx#L14-L18).

### Log API Calls

If you are using Axios for making API calls, Turbo Logger will automatically log
them. It uses Axios interceptors to do this (see
[here](packages/logger/src/AxiosInterceptors.ts)). If you some other mechanism
to make API calls, you will have to modify the source and build this feature in.

### Add an ErrorBoundary

Add an `ErrorBoundary` at the top of your component tree and use it to show and
log uncaught errors. See an example
[here](apps/turbo-logger-demo/src/main.tsx#L56-L67). A sample
`ErrorFallbackComponent` is provided
[here](apps/turbo-logger-demo/src/components/ErrorFallbackComponent/ErrorFallbackComponent.tsx)
and looks like this:

![Turbo Repo Demo](assets/ErrorFallbackComponent.png)

If you are using [React Query](https://react-query-v3.tanstack.com/) to make API
calls, make sure that you initialize it using the `useErrorBoundary` option (see
[here](apps/turbo-logger-demo/src/main.tsx#L28-L38)). This allows React Query to
leverage the ErrorBoundary when an exception happens.

### Capture Page Navigations

If you use [React Router](https://reactrouter.com/), instrument it to log page
navigations. Use the `usePageViewLog` hook as shown
[here](apps/turbo-logger-demo/src/App.tsx#L12-L28).

### Capture Authentication Logs

Find suitable spots in your application to inject sign in, sign out and
unsuccessful sign in logs. See examples
[here](apps/turbo-logger-demo/src/contexts/AuthStateContext/AuthStateContext.tsx#L30-L49)
and [here](apps/turbo-logger-demo/src/pages/SignInPage/SignInPage.tsx#L34-L37)

### Capture User Interactions

Capture key user interactions, like button clicks or selection changes. You can
see an example
[here](apps/turbo-logger-demo/src/components/MovieList/MovieList.tsx#L10-L19).
For a full list of events refer to the
[Log data structure](packages/logger/src/Log.ts).
