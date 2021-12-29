import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Link,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue
} from '@chakra-ui/react';
import { Header } from '@components/Header';
import { Sidebar } from '@components/Sidebar';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';

import NextLink from 'next/link';

import { useUsers } from '@hooks/useUser';
import { Pagination } from '@components/Pagination';
import { useState } from 'react';
import { queryClient } from '@services/queryClient';
import { api } from '@services/api';

export default function UserList() {
  const [page, setPage] = useState(1);

  const { data, isLoading, error, isFetching } = useUsers(page);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });

  async function handlePrefecthUser(userId: string) {
    await queryClient.prefetchQuery(
      ['user', userId],
      async () => {
        const response = await api.get(`users/${userId}`);

        return response.data;
      },
      {
        staleTime: 1000 * 10 * 10
      }
    );
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth="1480" mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius="8" bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>

            <NextLink href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo
              </Button>
            </NextLink>
          </Flex>

          {isLoading ? (
            <Flex align="center" alignItems="center" justifyContent="center">
              <Spinner size="xl" color="pink.400" />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha na comunição com o servidor.</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={['4', '4', '6']} color="gray.300" width="8">
                      <Checkbox colorScheme="pink" />
                    </Th>

                    <Th>Usuário</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                    <Th></Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {data.users.map((user) => {
                    return (
                      <Tr key={user.id}>
                        <Td px={['4', '4', '6']}>
                          <Checkbox colorScheme="pink" />
                        </Td>

                        <Td>
                          <Box>
                            <Link
                              color="purple.400"
                              onMouseEnter={() => handlePrefecthUser(user.id)}
                            >
                              <Text fontWeight="bold">{user.name}</Text>
                            </Link>
                            <Text fontSize="small">{user.email}</Text>
                          </Box>
                        </Td>

                        {isWideVersion && <Td>{user.createdAt}</Td>}

                        <Td>
                          {isWideVersion && (
                            <Button
                              as="a"
                              size="sm"
                              fontSize="sm"
                              colorScheme="blue"
                              leftIcon={
                                <Icon as={RiPencilLine} fontSize="20" />
                              }
                            >
                              Editar
                            </Button>
                          )}
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>

              <Pagination
                totalCountOfRegisters={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
