import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";
import { useWeb3React } from "@web3-react/core";
import { Input, Stack } from "@chakra-ui/react";

import prisma from "../../lib/prisma";

// import { SmallCloseIcon } from '@chakra-ui/icons';

// export async function getStaticPaths() {
//   const res = await axios("http://localhost:3000/api/users");
//   const { data } = res;
//   const paths = data.map((e: { walletAddress: string }) => ({
//     params: { walletAddress: e.walletAddress },
//   }));
//   return {
//     paths,
//     fallback: false,
//   };
// }

export default function SettingsUser({
  user,
}: {
  user: { image: string; name: string; email: string };
}) {
  const router = useRouter();
  const { account } = useWeb3React();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: {}) => {
    try {
      await axios.put(`http://localhost:3000/api/users/${account}`, {
        ...data,
        walletAddress: account,
      });
    } catch (e) {
      router.push("/user/error");
    }
  };

  // console.log(watch("name")) // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <Stack
      align="center"
      as="form"
      direction="column"
      justify="center"
      m="auto"
      mb="30px"
      w={300}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* register your input into the hook by invoking the "register" function */}
      <p>{user.name}</p>
      <Input placeholder="Name..." {...register("name")} />
      <Input type="submit" />
    </Stack>
  );
}
// <Flex
//     align="center"
//     bg={useColorModeValue('gray.50', 'gray.800')}
//     justify="center"
//     minH="100vh" >
//     <Stack
//         bg={useColorModeValue('white', 'gray.700')}
//         boxShadow="lg"
//         maxW="700px"
//         my={12}
//         p={6}
//         rounded="xl"
//         spacing={4}
//         w="full"
//     >
//         <Heading fontSize={{ base: '2xl', sm: '3xl' }} lineHeight={1.1}>
//             User Profile Edit
//         </Heading>
//         <FormControl id="userName">
//             <FormLabel>User Icon</FormLabel>
//             <Stack direction={['column', 'row']} spacing={6}>
//                 <Center>
//                     <Avatar size="xl" src={user.image}>
//                         <AvatarBadge
//                             aria-label="remove Image"
//                             as={IconButton}
//                             colorScheme="red"
//                             icon={<SmallCloseIcon />}
//                             rounded="full"
//                             size="sm"
//                             top="-10px"
//                         />
//                     </Avatar>
//                 </Center>
//                 <Center w="full">
//                     <Button w="full">Change Icon</Button>
//                 </Center>
//             </Stack>
//         </FormControl>
//         <Text>{account}</Text>
//         <FormControl isRequired id="userName" >
//             <FormLabel>{user.name}</FormLabel>
//             <Input
//                 _placeholder={{ color: 'gray.500' }}
//                 placeholder="UserName"
//                 type="text"
//                 value={name}
//                 onChange={handleChange}
//             />
//         </FormControl>
//         <Stack direction={['column', 'row']} spacing={6}>
//             <Button
//                 _hover={{
//                     bg: 'red.500',
//                 }}
//                 bg="red.400"
//                 color="white"
//                 w="full">
//                 Cancel
//             </Button>
//             <Button
//                 _hover={{
//                     bg: 'blue.500',
//                 }}
//                 bg="blue.400"
//                 color="white"
//                 type="submit"
//                 w="full" >
//                 Submit
//             </Button>
//         </Stack>
//     </Stack>
// </Flex>

export async function getServerSideProps(context: {
  params: { walletAddress: string };
}) {
  const { walletAddress } = context.params;
  //   const res = await axios(`http://localhost:3000/api/users/${walletAddress}`);
  //   const { data } = res;
  //   return {
  //     props: {
  //       user: data,
  //     },
  //   };
  const user = await prisma.user.findUnique({
    where: { walletAddress },
  });
  return {
    props: { user },
  };
}
