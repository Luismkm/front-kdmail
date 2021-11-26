import { Box, Stack, Text, Link as ChakraLink, Icon } from "@chakra-ui/react";
import { RiMailSendLine, } from "react-icons/ri";
import { BsTruck, } from "react-icons/bs";
import { Link } from "react-router-dom";

export function Sidebar() {
  return (
    <Box as="aside" w="48" mr="8">
      <Stack spacing="12" align="flex-start">
        <Box>
          <Text fontWeight="bold" color="gray.400" fontSize="small">GERAL</Text>
          <Stack spacing="4" mt="8" align="stretch">

            <Link to="/emails">
              <ChakraLink  display="flex" align="center">
                <Icon as={RiMailSendLine} fontSize="20"/>
                <Text ml="4" fontWeight="medium">Enviar E-mails</Text>
              </ChakraLink>
            </Link>

            <Link to="/frete">
              <ChakraLink display="flex" align="center">
                <Icon as={BsTruck} fontSize="20"/>
                <Text ml="4" fontWeight="medium">Fretes</Text>
              </ChakraLink>
            </Link>
            
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}