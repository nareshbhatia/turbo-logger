import * as React from 'react';
import { Logger } from '@turboutils/logger';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, TextField } from '../../components';
import { useAuthStateContext } from '../../contexts';

interface Credentials {
  username: string;
  password: string;
}

const demoCredentials: Credentials = {
  username: 'demo',
  password: 'demo',
};

export function SignInPage() {
  const [error, setError] = React.useState<string | undefined>();
  const { handleSignIn } = useAuthStateContext();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<Credentials>();

  const onSubmit = (credentials: Credentials) => {
    if (
      credentials.username === demoCredentials.username &&
      credentials.password === demoCredentials.password
    ) {
      setError(undefined);
      handleSignIn({ username: credentials.username });
      navigate('/demo');
    } else {
      setError('Invalid username or password');
      Logger.error({
        type: 'SignInError',
        userId: credentials.username,
      });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const elementId = e.currentTarget.name;
    Logger.info({
      type: 'UiElementEvent',
      event: 'blur',
      container: 'SignInPage',
      elementType: 'input',
      elementId,
      elementValue:
        elementId === 'password' ? undefined : e.currentTarget.value,
    });
  };

  return (
    <React.Fragment>
      <div className="h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <p className="text-center text-sm text-gray-600">
            Use demo / demo to sign in
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {error && (
              <Alert className="mb-4" severity="error">
                {error}
              </Alert>
            )}
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <TextField
                {...register('username')}
                type="text"
                label="Username"
                required
                onBlur={handleBlur}
              />

              <TextField
                {...register('password')}
                type="password"
                label="Password"
                required
                onBlur={handleBlur}
              />

              <div>
                <Button className="w-full" type="submit">
                  Sign in
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
