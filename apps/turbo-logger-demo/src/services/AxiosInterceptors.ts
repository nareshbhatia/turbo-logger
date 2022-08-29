import { formatHttpError, Logger } from '@turboutils/logger';
import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

// ----- Saves start time on request -----
function onRequest(config: AxiosRequestConfig): AxiosRequestConfig {
  // @ts-ignore
  config._metadata_ = { startTime: new Date() };
  return config;
}

// ----- Logs successful api call -----
function onResponse(response: AxiosResponse): AxiosResponse {
  const { url, method } = response.config;

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

  return response;
}

// ----- Logs failed api call -----
function onError(error: AxiosError): Promise<AxiosError> {
  const { url, method } = error.config;

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

  return Promise.reject(error);
}

export function setupInterceptors(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onError);
  axiosInstance.interceptors.response.use(onResponse, onError);
  return axiosInstance;
}
