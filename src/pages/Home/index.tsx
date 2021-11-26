import { Flex, Stack, Text } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

import { api } from "../../services/api"

function Home(){
 async function handlesend(){
   const response =  await api.post('/email/send', {subject: 'Promoção', linkImg: 'https://ik.imagekit.io/meaid6cls2/Home_1__7FsGDGVQZ.png?updatedAt=1599955180718', numberOfSends: '1'});
   console.log(response)
  }
  return(
    <Flex direction="column" h="100vh">
      <Header />

    <Flex
      w="100%"
      my="6"
      maxWidth={1480}
      mx="auto"
      px="6"
    >
         <Sidebar />
    </Flex>

 

    </Flex>
  )
}

export { Home }