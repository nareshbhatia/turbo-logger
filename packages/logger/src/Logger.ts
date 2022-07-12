import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { setupInterceptors } from './AxiosInterceptors';
import { getFingerprint } from './Fingerprint';
import { Log, LogBase, LogBatch, LogLevel } from './Log';
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
function log(logBase: LogBase, level: LogLevel) {
  logs.push({
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    level,
    ...logBase,
  });
}

// level specific log functions
function trace(logBase: LogBase) {
  log(logBase, 'trace');
}
function debug(logBase: LogBase) {
  log(logBase, 'debug');
}
function info(logBase: LogBase) {
  log(logBase, 'info');
}
function warn(logBase: LogBase) {
  log(logBase, 'warn');
}
function error(logBase: LogBase) {
  log(logBase, 'error');
}

/** Sends all the buffered logs to the server */
async function flush() {
  if (logs.length === 0) {
    return;
  }

  const { appId, loggerUrl } = getLoggerConfig();

  try {
    // Create a batch
    const batch: LogBatch = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      appId,
      userId,
      fingerprint,
      logs: [...logs], // shallow copy
    };

    // Clear the internal buffer
    logs.length = 0;

    // Transmit the batch
    const resp = await axios.post(loggerUrl, batch);
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
