import React from 'react';
import { Box, Stack, Text, Link as ChakraLink, Icon } from '@chakra-ui/react';
import { RiMailSendLine } from 'react-icons/ri';
import { BsTruck } from 'react-icons/bs';
import { FaTasks } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export function Sidebar() {
  return (
    <Box as="aside" w="48" mr="8">
      <Stack spacing="12" align="flex-start">
        <Box>
          <Text fontWeight="bold" color="gray.400" fontSize="small">
            GERAL
          </Text>
          <Stack spacing="4" mt="8" align="stretch">
            <Link to="/emails">
              <Box display="flex" align="center">
                <Icon as={RiMailSendLine} fontSize="20" />
                <Text ml="4" fontWeight="medium">
                  Enviar E-mails
                </Text>
              </Box>
            </Link>

            <Link to="/frete">
              <Box display="flex" align="center">
                <Icon as={BsTruck} fontSize="20" />
                <Text ml="4" fontWeight="medium">
                  Fretes
                </Text>
              </Box>
            </Link>

            <Link to="/driver-tasks">
              <Box display="flex" align="center">
                <Icon as={FaTasks} fontSize="20" />
                <Text ml="4" fontWeight="medium">
                  Tarefas
                </Text>
              </Box>
            </Link>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
