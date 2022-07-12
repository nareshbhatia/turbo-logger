import * as React from 'react';
import { CogIcon, LogoutIcon } from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';
import { useAuthStateContext } from '../../contexts';

interface HeaderProps {
  children?: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  const navigate = useNavigate();
  const { handleSignOut } = useAuthStateContext();

  const navigateToDemo = () => {
    navigate('/demo');
  };

  const navigateToSettings = () => {
    navigate('/settings');
  };

  const handleSignOutClicked = () => {
    handleSignOut();
    navigate('/');
  };

  return (
    <header className="relative">
      <nav aria-label="Top">
        <div className="bg-primary-default">
          <div className="max-w-7xl mx-auto h-12 px-4 flex items-center justify-between">
            <span
              className="text-white text-base leading-none font-medium cursor-pointer"
              onClick={navigateToDemo}
            >
              {children}
            </span>

            <div className="flex flex-row">
              <button
                type="button"
                title="Settings"
                aria-label="Settings"
                className="bg-primary-default border-none cursor-pointer"
                onClick={navigateToSettings}
              >
                <CogIcon className="h-5 w-5 text-neutral-200 hover:text-neutral-100" />
              </button>

              <button
                type="button"
                title="Sign Out"
                aria-label="Sign Out"
                className="bg-primary-default border-none cursor-pointer ml-3"
                onClick={handleSignOutClicked}
              >
                <LogoutIcon className="h-5 w-5 text-neutral-200 hover:text-neutral-100" />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
