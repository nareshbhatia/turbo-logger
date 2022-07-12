import * as React from 'react';
import { Header } from '../../components';
import { Link } from 'react-router-dom';

export function SettingsPage() {
  return (
    <React.Fragment>
      <Header>Turbo Logger</Header>
      <div className="flex flex-col p-6">
        <h2 className="text-2xl">Settings</h2>
        <Link className="link mt-6" to="/demo">
          Back to demo
        </Link>
      </div>
    </React.Fragment>
  );
}
