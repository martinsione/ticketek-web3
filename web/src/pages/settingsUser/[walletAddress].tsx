import axios from 'axios';
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    Avatar,
    AvatarBadge,
    IconButton,
    Center,
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';

export async function getStaticPaths() {
    const res = await axios("http://localhost:3000/api/users")
    const { data } = res
    const paths = data.map((e: { walletAddress: string }) => ({
        params: { walletAddress: e.walletAddress }
    }))
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(context: { params: { walletAddress: string } }) {
    const { walletAddress } = context.params
    const res = await axios(`http://localhost:3000/api/users/${walletAddress}`)
    const { data } = res
    return {
        props: {
            user: data
        }
    }
}

export default function SettingsUser({ user }: { user: { image: string, name: string, email: string } }) {
    return (
        <Flex
            align="center"
            bg={useColorModeValue('gray.50', 'gray.800')}
            justify="center"
            minH="100vh">
            <Stack
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow="lg"
                maxW="md"
                my={12}
                p={6}
                rounded="xl"
                spacing={4}
                w="full">
                <Heading fontSize={{ base: '2xl', sm: '3xl' }} lineHeight={1.1}>
                    User Profile Edit
                </Heading>
                <FormControl id="userName">
                    <FormLabel>User Icon</FormLabel>
                    <Stack direction={['column', 'row']} spacing={6}>
                        <Center>
                            <Avatar size="xl" src={user.image}>
                                <AvatarBadge
                                    aria-label="remove Image"
                                    as={IconButton}
                                    colorScheme="red"
                                    icon={<SmallCloseIcon />}
                                    rounded="full"
                                    size="sm"
                                    top="-10px"
                                />
                            </Avatar>
                        </Center>
                        <Center w="full">
                            <Button w="full">Change Icon</Button>
                        </Center>
                    </Stack>
                </FormControl>
                <FormControl isRequired id="userName">
                    <FormLabel>{user.name}</FormLabel>
                    <Input
                        _placeholder={{ color: 'gray.500' }}
                        placeholder="UserName"
                        type="text"
                    />
                </FormControl>
                <FormControl isRequired id="email">
                    <FormLabel>{user.email}</FormLabel>
                    <Input
                        _placeholder={{ color: 'gray.500' }}
                        placeholder="your-email@example.com"
                        type="email"
                    />
                </FormControl>

                <Stack direction={['column', 'row']} spacing={6}>
                    <Button
                        _hover={{
                            bg: 'red.500',
                        }}
                        bg="red.400"
                        color="white"
                        w="full">
                        Cancel
                    </Button>
                    <Button
                        _hover={{
                            bg: 'blue.500',
                        }}
                        bg="blue.400"
                        color="white"
                        w="full">
                        Submit
                    </Button>
                </Stack>
            </Stack>
        </Flex>
    )
}

