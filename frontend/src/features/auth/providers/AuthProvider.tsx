import { PropsWithChildren } from 'react';
import { useAuth } from '../hooks';
import { Navigate } from 'react-router-dom';
import { getPath } from '@/utils';

export const AuthPrivateProvider = ({ children }: PropsWithChildren) => {
  const authInfo = useAuth();

  if (!authInfo.checked) {
    return <div>loading...</div>;
  }

  if (authInfo.isAuthenticated) {
    return <>{children}</>;
  }

  return <Navigate to={getPath.signIn()} />;
};

export const AuthGuestProvider = ({ children }: PropsWithChildren) => {
  const authInfo = useAuth();

  if (!authInfo.checked) {
    return <div>loading...</div>;
  }

  if (authInfo.isAuthenticated) {
    return <Navigate to={getPath.home()} />;
  }

  return <>{children}</>;
};
