import { ClientJS } from 'clientjs';

/** Fingerprint of a device */
export interface Fingerprint {
  browser?: string;
  browserVersion?: string;
  os?: string;
  osVersion?: string;
  device?: string;
  deviceType?: string;
  deviceVendor?: string;
  screenResolution?: string;
  timezone?: string;
  language?: string;
}

/** returns device fingerprint */
export function getFingerprint(): Fingerprint {
  const client = new ClientJS();
  return {
    browser: client.getBrowser(),
    browserVersion: client.getBrowserVersion(),
    os: client.getOS(),
    osVersion: client.getOSVersion(),
    device: client.getDevice(),
    deviceType: client.getDeviceType(),
    deviceVendor: client.getDeviceVendor(),
    screenResolution: client.getCurrentResolution(),
    timezone: client.getTimeZone(),
    language: client.getLanguage(),
  };
}
