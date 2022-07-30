import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { formatHttpError } from './formatHttpError';
import { Logger } from './Logger';
import { getLoggerConfig } from './LoggerConfig';

// ----- Logs start metadata -----
function onRequest(config: AxiosRequestConfig): AxiosRequestConfig {
  const { url, method } = config;
  const { loggerUrl } = getLoggerConfig();

  // Skip if API call is to logger
  if (url && url.indexOf(loggerUrl) === -1) {
    const startTime = new Date();
    // @ts-ignore
    config._metadata_ = { startTime };

    Logger.info({
      type: 'ApiCallStart',
      url: url || 'unknown',
      method: method || 'unknown',
      startTime: startTime.toISOString(),
    });
  }

  return config;
}

// ----- Logs request error -----
// Note: could not create this scenario, so untested
function onRequestError(error: AxiosError): Promise<AxiosError> {
  const { url, method } = error.config;
  const { loggerUrl } = getLoggerConfig();

  // Skip if API call is to logger
  if (url && url.indexOf(loggerUrl) === -1) {
    // @ts-ignore
    const startTime = error.config._metadata_.startTime as Date;
    const endTime = new Date();
    const durationMillis = endTime.getTime() - startTime.getTime();

    Logger.error({
      type: 'ApiCallEnd',
      url: url || 'unknown',
      method: method || 'unknown',
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      durationMillis,
      status: error.response ? error.response.status : 500,
      statusText: error.response ? error.response.statusText : error.message,
      error: formatHttpError(error),
    });
  }

  return Promise.reject(error);
}

// ----- Logs end metadata -----
function onResponse(response: AxiosResponse): AxiosResponse {
  const { url, method } = response.config;
  const { loggerUrl } = getLoggerConfig();

  // Skip if API call is to logger
  if (url && url.indexOf(loggerUrl) === -1) {
    // @ts-ignore
    const startTime = response.config._metadata_.startTime as Date;
    const endTime = new Date();
    const durationMillis = endTime.getTime() - startTime.getTime();

    Logger.info({
      type: 'ApiCallEnd',
      url: url || 'unknown',
      method: method || 'unknown',
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      durationMillis,
      status: response.status,
      statusText: response.statusText,
    });
  }

  return response;
}

// ----- Logs response error -----
function onResponseError(error: AxiosError): Promise<AxiosError> {
  const { url, method } = error.config;
  const { loggerUrl } = getLoggerConfig();

  // Skip if API call is to logger
  if (url && url.indexOf(loggerUrl) === -1) {
    // @ts-ignore
    const startTime = error.config._metadata_.startTime as Date;
    const endTime = new Date();
    const durationMillis = endTime.getTime() - startTime.getTime();

    Logger.error({
      type: 'ApiCallEnd',
      url: url || 'unknown',
      method: method || 'unknown',
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      durationMillis,
      status: error.response ? error.response.status : 500,
      statusText: error.response ? error.response.statusText : error.message,
      error: formatHttpError(error),
    });
  }

  return Promise.reject(error);
}

export function setupInterceptors(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}
