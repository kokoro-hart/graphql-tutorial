import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getPath } from './utils';
import { NotFound } from './pages/NotFound';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Tasks } from './pages/Tasks';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={getPath.signIn()} element={<SignIn />} />
        <Route path={getPath.signUp()} element={<SignUp />} />
        <Route path={getPath.home()} element={<Tasks />} />
        <Route path={'*'} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
