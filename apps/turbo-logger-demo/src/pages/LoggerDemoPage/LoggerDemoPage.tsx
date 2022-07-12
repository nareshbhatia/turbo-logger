import * as React from 'react';
import { Logger } from '@turboutils/logger';
import { useErrorHandler } from 'react-error-boundary';
import { Button, Card, Header } from '../../components';
import { MovieListContainer } from './MovieListContainer';
import {
  RefreshCountContextProvider,
  useRefreshCountContext,
} from './RefreshCountContext';

function RefreshMoviesButton() {
  const { refreshCount, setRefreshCount } = useRefreshCountContext();

  const handleClick = () => {
    setRefreshCount(refreshCount + 1);
  };

  return (
    <Button className="ml-4" onClick={handleClick}>
      Refresh Movies (fails every 5th time)
    </Button>
  );
}

export function LoggerDemoPage() {
  const handleError = useErrorHandler();

  const handleLogMessage = async () => {
    Logger.info({
      type: 'Message',
      message: 'Hello World!',
    });
  };

  const handleThrowError = async () => {
    handleError(new Error('Sample error'));
  };

  return (
    <RefreshCountContextProvider>
      <Header>Turbo Logger</Header>
      <div className="flex flex-col p-6">
        <Card className="px-6 py-5 flex flex-row items-center justify-center">
          <Button onClick={handleLogMessage}>Log Message</Button>
          <Button className="ml-4" onClick={handleThrowError}>
            Throw Error
          </Button>
          <RefreshMoviesButton />
        </Card>

        <Card className="mt-6 p-6">
          <MovieListContainer />
        </Card>
      </div>
    </RefreshCountContextProvider>
  );
}
