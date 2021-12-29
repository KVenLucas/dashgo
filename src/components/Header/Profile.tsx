import { Box, Text, Avatar, Flex } from '@chakra-ui/react';

interface ProfileProps {
  showProfileData?: boolean;
}

export default function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Keven Lucas</Text>
          <Text color="gray.300" fontSize="small">
            kvenl@dashgo.com
          </Text>
        </Box>
      )}

      <Avatar size="md" name="Keven Lucas" />
    </Flex>
  );
}
