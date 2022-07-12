import * as React from 'react';
import {
  CheckCircleIcon,
  ExclamationIcon,
  InformationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/solid';
import clsx from 'clsx';

interface AlertProps {
  className?: string;
  severity?: 'info' | 'success' | 'warning' | 'error';
  children?: React.ReactNode;
}

function InformationIcon() {
  return (
    <InformationCircleIcon
      className="h-5 w-5 text-blue-400"
      aria-hidden="true"
    />
  );
}

function SuccessIcon() {
  return (
    <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
  );
}

function WarningIcon() {
  return (
    <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
  );
}

function ErrorIcon() {
  return <XCircleIcon className="h-5 w-5 text-red-600" aria-hidden="true" />;
}

export function Alert({
  className,
  severity = 'success',
  children,
}: AlertProps) {
  return (
    <div
      className={clsx(className, 'border-l-4 p-4', {
        'bg-blue-50 border-blue-400': severity === 'info',
        'bg-green-50 border-green-400': severity === 'success',
        'bg-yellow-50 border-yellow-400': severity === 'warning',
        'bg-red-50 border-red-600': severity === 'error',
      })}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          {severity === 'info' && <InformationIcon />}
          {severity === 'success' && <SuccessIcon />}
          {severity === 'warning' && <WarningIcon />}
          {severity === 'error' && <ErrorIcon />}
        </div>
        <div className="ml-3">
          <p
            className={clsx('text-sm', {
              'text-blue-700': severity === 'info',
              'text-green-700': severity === 'success',
              'text-yellow-700': severity === 'warning',
              'text-red-700': severity === 'error',
            })}
          >
            {children}
          </p>
        </div>
      </div>
    </div>
  );
}
