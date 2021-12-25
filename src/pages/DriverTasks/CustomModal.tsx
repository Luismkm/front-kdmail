import React, { ReactElement, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Button,
  Icon,
} from '@chakra-ui/react';
import { api } from '../../services/api';

import { useTaskFlag } from '../../hooks/task/task';

interface IModalProps {
  btnTitle?: string;
  icon: ReactElement;
  btnChildren?: string;
  value: string;
  id: string;
}

const CustomModal = ({
  btnTitle,
  icon,
  btnChildren,
  value,
  id,
}: IModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [inputDescription, setInputDescription] = useState(value);
  const { flagUpdateTasks, setFlagUpdateTasks } = useTaskFlag();

  function handleSetTaskDescriptionInput(description: string) {
    setInputDescription(description);
  }

  async function handleCreateNewTask() {
    if (!inputDescription.trim()) {
      return;
    }
    await api.post('/tasks/create', {
      description: inputDescription.trim(),
      status: 'Pendente',
    });
    setInputDescription('');
    setFlagUpdateTasks(!flagUpdateTasks);
    onClose();
  }

  function handleUpdateTask() {
    api.patch('/tasks/update/description', {
      task_id: id,
      description: inputDescription,
    });
    setFlagUpdateTasks(!flagUpdateTasks);
    onClose();
  }

  return (
    <>
      {btnChildren ? (
        <>
          <Button
            as="a"
            size="sm"
            fontSize="sm"
            colorScheme="pink"
            cursor="pointer"
            ml="auto"
            leftIcon={<Icon as={icon} />}
            onClick={onOpen}
            value={value}
          >
            {btnChildren}
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="gray.800">
              <ModalHeader>{btnChildren}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Input
                  name="newtask"
                  id="newTask"
                  focusBorderColor="pink.500"
                  bgColor="gray.900"
                  variant="filled"
                  _hover={{
                    bgColor: 'gray.900',
                  }}
                  size="lg"
                  value={inputDescription}
                  onChange={(event) => {
                    handleSetTaskDescriptionInput(event.target.value);
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="green"
                  mr={3}
                  onClick={() => {
                    handleCreateNewTask();
                  }}
                >
                  Salvar
                </Button>
                <Button colorScheme="red" onClick={onClose}>
                  Cancelar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      ) : (
        <>
          <Button
            as="a"
            size="sm"
            fontSize="sm"
            colorScheme="purple"
            cursor="pointer"
            p="0"
            mr="2"
            leftIcon={<Icon mr="-2" as={icon} fontSize="16" />}
            onClick={onOpen}
          />
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="gray.800">
              <ModalHeader>{btnTitle}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Input
                  name="newtask"
                  id="newTask"
                  focusBorderColor="pink.500"
                  bgColor="gray.900"
                  variant="filled"
                  _hover={{
                    bgColor: 'gray.900',
                  }}
                  size="lg"
                  value={inputDescription}
                  onChange={(event) => {
                    handleSetTaskDescriptionInput(event.target.value);
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="green"
                  mr={3}
                  onClick={() => {
                    handleUpdateTask();
                  }}
                >
                  Salvar
                </Button>
                <Button colorScheme="red" onClick={onClose}>
                  Cancelar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};

export { CustomModal };
