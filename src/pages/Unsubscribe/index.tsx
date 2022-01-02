import { Heading } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '../../services/api';

function Unsubscribe() {
  const location = useLocation();

  useEffect(() => {
    try {
      const token = location.search.replace('?token=', '');
      if (!token) {
        throw new Error();
      }
      api.get(`/unsubscribe/${token}`);
    } catch (error) {
      alert('Ocorreu um erro');
    }
  }, []);
  return (
    <Heading display="flex" justifyContent="center" mt="200">
      Sua assinatura foi cancelada. ;)
    </Heading>
  );
}

export { Unsubscribe };
