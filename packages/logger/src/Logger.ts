import axios from 'axios';
import { setupInterceptors } from './AxiosInterceptors';
import { getFingerprint } from './Fingerprint';
import { Log, LogData, LogLevel } from './Log';
import { getLoggerConfig, LoggerConfig, setLoggerConfig } from './LoggerConfig';

// ----------- Logger State -----------
let userId = 'unknown';
let intervalId = 0;
const fingerprint = getFingerprint();
const logs: Array<Log> = [];
// ------------------------------------

/** Initializes the logger */
function init(config: LoggerConfig) {
  setLoggerConfig(config);

  // Stop current interval if any
  if (intervalId) {
    window.clearInterval(intervalId);
  }

  // Set interval to flush logs
  intervalId = window.setInterval(async () => {
    await flush();
  }, config.flushInterval);

  setupInterceptors(axios);
}

/** Sets user id */
function setUserId(id: string) {
  userId = id;
}

/** Appends a new log to the buffer */
function log(logData: LogData, level: LogLevel) {
  const { appId } = getLoggerConfig();

  logs.push({
    timestamp: new Date().toISOString(),
    level,
    appId,
    sessionId: '',
    environment: '',
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

/** Sends all the buffered logs to the server */
async function flush() {
  if (logs.length === 0) {
    return;
  }

  const { loggerUrl } = getLoggerConfig();

  try {
    // shallow copy
    const logsCopy = [...logs];

    // Clear the internal buffer
    logs.length = 0;

    // Transmit the batch
    const resp = await axios.post(loggerUrl, logsCopy);
    return resp.data;
  } catch (e) {
    console.log('Error sending log batch');
  }
}

export const Logger = {
  init,
  setUserId,
  log,
  trace,
  debug,
  info,
  warn,
  error,
  flush,
};
