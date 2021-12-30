import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { Profile } from './Profile';
import { HeaderTools } from './HeaderTools';

export function Header() {
  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      <Text
        fontSize={['2xl', '3xl']}
        fontWeight="bold"
        letterSpacing="tight"
        w="64"
      >
        Mailgo
        <Text as="span" ml="1" color="pink.500">
          .
        </Text>
      </Text>
      <Flex align="center" ml="auto">
        <HeaderTools />
        <Profile />
      </Flex>
    </Flex>
  );
}
