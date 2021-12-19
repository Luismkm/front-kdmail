import React from 'react';
import {
  BrowserRouter,
  Link,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Home } from './pages/Home';

import { theme } from './styles/theme';

import { Sendmails } from './pages/Sendmails';
import { Freight } from './pages/Freight';
import { DriverTasks } from './pages/DriverTasks';
import { Login } from './pages/Login';
import { AuthProvider } from './hooks/auth';
import { RequireAuth } from './components/routes/RequireAuth';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route element={<RequireAuth />}>
              <Route path="/" element={<Home />} />
              <Route path="/emails" element={<Sendmails />} />
              <Route path="/frete" element={<Freight />} />
              <Route path="/driver-tasks" element={<DriverTasks />} />
              <Route path="*" element={<Home />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
}
export default App;
