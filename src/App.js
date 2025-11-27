import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PubNubProvider } from 'pubnub-react';
import PubNub from 'pubnub';

import Home from "./pages/Home/Home"
import LogIn from "./pages/LogIn/LogIn"
import SignUp from "./pages/SignUp/SignUp"
import Perfil from './pages/Perfil/Perfil';
import ListaObras from './pages/ListaObras/ListaObras'
import ChatList from './pages/ChatList/ChatList';


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
            element={<PrivateRoute><Perfil /></PrivateRoute>}
          />

          <Route
            path="/artworks"
            element={<PrivateRoute><ListaObras /></PrivateRoute>}
          />

          <Route
            path="/conversations"
            element={<PrivateRoute><ChatList /></PrivateRoute>}
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
