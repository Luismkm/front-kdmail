import React, { forwardRef, ForwardRefRenderFunction } from 'react';
import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';

interface IInputProps extends ChakraInputProps {
  name: string;
  label?: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, IInputProps> = (
  { name, label, ...rest },
  ref,
) => (
  <FormControl>
    {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

    <ChakraInput
      name={name}
      id={name}
      focusBorderColor="pink.500"
      bgColor="gray.900"
      variant="filled"
      _hover={{
        bgColor: 'gray.900',
      }}
      size="lg"
      ref={ref}
      {...rest}
    />
  </FormControl>
);

export const Input = forwardRef(InputBase);
