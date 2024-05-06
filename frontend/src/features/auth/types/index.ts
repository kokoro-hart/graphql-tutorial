export type Payload = {
  email: string;
  sub: number;
  iat: number;
  exp: number;
};

export type SignInResponse = {
  signIn: {
    accessToken: string;
  };
};

export type User = {
  id: number;
  name: string;
  email: string;
};
