import React from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

function Freight() {
  return (
    <>
      <Box>
        <Header />

        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />
          <Heading>Fretes</Heading>
        </Flex>
      </Box>
    </>
  );
}

export { Freight };
