import React, { FormEvent, useState } from 'react';
import { Button, Flex, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/Input';
import { useAuth } from '../../hooks/auth';

interface SignInFormData {
  name: string;
  password: string;
}

const Login: React.FC = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { signIn } = useAuth();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      await signIn({
        name,
        password,
      });

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit}
      >
        <Stack spacing="4">
          <Input
            name="name"
            type="name"
            label="Nome"
            onChange={(event) => {
              setName(event.target.value);
            }}
            value={name}
          />
          <Input
            name="password"
            type="password"
            label="Senha"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            value={password}
          />
        </Stack>

        <Button type="submit" mt="6" colorScheme="pink" size="lg">
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
};

export { Login };
function useHistory() {
  throw new Error('Function not implemented.');
}
