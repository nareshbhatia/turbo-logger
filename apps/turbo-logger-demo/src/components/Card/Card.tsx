import clsx from 'clsx';
import { DivProps } from '../ReactProps';

export function Card({ className, children, ...props }: DivProps) {
  return (
    <div
      className={clsx(
        className,
        'relative border border-gray-300 rounded-lg bg-white shadow-md'
      )}
      {...props}
    >
      {children}
    </div>
  );
}
