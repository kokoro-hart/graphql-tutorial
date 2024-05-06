import { PropsWithChildren } from 'react';
import { Header } from '.';

export const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};
