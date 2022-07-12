import * as React from 'react';
import clsx from 'clsx';
import { InputProps } from '../ReactProps';

interface TextFieldProps extends InputProps {
  label?: React.ReactNode;
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, id, label, ...props }, ref) => {
    return (
      <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="mt-1">
          <input
            id={id}
            ref={ref}
            className={clsx(
              className,
              'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm'
            )}
            {...props}
          />
        </div>
      </div>
    );
  }
);
