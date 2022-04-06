import { Stack, Text } from '@chakra-ui/react';

import Form from '../components/Form';

export default function add() {
  return (
    <Stack alignItems="center" justifyContent="center">
      <Text as="h2" fontSize="3xl">
        Add an event
      </Text>
      <Form />
    </Stack>
  );
}
