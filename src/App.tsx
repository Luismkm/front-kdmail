import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Home } from './pages/Home';

import { theme } from './styles/theme';

import { Sendmails } from './pages/Sendmails';
import { Freight } from './pages/Freight';
import { DriverTasks } from './pages/DriverTasks';
import { Login } from './pages/Login';
import { AuthProvider } from './hooks/auth';
import { RequireAuth } from './components/routes/RequireAuth';
import { TaskFlag } from './hooks/task/task';
import { Unsubscribe } from './pages/Unsubscribe';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/unsubscribe" element={<Unsubscribe />} />

            <Route element={<RequireAuth />}>
              <Route path="/" element={<Home />} />
              <Route path="/emails" element={<Sendmails />} />
              <Route path="/frete" element={<Freight />} />
              <Route
                path="/driver-tasks"
                element={
                  <TaskFlag>
                    <DriverTasks />
                  </TaskFlag>
                }
              />
              <Route path="*" element={<Home />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
}
export default App;
