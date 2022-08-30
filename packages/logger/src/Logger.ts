import { getFingerprint } from './Fingerprint';
import { Log, LogData, LogLevel } from './Log';

// ----------- Logger State -----------
let appId = 'unknown';
let sessionId = 'unknown';
let userId = 'unknown';
let environment = 'unknown';
const fingerprint = getFingerprint();
const logBuffer: Array<Log> = [];
// ------------------------------------

/** Sets appId */
function setAppId(id: string) {
  appId = id;
}

/** Sets sessionId */
function setSessionId(id: string) {
  sessionId = id;
}

/** Sets userId */
function setUserId(id: string) {
  userId = id;
}

/** Sets environment */
function setEnvironment(env: string) {
  environment = env;
}

/** Returns the log buffer */
function getLogBuffer() {
  return logBuffer;
}

/** Returns a shallow copy of the log buffer and then clears it */
function clearLogBuffer() {
  // Make a shallow copy before clearing it
  const logBufferCopy = [...logBuffer];

  // Clear the log buffer
  logBuffer.length = 0;

  return logBufferCopy;
}

/** Appends a new log to the buffer */
function log(logData: LogData, level: LogLevel) {
  logBuffer.push({
    timestamp: new Date().toISOString(),
    level,
    appId,
    sessionId,
    environment,
    userId,
    fingerprint,
    ...logData,
  });
}

// level specific log functions
function trace(logData: LogData) {
  log(logData, 'trace');
}
function debug(logData: LogData) {
  log(logData, 'debug');
}
function info(logData: LogData) {
  log(logData, 'info');
}
function warn(logData: LogData) {
  log(logData, 'warn');
}
function error(logData: LogData) {
  log(logData, 'error');
}

export const Logger = {
  setAppId,
  setSessionId,
  setUserId,
  setEnvironment,
  getLogBuffer,
  clearLogBuffer,
  log,
  trace,
  debug,
  info,
  warn,
  error,
};
