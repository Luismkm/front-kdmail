import React, { ReactElement } from 'react';
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
import { RiAddLine } from 'react-icons/ri';

interface IModalProps {
  btnTitle?: string;
  icon: ReactElement;
  btnChildren?: string;
  value: string;
}

const CustomModal = ({ btnTitle, icon, btnChildren, value }: IModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleAction(n: string) {
    console.log(n);
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
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="green"
                  mr={3}
                  onClick={() => {
                    handleAction(value);
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
                  value={value}
                />
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="green" mr={3} onClick={onClose}>
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

      {/*  <Modal isOpen={isOpen} onClose={onClose}>
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
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={onClose}>
              Salvar
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
    </>
  );
};

export { CustomModal };
