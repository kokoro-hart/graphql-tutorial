import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Payload } from '../types';

type AuthInfo = {
  checked: boolean;
  isAuthenticated: boolean;
};

const STORAGE_TOKEN_NAME = 'token';

const checkTokenValidity = (token: string | null): boolean => {
  if (!token) return false;
  try {
    const decodedToken = jwtDecode<Payload>(token);
    return decodedToken.exp * 1000 >= Date.now();
  } catch {
    return false;
  }
};

export const useAuth = (): AuthInfo => {
  const [authInfo, setAuthInfo] = useState<AuthInfo>({
    checked: false,
    isAuthenticated: false,
  });

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_TOKEN_NAME);
    const isAuthenticated = checkTokenValidity(token);

    setAuthInfo({
      checked: true,
      isAuthenticated,
    });

    if (!isAuthenticated) {
      localStorage.removeItem(STORAGE_TOKEN_NAME);
    }
  }, []);

  return authInfo;
};
