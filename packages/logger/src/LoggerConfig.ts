export interface LoggerConfig {
  appId: string;
  loggerUrl: string;
  flushInterval: number; // milliseconds
}

let theConfig: LoggerConfig = {
  appId: '',
  loggerUrl: '',
  flushInterval: 0,
};

export function getLoggerConfig() {
  return theConfig;
}

export function setLoggerConfig(config: LoggerConfig) {
  theConfig = { ...config };
}
