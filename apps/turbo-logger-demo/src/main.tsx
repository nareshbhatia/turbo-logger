import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './App';
import { AuthStateContextProvider } from './contexts';
import { ErrorFallbackComponent } from './components';
import { LoggerService } from './services';
import './styles/tailwind.css';

// Initialize Logger
LoggerService.init();

// Create a react-query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // Makes react-query rethrow exceptions to the React ErrorBoundary
      // see https://tkdodo.eu/blog/react-query-error-handling#error-boundaries
      useErrorBoundary: true,
    },
  },
});

// Start mock service worker in dev environment
async function startMockServiceWorker() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser');
    await worker.start();
    worker.printHandlers();
  }
}

startMockServiceWorker().then(() => {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );

  root.render(
    <React.StrictMode>
      <ErrorBoundary
        FallbackComponent={ErrorFallbackComponent}
        onError={LoggerService.handleUncaughtError}
      >
        <QueryClientProvider client={queryClient}>
          <AuthStateContextProvider>
            <Router>
              <App />
            </Router>
          </AuthStateContextProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
});

// -----------------------------------------------------------------------------
// If you don't use Mock Service Worker, simplify the above code as shown below.
// -----------------------------------------------------------------------------
// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <Router>
//       <App />
//     </Router>
//   </React.StrictMode>
// );
