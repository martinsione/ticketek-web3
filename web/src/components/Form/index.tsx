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
  city: string;
  date: string;
  id: string;
  image: string;
  location: string;
  title: string;
  tickets_available: number;
  tickets_left: number;
  type: "concierto" | "festival" | "exposicion";
}

export default function Form() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
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
        <FormControl isInvalid={!!errors.title}>
          <FormLabel htmlFor="title">Name</FormLabel>
          <Input
            placeholder="title"
            {...register("title", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
          <FormErrorMessage>
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.city}>
          <FormLabel htmlFor="city">City</FormLabel>
          <Input
            placeholder="City"
            {...register("city", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
          <FormErrorMessage>
            {errors.city && errors.city.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.image} maxW="100%">
          <FormLabel htmlFor="image">Image</FormLabel>
          <Input
            placeholder="Image"
            {...register("image", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
          <Image src={watch("image")} />
          <FormErrorMessage>
            {errors.image && errors.image.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.location}>
          <FormLabel htmlFor="Location">Location</FormLabel>
          <Input
            placeholder="Location"
            {...register("location", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
          <FormErrorMessage>
            {errors.location && errors.location.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.tickets_available}>
          <FormLabel htmlFor="tickets_available">Tickets available</FormLabel>
          <NumberInput min={1}>
            <NumberInputField
              placeholder="Tickets available"
              {...register("tickets_available", {
                minLength: { value: 4, message: "Minimum length should be 4" },
                min: 1,
                required: "This is required",
                valueAsNumber: true,
              })}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormErrorMessage>
            {errors.tickets_available && errors.tickets_available.message}
          </FormErrorMessage>
        </FormControl>

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
