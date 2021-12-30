import React from 'react';
import {
  HStack,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Stack,
  Box,
} from '@chakra-ui/react';
import { RiUserAddLine } from 'react-icons/ri';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../Input';
import { api } from '../../services/api';

type CreateUserFormData = {
  name: string;
  password: string;
};

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  password: yup
    .string()
    .required('Senha obrigatória')
    .min(6, 'No mínimo 6 caracteres '),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais'),
});

export function CreateUser() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });
  const { errors } = formState;

  function handleCloseModal() {
    reset();
    onClose();
  }

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (
    values,
  ) => {
    await api.post('/users/create', {
      name: values.name,
      password: values.password,
    });
    reset();
    onClose();
  };

  return (
    <HStack
      spacing={['6', '8']}
      mx={['6', '8']}
      pr={['6', '8']}
      py="1"
      color="gray.300"
      borderRightWidth={1}
      borderColor="gray.700"
    >
      <Icon
        as={RiUserAddLine}
        fontSize="20"
        cursor="pointer"
        title="Novo usuário"
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent bg="gray.800" w="100">
          <ModalHeader ml="4">Novo usuário</ModalHeader>
          <ModalCloseButton />
          <Box as="form" onSubmit={handleSubmit(handleCreateUser)}>
            <ModalBody px="10">
              <Stack spacing="4">
                <Input
                  name="name"
                  label="Nome completo"
                  error={errors.name}
                  {...register('name')}
                />
                <Input
                  type="password"
                  label="Senha"
                  error={errors.password}
                  {...register('password')}
                />
                <Input
                  type="password"
                  label="Confirmar senha"
                  error={errors.password_confirmation}
                  {...register('password_confirmation')}
                />
              </Stack>
            </ModalBody>

            <ModalFooter mr="4">
              <Button
                p="3"
                fontSize="sm"
                colorScheme="green"
                mr={3}
                type="submit"
                isLoading={formState.isSubmitting}
              >
                Criar
              </Button>
              <Button
                p="3"
                fontSize="sm"
                colorScheme="red"
                onClick={handleCloseModal}
              >
                Cancelar
              </Button>
            </ModalFooter>
          </Box>
        </ModalContent>
      </Modal>
    </HStack>
  );
}
