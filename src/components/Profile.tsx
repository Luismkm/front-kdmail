import React from 'react';
import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import { useAuth } from '../hooks/auth';

export function Profile() {
  const auth = useAuth();

  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>{auth.user.name}</Text>
        <Text
          cursor="pointer"
          _hover={{ color: 'gray.100' }}
          color="gray.300"
          fontSize="14"
          w="25"
          ml="auto"
          onClick={() => auth.signOut()}
        >
          Sair
        </Text>
      </Box>
      <Avatar size="md" name={`${auth.user.name}`} />
    </Flex>
  );
}
