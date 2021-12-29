import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack
} from '@chakra-ui/react';
import { Header } from '@components/Header';
import { Sidebar } from '@components/Sidebar';
import { Input } from '@components/Form/Input';
import Link from 'next/link';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { api } from '@services/api';
import { queryClient } from '@services/queryClient';
import { useRouter } from 'next/router';

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup
    .string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('Senha obrigatória'),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref('password')], 'As senha precisam ser iguais')
});

export default function CreateUser() {
  const router = useRouter();

  const { register, formState, handleSubmit } = useForm({
    resolver: yupResolver(createUserFormSchema)
  });

  const createUser = useMutation(
    async (user: CreateUserFormData) => {
      const response = await api.post('users', {
        user: {
          ...user,
          created_at: new Date().toDateString()
        }
      });

      return response.data.user;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
      }
    }
  );

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (
    values
  ) => {
    await createUser.mutateAsync(values);

    router.push('/users');
  };

  const { errors } = formState;

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth="1480px" mx="auto" px="6">
        <Sidebar />

        <Box
          flex="1"
          as="form"
          onSubmit={handleSubmit(handleCreateUser)}
          borderRadius="8"
          bg="gray.800"
          p={['6', '8']}
        >
          <Heading size="lg" fontWeight="normal">
            Criar usuário
          </Heading>

          <Divider my="6" borderColor="gray.700"></Divider>

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input
                error={errors.name}
                name="name"
                label="Nome completo"
                autoComplete="off"
                {...register('name')}
              />
              <Input
                error={errors.email}
                name="email"
                type="email"
                label="E-mail"
                autoComplete="off"
                {...register('email')}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input
                error={errors.password}
                name="password"
                type="password"
                label="Senha"
                autoComplete="off"
                {...register('password')}
              />
              <Input
                error={errors.password_confirmation}
                name="password_confirmation"
                type="password"
                label="Confirmação da senha"
                autoComplete="off"
                {...register('password_confirmation')}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack>
              <Link href="/users" passHref>
                <Button colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button
                colorScheme="pink"
                isLoading={formState.isSubmitting}
                type="submit"
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
