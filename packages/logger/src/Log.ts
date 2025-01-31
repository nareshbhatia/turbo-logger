import { Fingerprint } from './Fingerprint';

// -------------------------------------------------------------------
// LogBase - Basic properties that are included in every log
// -------------------------------------------------------------------
/** LogLevel (default info) */
export type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error';

export type LogBase = {
  /** timestamp in ISO 8601 format */
  timestamp: string;

  /** log level */
  level: LogLevel;

  /** application (or system) identifier */
  appId: string;

  /** session identifier */
  sessionId: string;

  /** environment: dev, stage, prod etc. */
  environment?: string;

  /** user identifier */
  userId?: string;

  /** fingerprint */
  fingerprint?: Fingerprint;
};

// -------------------------------------------------------------------
// LogData with different log types
// -------------------------------------------------------------------
/** ApiCallLog: API call */
export interface ApiCallLog {
  type: 'ApiCall';
  url: string;
  method: string;
  startTime: string;
  endTime: string;
  durationMillis: number;
  status: number;
  statusText: string;
  error?: string;
}

/** MessageLog: a general message */
export interface MessageLog {
  type: 'Message';
  message: string;
}

/** PageViewLog: navigation to a new page */
export interface PageViewLog {
  type: 'PageView';

  // just the pathname, e.g. /accounts
  pathname: string;

  // full url, e.g. http://example.com/accounts?sort=asc
  url: string;
}

/** SignInErrorLog: failed sign-in attempt */
export interface SignInErrorLog {
  type: 'SignInError';
  userId: string;
}

/** SignInLog: successful sign-in */
export interface SignInLog {
  type: 'SignIn';
  userId: string;
}

/** SignOutLog: sign out */
export interface SignOutLog {
  type: 'SignOut';
  userId: string;
}

/**
 * UiElementEventLog: event produced by a UI element
 *
 * UiElement is a generalization of HTML elements
 * UI elements exist inside a container such as a page, a dialog or some
 * other component.
 *
 * Example 1:
 * {
 *   type: 'HtmlEvent',
 *   event: 'blur',
 *   container: 'SignInPage',
 *   elementType: 'input',
 *   elementId: 'username',
 *   elementValue: 'john'
 * }
 *
 * Example 2:
 * {
 *   type: 'HtmlEvent',
 *   event: 'click',
 *   container: 'SignInPage',
 *   elementType: 'button',
 *   elementId: 'Sign in'
 * }
 */
export type UiElementType =
  | 'anchor'
  | 'button'
  | 'div'
  | 'img'
  | 'input'
  | 'select'
  | 'textarea'
  | 'other';

export type UiElementEventType =
  | 'blur'
  | 'change'
  | 'click'
  | 'dblclick'
  | 'focus'
  | 'mouseenter'
  | 'mouseleave'
  | 'other';

export interface UiElementEventLog {
  type: 'UiElementEvent';
  event: UiElementEventType;
  container: string;
  elementType: UiElementType;
  elementId?: string;
  elementValue?: string;
  description?: string;
}

/** UncaughtErrorLog: uncaught error */
export interface UncaughtErrorLog {
  type: 'UncaughtError';
  message: string;
  stacktrace: string;
}

/** LogBase - discriminated union of all log types */
export type LogData =
  | ApiCallLog
  | MessageLog
  | PageViewLog
  | SignInErrorLog
  | SignInLog
  | SignOutLog
  | UiElementEventLog
  | UncaughtErrorLog;

// -------------------------------------------------------------------
// Log = LogBase + LogData
// -------------------------------------------------------------------
export type Log = LogBase & LogData;
