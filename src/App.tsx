import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Home } from './pages/Home';

import { theme } from './styles/theme';

import { Sendmails } from './pages/Sendmails';
import { Freight } from './pages/Freight';
import { DriverTasks } from './pages/DriverTasks';

const App = function () {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/emails" element={<Sendmails />} />
          <Route path="/frete" element={<Freight />} />
          <Route path="/driver-tasks" element={<DriverTasks />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
