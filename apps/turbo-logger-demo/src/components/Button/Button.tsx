import clsx from 'clsx';
import { ButtonProps } from '../ReactProps';

export function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        className,
        'flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-default hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
      )}
      {...props}
    >
      {children}
    </button>
  );
}
