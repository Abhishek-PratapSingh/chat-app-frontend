import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import LogoutButton from './components/Logout';
import ChatPage from './components/Chat';
import RequireAuth from './components/PrivateRoute'; 

function App() {
  return (
    <ChakraProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={
              <RequireAuth>
                <ChatPage />
              </RequireAuth>
            } />
            <Route path="/logout" element={<LogoutButton />} />
            <Route path="/" element={
              <RequireAuth>
                <ChatPage />
              </RequireAuth>
            }/>
          </Routes>
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
