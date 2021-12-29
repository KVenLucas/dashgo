import { Text } from '@chakra-ui/react';

export default function Logo() {
  return (
    <Text
      fontSize={['2xl', '3xl']}
      fontWeight="bold"
      letterSpacing="tight"
      w="54"
      _hover={{
        color: 'pink.500'
      }}
    >
      dashgo
      <Text color="pink.500" as="span" ml="1">
        .
      </Text>
    </Text>
  );
}
