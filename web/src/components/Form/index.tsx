// import Web3 from "web3";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  // Image,
  Button,
  Input,
  Box,
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

  const onSubmit: SubmitHandler<InputProps> = (data) => {
    new Promise<void>((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(data, null, 2));
        resolve();
      }, 1500);

    });

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
      price,
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
      onSubmit={handleSubmit(onSubmit)}
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
      >
        Submit
      </Button>
    </Box>
  );
}
