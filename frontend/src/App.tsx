import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getPath } from './utils';
import { NotFound } from './pages/NotFound';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Tasks } from './pages/Tasks';
import { AuthGuestProvider, AuthPrivateProvider } from './features/auth';
import { ApolloProvider } from '@apollo/client';
import { client } from './libs';

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route
            path={getPath.signIn()}
            element={
              <AuthGuestProvider>
                <SignIn />
              </AuthGuestProvider>
            }
          />
          <Route
            path={getPath.signUp()}
            element={
              <AuthGuestProvider>
                <SignUp />
              </AuthGuestProvider>
            }
          />
          <Route
            path={getPath.home()}
            element={
              <AuthPrivateProvider>
                <Tasks />
              </AuthPrivateProvider>
            }
          />
          <Route path={'*'} element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
