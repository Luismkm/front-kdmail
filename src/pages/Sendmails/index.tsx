import { Box, Button, Divider, Flex, Image, Heading, Text, HStack, Icon, Input, InputGroup, InputLeftElement, Link, SimpleGrid, VStack, FormControl, FormLabel } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import {FaFileCsv} from 'react-icons/fa';
import { FormEvent, useEffect, useRef, useState } from "react";

import { ButtonHTMLAttributes } from 'react';
import { AiOutlineArrowRight } from "react-icons/ai";
import { MdMiscellaneousServices } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineFileSearch } from "react-icons/ai";
import { api } from "../../services/api";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

interface ISendStatus {
  count: string,
  sended: string
}

export function Sendmails() {
  const [csvFile, setCsvFile] = useState('');
  const [fileName, setFileName] = useState('Selecionar arquivo...');
  const [recipientNumbers, setRecipientNumbers] = useState();
  const [linkImgBanner, setLinkImgBanner] = useState('');

  const [numberSendPending, setNumberSendPending] = useState(0);
  const [numberSended, setNumberSended] = useState(0);
  const [numberSendWithError, setNumberSendWithError] = useState(0);

  const [isLoadingSendFile, setIsLoadingSendFile] = useState(false);

  function handleFile(e: any){
    if (e.target.files.length > 0) {

      const file = e.target.files[0]

      setFileName(file.name);
      setCsvFile(file);
    }
  }

  async function handleShowSendSatatus() {
    const response = await api.get('/email/status');
    let sendStatus:ISendStatus[]
    sendStatus = response.data.status;

     sendStatus.map(status => {
      if(status.sended === 'Y'){
        setNumberSended(Number(status.count));
      }else
       if(status.sended === 'C'){
         setNumberSendWithError(Number(status.count))
       }else {
        setNumberSendPending(Number(status.count))
       }
    }); 
  }

  async function handleSubmit(event: FormEvent){
    event.preventDefault();

    setIsLoadingSendFile(true);

    const dataForm = new FormData();
    dataForm.append('file', csvFile);

    const result = await api.post('/email/validation', dataForm)
    
    setIsLoadingSendFile(false);

    setRecipientNumbers(result.data.recipientNumbers);
  }


  const inputRef = useRef() as ButtonProps;
  return(
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

       {/*  <Box
          display="flex"
          flexDir="row"
          flex="1"
        > */}

<Box
          display="flex"
          flex="1"
          flexDir="column"
          borderRadius={8}
          bg="gray.800"
          p={["6","8"]}
          height="100vh"
          //onSubmit={handleSubmit(handleCreateUser)}
        >

        <Box
          display="flex"
          flexDir="column"

          height={24}
         
        >
      
          <Heading display="inline" minWidth="360" fontSize="24" fontWeight="normal">Importar destinatários:</Heading>

<FormControl onSubmit={ handleSubmit } as="form" mt="4" display="flex" flex="1" maxWidth="100%" alignItems="center" id="file">
    <Flex
      as="label"
      flex="1"
      py="1"
      px="1"
      ml="6"
      maxWidth={260}
      htmlFor="file"
      // bg="#e642"
    >
    <Icon as={FaFileCsv} color="#fff" fontSize="30" />
    <Text
      px="2"
      py="1"
      w={200}
      maxWidth={200}
      // bg="gray.700"
      overflow="hidden"
      textOverflow="ellipsis"
      whiteSpace="nowrap"
    >
      { fileName }
    </Text>
    <Input
        type="file"
        name="file"
        id="file"
        display="none"
        onChange={(e) => {handleFile(e)}}
    />

    
    </Flex>
    <Button 
      type="submit"
      p="4"
      fontSize="15"
      rightIcon={ <Icon as={AiOutlineArrowRight} fontSize="15" />} colorScheme="teal" variant="outline"
      isLoading={ isLoadingSendFile }
    >
        Enviar
    </Button>

    <Button 
      type="submit"
      p="4"
      ml="auto"
      fontSize="15"
      rightIcon={ <Icon as={RiDeleteBinLine} fontSize="15" />} colorScheme="red" variant="outline">
        Limpar
    </Button>
    </FormControl>
     
          
  <Text fontSize="13" mt="1.5" ml="auto" color="#58ce56" >{ recipientNumbers ? `Foram carragados ${ recipientNumbers } destinatários` : '' }</Text>

  </Box>

          <Divider my="6" borderColor="gray.700" />

          <Box display="flex" flexDir="column">
          <Heading minWidth="360" fontSize="24" fontWeight="normal">Dados email:</Heading>
          <FormControl display="flex" mt="4" flexDir="column" maxWidth="250">

          <VStack spacing="4">

          <SimpleGrid>
          <FormLabel htmlFor="subject">Assunto</FormLabel>
             <Input
                name="assunto"
                id="subject"
                focusBorderColor="pink.500"
                bgColor="gray.900"
                variant="filled"
                _hover={{
                  bgColor: 'gray.900'
                }}
                
              />
             </SimpleGrid>

              <SimpleGrid>     
              <FormLabel htmlFor="linkImg">Link imagem</FormLabel>
              <Input
               name="linkImg"
               id="linkImg"
               focusBorderColor="pink.500"
               bgColor="gray.900"
               variant="filled"
               _hover={{
                 bgColor: 'gray.900'
               }}
               value={linkImgBanner}
               onChange={(e) => {setLinkImgBanner(e.target.value)}}
             
              />
              </SimpleGrid>
              <Button 
                type="submit"
                w={20} 
                h={8} 
                fontSize="15"
                rightIcon={ <Icon as={MdMiscellaneousServices}  fontSize="15" />} colorScheme="teal" variant="outline">
                  Iniciar
              </Button>
              </VStack>
            </FormControl>
        </Box>

        <Divider my="6" borderColor="gray.700" />

        <Box
          display="flex"
          flexDir="column"
          flex="1"
          justifyContent="center"
          alignItems="center"
         
        >
          <VStack h={32}spacing="2">
          <Text color="green"><Box as="span" fontSize="lg">{ numberSended }</Box> e-mails enviado com sucesso.</Text> 
          <Text color="red"><Box as="span" fontSize="lg">{ numberSendWithError }</Box> e-mails com erro.</Text> 
          <Text><Box as="span" fontSize="lg">{ numberSendPending }</Box> e-mails na fila de envio.</Text>
          </VStack>
          <Button
                w={60} 
                h={8}
                fontSize="15"
                rightIcon={ <Icon as={AiOutlineFileSearch}  fontSize="15" />} colorScheme="teal" variant="outline"
                onClick={handleShowSendSatatus}
                >
                  Consultar processo
              </Button>       
        </Box>      

        </Box>

        <Box
              display="flex"
              justifyContent="center"
              flex="1"
              maxHeight={600}

            >
           <Image src={ linkImgBanner } />
            </Box>
      

       {/*  </Box> */}

      </Flex>
    </Box>
  )
}