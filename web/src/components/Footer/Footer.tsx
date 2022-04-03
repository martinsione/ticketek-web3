import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { ReactNode } from 'react';
import {
  Box,
  chakra,
  Container,
  Image,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';


function SocialButton({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) {
  return (
    <chakra.button
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
      alignItems="center"
      as="a"
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      cursor="pointer"
      display="inline-flex"
      h={8}
      href={href}
      justifyContent="center"
      rounded="full"
      transition="background 0.3s ease"
      w={8}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
}

export default function Footer() {
  return (
    <Box
    bg="#f00"
    bgGradient="linear(to-r, green.200, pink.500)"
     >
      <Container
        align={{ base: 'center', md: 'center' }}
        as={Stack}
        direction={{ base: 'column', md: 'row' }}
        justify={{ base: 'center', md: 'space-between' }}
        maxW="6xl"
        py={4}
        spacing={4}>
        <Image height={10} src='https://cdn-icons-png.flaticon.com/512/1614/1614997.png'/>
        <Text >© 2022 NFTicket Group. All rights reserved</Text>
        <Stack direction="row" spacing={6}>
          <SocialButton href="#" label="Twitter">
            <FaTwitter />
          </SocialButton>
          <SocialButton href="#" label="YouTube">
            <FaYoutube />
          </SocialButton>
          <SocialButton href="#" label="Instagram">
            <FaInstagram />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}