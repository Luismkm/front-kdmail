import React, { useEffect, useState } from 'react';
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
import { api } from '../../services/api';
import { useTaskFlag } from '../../hooks/task/task';

interface ITasksList {
  id: string;
  taskOwner: string;
  description: string;
  status: string;
  createdAt: Date;
  user: {
    name: string;
  };
}

function DriverTasks() {
  const [listTasks, setListTasks] = useState<ITasksList[]>([]);
  const { flagUpdateTasks, setFlagUpdateTasks } = useTaskFlag();
  useEffect(() => {
    api.get('/tasks/list').then((response) => {
      setListTasks(response.data);
    });
  }, [flagUpdateTasks]);

  async function handleTaskUpdateStatus(status: string, id: string) {
    if (status === 'Pendente') {
      await api.patch('/tasks/update/status', {
        task_id: id,
        status: 'Em andamento',
      });
    } else {
      await api.patch('/tasks/update/status', {
        task_id: id,
        status: 'Concluído',
      });
    }
    setFlagUpdateTasks(!flagUpdateTasks);
  }

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
              icon={RiPencilLine}
              btnChildren="Nova tarefa"
              value=""
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
            {listTasks.map((task) => (
              <Tbody key={task.id}>
                <Tr>
                  <Td>19/10/2021 18:40</Td>
                  <Td>{task.user.name}</Td>
                  <Td>{task.description}</Td>
                  <Td>{task.status}</Td>
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
                      value={task.status}
                      onClick={() =>
                        handleTaskUpdateStatus(task.status, task.id)
                      }
                    />

                    <CustomModal
                      btnColor="purple"
                      btnTitle="Editar"
                      icon={RiPencilLine}
                      btnChildren=""
                      id={task.id}
                      value={task.description}
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
                      value={task.id}
                    />
                  </Td>
                </Tr>
              </Tbody>
            ))}
          </Table>
        </Box>
      </Flex>
    </Box>
  );
}

export { DriverTasks };
