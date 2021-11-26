import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"

import { ChakraProvider } from '@chakra-ui/react'
import { theme } from "./styles/theme"

import { Sendmails } from "./pages/Sendmails"
import { Freight } from "./pages/Freight"


function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/emails" element={<Sendmails/>} />
            <Route path="/frete" element={<Freight/>} />
          </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
