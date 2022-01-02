import React, { FormEvent, useState } from 'react';
import {
  Button,
  Divider,
  Flex,
  Image,
  Heading,
  Text,
  Icon,
  Input,
  SimpleGrid,
  VStack,
  FormControl,
  FormLabel,
  Box,
  HStack,
} from '@chakra-ui/react';

import { FaFileCsv } from 'react-icons/fa';
import { FiMonitor } from 'react-icons/fi';
import { AiOutlineArrowRight, AiOutlineFileSearch } from 'react-icons/ai';
import { MdMiscellaneousServices } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri';

import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import { MonitorOfSends } from '../../components/Sendsmails/MonitorOfSends';

import { api } from '../../services/api';

interface ISendStatus {
  count: string;
  sended: string;
}

function Sendmails() {
  const [csvFile, setCsvFile] = useState<File>();
  const [fileName, setFileName] = useState('Selecionar arquivo...');

  const [recipientNumbers, setRecipientNumbers] = useState();

  const [emailSubject, setEmailSubject] = useState('');
  const [linkImgBanner, setLinkImgBanner] = useState('');

  const [numberSendPending, setNumberSendPending] = useState(0);
  const [numberSended, setNumberSended] = useState(0);
  const [numberSendWithError, setNumberSendWithError] = useState(0);

  const [isLoadingSendFile, setIsLoadingSendFile] = useState(false);

  const [sendEmailInAction, setSendEmailInAction] = useState(false);

  function handleFile(event: FormEvent) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    setFileName(file.name);
    setCsvFile(file);
  }

  async function handleShowSendStatus() {
    const response = await api.get('/email/status');
    const sendStatus: ISendStatus[] = response.data.status;

    if (response.data.status.length === 0) {
      setNumberSended(0);
      setNumberSendWithError(0);
      setNumberSendPending(0);
    }

    sendStatus.forEach((status) => {
      if (status.sended === 'Y') {
        setNumberSended(Number(status.count));
        sendStatus.length === 1 ? setNumberSendPending(0) : '';
      } else if (status.sended === 'C') {
        setNumberSendWithError(Number(status.count));
      } else {
        setNumberSendPending(Number(status.count));
      }
    });
  }

  async function handleInicialSendService(event: FormEvent) {
    event.preventDefault();
    if (emailSubject === '' || linkImgBanner === '') {
      alert('Todos os campos devem ser preenchidos.');
      return;
    }
    await api.post('/email/send', { emailSubject, linkImgBanner });

    setLinkImgBanner('');
    setSendEmailInAction(true);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setIsLoadingSendFile(true);

    const dataForm = new FormData();
    if (!csvFile) {
      setIsLoadingSendFile(false);
      alert('Selecione um arquivo csv válido.');
      return;
    }

    dataForm.append('file', csvFile);

    const result = await api.post('/email/validation', dataForm);

    setIsLoadingSendFile(false);

    setRecipientNumbers(result.data.recipientNumbers);
  }

  async function handleClearList() {
    const response = await api.delete('/email/clearList');
    if (response.status === 204) {
      alert('Agora a lista está limpa');
    }
  }

  function handleOpenMonitor() {
    setSendEmailInAction(!sendEmailInAction);
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          display="flex"
          flex="1"
          flexDir="column"
          borderRadius={8}
          bg="gray.800"
          p={['6', '8']}
          height="100vh"
        >
          <Box display="flex" flexDir="column" height={24}>
            <Heading
              display="inline"
              minWidth="360"
              fontSize="24"
              fontWeight="normal"
            >
              Importar destinatários:
            </Heading>

            <FormControl
              onSubmit={handleSubmit}
              as="form"
              mt="4"
              display="flex"
              flex="1"
              maxWidth="100%"
              alignItems="center"
              id="file"
            >
              <Flex
                as="label"
                flex="1"
                py="1"
                px="1"
                ml="6"
                maxWidth={260}
                htmlFor="file"
              >
                <Icon as={FaFileCsv} color="#fff" fontSize="30" />
                <Text
                  px="2"
                  py="1"
                  w={200}
                  maxWidth={200}
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                >
                  {fileName}
                </Text>
                <Input
                  type="file"
                  name="file"
                  id="file"
                  display="none"
                  onChange={(event: React.FormEvent<HTMLInputElement>) => {
                    handleFile(event);
                  }}
                />
              </Flex>
              <Button
                type="submit"
                p="4"
                fontSize="15"
                rightIcon={<Icon as={AiOutlineArrowRight} fontSize="15" />}
                colorScheme="teal"
                variant="outline"
                isLoading={isLoadingSendFile}
              >
                Enviar
              </Button>

              <Button
                p="4"
                ml="auto"
                fontSize="15"
                rightIcon={<Icon as={RiDeleteBinLine} fontSize="15" />}
                colorScheme="red"
                variant="outline"
                onClick={handleClearList}
              >
                Limpar
              </Button>
            </FormControl>

            <Text fontSize="13" mt="1.5" ml="auto" color="#58ce56">
              {recipientNumbers
                ? `Foram carragados ${recipientNumbers} destinatários`
                : ''}
            </Text>
          </Box>

          <Divider my="6" borderColor="gray.700" />

          <Box display="flex" flexDir="column">
            <Heading minWidth="360" fontSize="24" fontWeight="normal">
              Dados email:
            </Heading>
            <FormControl
              onSubmit={handleInicialSendService}
              display="flex"
              as="form"
              mt="4"
              flexDir="column"
              maxWidth="250"
            >
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
                      bgColor: 'gray.900',
                    }}
                    value={emailSubject}
                    onChange={(e) => {
                      setEmailSubject(e.target.value);
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
                      bgColor: 'gray.900',
                    }}
                    value={linkImgBanner}
                    onChange={(e) => {
                      setLinkImgBanner(e.target.value);
                    }}
                  />
                </SimpleGrid>
                <Button
                  type="submit"
                  w={20}
                  h={8}
                  fontSize="15"
                  rightIcon={
                    <Icon as={MdMiscellaneousServices} fontSize="15" />
                  }
                  colorScheme="teal"
                  variant="outline"
                  disabled={sendEmailInAction}
                >
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
            <VStack h={32} spacing="2">
              <Text color="green">
                <Box as="span" fontSize="lg">
                  {numberSended}
                </Box>{' '}
                e-mails enviado com sucesso.
              </Text>
              <Text color="red">
                <Box as="span" fontSize="lg">
                  {numberSendWithError}
                </Box>{' '}
                e-mails com erro.
              </Text>
              <Text>
                <Box as="span" fontSize="lg">
                  {numberSendPending}
                </Box>{' '}
                e-mails na fila de envio.
              </Text>
            </VStack>
            <HStack spacing="2">
              <Button
                w={60}
                h={8}
                fontSize="15"
                rightIcon={<Icon as={AiOutlineFileSearch} fontSize="15" />}
                colorScheme="teal"
                variant="outline"
                onClick={handleShowSendStatus}
              >
                Consultar processo
              </Button>
              <Button
                w={60}
                h={8}
                fontSize="15"
                rightIcon={<Icon as={FiMonitor} fontSize="15" />}
                colorScheme="teal"
                variant="outline"
                onClick={handleOpenMonitor}
              >
                Ver monitor
              </Button>
            </HStack>
          </Box>
        </Box>

        <Box display="flex" justifyContent="center" flex="1" maxHeight={600}>
          {linkImgBanner && <Image src={linkImgBanner} />}
          {sendEmailInAction && <MonitorOfSends />}
        </Box>
      </Flex>
    </Box>
  );
}

export { Sendmails };
