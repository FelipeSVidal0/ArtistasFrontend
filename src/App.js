import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PubNubProvider } from 'pubnub-react';
import PubNub from 'pubnub';

import Home from "./pages/Home/Home"
import LogIn from "./pages/LogIn/LogIn"
import SignUp from "./pages/SignUp/SignUp"
import TestePerfil from './pages/TestePerfil/TestePeril';
import TesteObra from './pages/TesteObra/TesteObra';
import TesteRating from './pages/TesteRating/TesteRating';

const pubnub = new PubNub({
  publishKey: 'pub-c-08ef0e2c-73b3-4602-92ed-c1aeb2114ee4',
  subscribeKey: 'sub-c-9b6a4cce-c357-43d4-9ade-6db479659941',
  uuid: 'user-anonimo'
});

const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem('LoggedUser');
  return user ? children : <Navigate to="/" />;
};

function App() {
  return (
    <PubNubProvider client={pubnub}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route
            path="/home"
            element={<PrivateRoute><Home /></PrivateRoute>}
          />

          <Route
            path="/profile"
            element={<PrivateRoute><TestePerfil /></PrivateRoute>}
          />

          <Route
            path="/artwork"
            element={<PrivateRoute><TesteObra /></PrivateRoute>}
          />

          <Route
            path="/rating"
            element={<PrivateRoute><TesteRating /></PrivateRoute>}
          />

          <Route
            path="/signup"
            element={<SignUp />}
          />



        </Routes>
      </BrowserRouter>
    </PubNubProvider>
  );
}

export default App;
