// import Web3 from "web3";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  // Image,
  Button,
  Input,
  Box,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalFooter,
  useDisclosure,
  ModalBody,
  ModalHeader,
  Stack,
  Text,
  Spinner,
  // FormControl,
  // FormLabel,
  // NumberInput,
  // FormErrorMessage,
  // NumberInputField,
  // NumberInputStepper,
  // NumberIncrementStepper,
  // NumberDecrementStepper,
} from "@chakra-ui/react";

import { contractDeploy } from "../Functional Components/Deploy";

interface InputProps {
  name: string;
  symbol: string;
  description: string;
  numberOfTickets: number;
  type: string;
  image: FileList;
  date: number;
  price: number;
  country: string;
  location: string;
  city: string;
}

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<InputProps>();
  const [info, setInfo] = useState <any>('');
  const [algo, setAlgo] = useState(true);
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSubmit: SubmitHandler<InputProps> = (data) => {

    const {
      name,
      symbol,
      description,
      city,
      date,
      country,
      image,
      location,
      numberOfTickets,
      price,
      type,
    } = data;
    contractDeploy(
      symbol,
      city,
      price*1000000000,
      numberOfTickets,
      image[0],
      name,
      description,
      type,
      date,
      country,
      location,
      location
    );
  };



  return (
    <Box
      alignItems="center"
      as="form"
      backgroundColor="white"
      borderRadius="36px"
      display="flex"
      flexDirection="column"
      gap="0.5rem"
      justifyContent="center"
      maxW="container.sm"
      minW="container.sm"
      my="16px"
      px="35px"
      py="30px"
      onSubmit={handleSubmit(setInfo)}
    >
      <Input {...register("name")} borderRadius="full" placeholder="Name" />
      <Input {...register("symbol")} borderRadius="full" placeholder="Symbol" />
      <Input {...register("description")} borderRadius="full" placeholder="Description" />
      <Input {...register("city")} borderRadius="full" placeholder="City" />
      <Input {...register("date")} borderRadius="full" placeholder="Date" type="date" />
      <Input {...register("country")} borderRadius="full" placeholder="Country" />
      <Input {...register("location")} borderRadius="full" placeholder="Location" />
      <Input {...register("type")} borderRadius="full" placeholder="Type" />
      <Input {...register("price")} borderRadius="full" placeholder="Price" />
      <Input
        {...register("numberOfTickets")}
        borderRadius="full"
        placeholder="Number of tickets"
        type="number"
      />
      <Input
        borderRadius="full"
        {...register("image")}
        accept=".png,.jpg,.jpeg"
        placeholder="Image"
        py="1"
        type="file"
      />
      <Button
        _active={{ bg: "linear(to-r, #73E0A9 0%, #5B68DF 100%)" }}
        _hover={{
          bg: "linear(to-r, #73E0A9 0%, #5B68DF 100%)",
          opacity: "0.85",
        }}
        alignSelf="end"
        bgGradient="linear(to-r, #73E0A9 0%, #5B68DF 100%)"
        borderRadius="full"
        colorScheme="teal"
        isLoading={isSubmitting}
        mt="0.75rem"
        type="submit"
        width="100px"
        onClick={onOpen}
      >
        Submit
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent borderRadius="30px" mt="12rem">
          <ModalCloseButton
            _hover={{ bgGradient: "linear(to-tr, #fff 0%, #FF0000 100%)" }}
            bgGradient="linear(to-tr, #73E0A9 0%, #5B68DF 100%)"
            borderRadius="full"
            color="white"
            m="0.5rem"
          />
          <ModalBody>
            <ModalHeader>
              Confirm event
            </ModalHeader>
            <Stack direction="column" mt="0.5rem">
              {algo 
              ? (
                <>
                <Text>By pushing the button the event will be confirmed: </Text>
                <Text>Name: {info.name}</Text>
                <Text>Place: {info.location}</Text>
                <Text>Price: {info.price} ETH</Text>
                <Text>Date: {info.date}</Text>
                </>
              )
              :
              <>
                <Text>You will be redirected to home ...</Text>
                <Spinner alignSelf="center" size='xl' />
              </> 
              }
            </Stack>

          </ModalBody> 
          <ModalFooter>
          <Button
                _hover={{ bg: "#5B68DF" }}
                bg="#73E0A9"
                borderRadius="full"
                color="white"
                disabled= {!algo}
                fontSize="sm"
                onClick={() => { onSubmit(info); setAlgo(false); setTimeout(() =>router.push('/home'),5000 )}}
              >
                {algo? 'Confirm' : 'Confirmed'}
              </Button>
          
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
