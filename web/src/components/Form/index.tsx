import { useForm, SubmitHandler } from "react-hook-form";
import {
  Stack,
  Image,
  Button,
  Input,
  FormControl,
  FormLabel,
  NumberInput,
  FormErrorMessage,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

interface InputProps {
  name: string;
  symbol: string;
  description: string;
  numberOfTickets: number;
  type: string;
  image: File;
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

  const onSubmit: SubmitHandler<InputProps> = (data) =>
    new Promise<void>((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(data, null, 2));
        resolve();
      }, 1500);
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        border="1px"
        borderColor="blackAlpha.300"
        borderRadius="md"
        maxW="container.sm"
        minW="container.sm"
        my="16px"
        px="16px"
        py="12px"
        spacing="12px"
      >
        <Input {...register("name")} placeholder="Name" />
        <Input {...register("symbol")} placeholder="Symbol" />
        <Input {...register("description")} placeholder="Description" />
        <Input {...register("city")} placeholder="City" />
        <Input {...register("date")} placeholder="Date" type="date" />
        <Input {...register("country")} placeholder="Country" />
        <Input {...register("location")} placeholder="Location" />
        <Input {...register("type")} placeholder="Type" />
        <Input {...register("price")} placeholder="Price" />
        <Input
          {...register("numberOfTickets")}
          placeholder="Number of tickets"
          type="number"
        />
        <Input
          {...register("image")}
          accept=".png,.jpg,.jpeg"
          placeholder="Image"
          type="file"
        />

        <Button
          colorScheme="teal"
          isLoading={isSubmitting}
          mt={4}
          type="submit"
        >
          Submit
        </Button>
      </Stack>
    </form>
  );
}
