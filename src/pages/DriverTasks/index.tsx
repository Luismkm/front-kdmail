import React from 'react';
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/react';
import { ImCancelCircle } from 'react-icons/im';
import { RiPencilLine } from 'react-icons/ri';
import { AiOutlineCheck } from 'react-icons/ai';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

import { CustomModal } from './CustomModal';

function DriverTasks() {
  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          display="flex"
          flex="1"
          flexDir="column"
          borderRadius={8}
          bg="gray.800"
          p={['6', '8']}
          height="100vh"
        >
          <Box display="flex">
            <Heading minWidth="360" fontSize="24" fontWeight="normal">
              Tarefas externas:
            </Heading>

            <CustomModal
              btnColor="pink"
              btnTitle="Editar"
              icon={RiPencilLine}
              children="Nova tarefa"
              value="1"
            />
          </Box>
          <Divider my="6" borderColor="gray.700" />
          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th>Data de cadastro</Th>
                <Th>Usuário</Th>
                <Th>Tarefa</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>19/10/2021 18:40</Td>
                <Td>Luis Moraes</Td>
                <Td>Buscar troca no mercado, entregar PG.</Td>
                <Td>Pendente</Td>
                <Td>
                  <Button
                    as="a"
                    size="sm"
                    fontSize="sm"
                    p="0"
                    mr="2"
                    colorScheme="green"
                    cursor="pointer"
                    title="Marcar com feito"
                    leftIcon={
                      <Icon mr="-2" as={AiOutlineCheck} fontSize="16" />
                    }
                  />

                  <CustomModal
                    btnColor="purple"
                    btnTitle="Editar"
                    icon={RiPencilLine}
                    children=""
                    value="1"
                  />

                  <Button
                    as="a"
                    size="sm"
                    fontSize="sm"
                    p="0"
                    mr="2"
                    colorScheme="red"
                    cursor="pointer"
                    title="Excluir"
                    leftIcon={
                      <Icon mr="-2" as={ImCancelCircle} fontSize="16" />
                    }
                  />
                </Td>
              </Tr>
            </Tbody>
            <Tbody>
              <Tr>
                <Td>19/10/2021 18:40</Td>
                <Td>Luis Moraes</Td>
                <Td>Buscar troca no mercado, entregar PG.</Td>
                <Td>Pendente</Td>
                <Td>
                  <Button
                    as="a"
                    size="sm"
                    fontSize="sm"
                    p="0"
                    mr="2"
                    colorScheme="green"
                    cursor="pointer"
                    title="Marcar com feito"
                    leftIcon={
                      <Icon mr="-2" as={AiOutlineCheck} fontSize="16" />
                    }
                  />

                  <CustomModal
                    btnColor="purple"
                    btnTitle="Editar"
                    icon={RiPencilLine}
                    value=""
                  />

                  <Button
                    as="a"
                    size="sm"
                    fontSize="sm"
                    p="0"
                    mr="2"
                    colorScheme="red"
                    cursor="pointer"
                    title="Excluir"
                    leftIcon={
                      <Icon mr="-2" as={ImCancelCircle} fontSize="16" />
                    }
                  />
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </Box>
  );
}

export { DriverTasks };
