import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getPath } from './utils';
import { NotFound } from './pages/NotFound';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Tasks } from './pages/Tasks';
import { AuthGuestProvider, AuthPrivateProvider } from './features/auth';

function App() {
  return (
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
  );
}

export default App;
