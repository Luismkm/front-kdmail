import {
  Box,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3333');

interface ISendedClient {
  cod: string;
  email: string;
  status: string;
}

const clientsQueue: ISendedClient[] = [];

socket.on('new_client', (newClient: ISendedClient) => {
  clientsQueue.push(newClient);
});

export function MonitorOfSends() {
  const [clients, setClients] = useState<ISendedClient[]>([]);

  useEffect(() => {
    setInterval(() => {
      if (clientsQueue.length > 0) {
        setClients((prevState) =>
          [
            clientsQueue[0],
            prevState[0],
            prevState[1],
            prevState[2],
            prevState[3],
            prevState[4],
            prevState[5],
            prevState[6],
            prevState[7],
          ].filter(Boolean),
        );

        clientsQueue.shift();
      }
    }, 1000);
  }, []);

  return (
    <Box
      display="flex"
      flex="1"
      flexDir="column"
      borderRadius={8}
      bg="gray.800"
      p={['6', '8']}
      height="100vh"
      ml="4"
      maxWidth="690"
    >
      <Box display="flex" flexDir="column" height={24}>
        <Heading
          display="inline"
          fontSize="24"
          fontWeight="normal"
          margin="0 auto"
          marginBottom="8"
        >
          Monitor de envios:
        </Heading>
        <Box bg="gray.900">
          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th>Cliente</Th>
                <Th>Email</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {clients.map((client) => (
                <Tr key={client.cod}>
                  <Td>{client.cod}</Td>
                  <Td
                    whiteSpace="nowrap"
                    minWidth="240"
                    maxWidth="240"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {client.email}
                  </Td>
                  <Td color={`${client.status}.900`}>{client.status}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Box>
  );

  /* return (
    <div>
      <h1>Monitor</h1>
      {clients.map((message) => (
        <p>{message}</p>
      ))}
    </div>
  ); */
}
