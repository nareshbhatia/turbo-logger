import { Fingerprint } from './Fingerprint';

// -------------------------------------------------------------------
// Log Types
// -------------------------------------------------------------------
/** ApiCallStartLog: API call started */
export interface ApiCallStartLog {
  type: 'ApiCallStart';
  url: string;
  method: string;
  startTime: string;
}

/** ApiCallEndLog: API call ended */
export interface ApiCallEndLog {
  type: 'ApiCallEnd';
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

/** LogBase - discriminating union of all log types */
export type LogBase =
  | ApiCallStartLog
  | ApiCallEndLog
  | MessageLog
  | PageViewLog
  | SignInErrorLog
  | SignInLog
  | SignOutLog
  | UiElementEventLog
  | UncaughtErrorLog;

/** LogLevel (default info) */
export type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error';

/** LogExtras - extra properties that will be tacked on to a log */
export type LogExtras = {
  /** unique identifier - UUID v4 format */
  id: string;

  /** creation time - ISO 8601 format */
  createdAt: string;

  /** log level */
  level: LogLevel;
};

/** Log - Final log structure */
export type Log = LogBase & LogExtras;

// -------------------------------------------------------------------
// LogBatch - a collection of logs
// -------------------------------------------------------------------
export interface LogBatch {
  /** unique identifier - UUID v4 format */
  id: string;

  /** creation time - ISO 8601 format */
  createdAt: string;

  /** application (or system) identifier */
  appId: string;

  /** user identifier */
  userId?: string;

  /** fingerprint */
  fingerprint?: Fingerprint;

  /** array of logs in this batch */
  logs: Array<Log>;
}
