import * as React from 'react';
import { Logger } from '@turboutils/logger';
import { Routes, Route, useLocation } from 'react-router-dom';
import {
  LoggerDemoPage,
  NotFoundPage,
  SettingsPage,
  SignInPage,
} from './pages';

/** Logs page views */
function usePageViewLog() {
  const location = useLocation();

  // Note that we could use location.pathname && location.search
  // to compose the URL, however that still does not give us the
  // scheme, hostname, port etc. Hence, using window.location.href.
  React.useEffect(() => {
    Logger.info({
      type: 'PageView',
      pathname: location.pathname,
      url: window.location.href,
    });
  }, [location]);
}

export function App() {
  // Log page views
  usePageViewLog();

  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route path="/demo" element={<LoggerDemoPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
