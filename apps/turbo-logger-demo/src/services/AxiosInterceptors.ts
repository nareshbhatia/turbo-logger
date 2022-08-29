import { formatHttpError, Logger } from '@turboutils/logger';
import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

const loggerUrl = import.meta.env.VITE_LOGGER_URL;

// ----- Saves start time on request -----
function onRequest(config: AxiosRequestConfig): AxiosRequestConfig {
  const { url } = config;

  // Skip if API call is to logger
  if (url && url.indexOf(loggerUrl) === -1) {
    const startTime = new Date();
    // @ts-ignore
    config._metadata_ = { startTime };
  }

  return config;
}

// ----- Logs successful api call -----
function onResponse(response: AxiosResponse): AxiosResponse {
  const { url, method } = response.config;

  // Skip if API call is to logger
  if (url && url.indexOf(loggerUrl) === -1) {
    // @ts-ignore
    const startTime = response.config._metadata_.startTime as Date;
    const endTime = new Date();
    const durationMillis = endTime.getTime() - startTime.getTime();

    Logger.info({
      type: 'ApiCall',
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

// ----- Logs failed api call -----
function onError(error: AxiosError): Promise<AxiosError> {
  const { url, method } = error.config;

  // Skip if API call is to logger
  if (url && url.indexOf(loggerUrl) === -1) {
    // @ts-ignore
    const startTime = error.config._metadata_.startTime as Date;
    const endTime = new Date();
    const durationMillis = endTime.getTime() - startTime.getTime();

    Logger.error({
      type: 'ApiCall',
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
  axiosInstance.interceptors.request.use(onRequest, onError);
  axiosInstance.interceptors.response.use(onResponse, onError);
  return axiosInstance;
}