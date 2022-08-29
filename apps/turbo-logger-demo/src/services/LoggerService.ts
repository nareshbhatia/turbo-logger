import * as React from 'react';
import { Logger } from '@turboutils/logger';
import axios from 'axios';
import { setupInterceptors } from './AxiosInterceptors';

// Create an Axios instance for the logger
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_LOGGER_URL,
});
const flushInterval = 5000; // 5 seconds

function init() {
  Logger.setAppId('turbo-logger-demo');

  setupInterceptors(axios);

  // Set interval to flush logs
  window.setInterval(async () => {
    await flush();
  }, flushInterval);
}

/** Sends all the buffered logs to the server */
async function flush() {
  const logBuffer = Logger.clearLogBuffer();
  if (logBuffer.length === 0) {
    return;
  }

  try {
    // Transmit the log buffer
    const resp = await axiosInstance.post('/', logBuffer);
    return resp.data;
  } catch (e) {
    console.log('Error sending logs');
  }
}

function handleUncaughtError(uncaughtError: Error, errorInfo: React.ErrorInfo) {
  Logger.error({
    type: 'UncaughtError',
    message: uncaughtError.message,
    stacktrace: errorInfo.componentStack,
  });
}

export const LoggerService = {
  init,
  handleUncaughtError,
};
