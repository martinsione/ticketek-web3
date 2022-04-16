  import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import axios, { AxiosResponse } from "axios";
import { useWeb3React } from "@web3-react/core";
import { Input, Stack, Text } from "@chakra-ui/react";

export default function UserData() {
  const { account } = useWeb3React();
  const router = useRouter();
  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit: (data: {}) => Promise<
    boolean | undefined
  > = async (data: {}) => {
    const atr: AxiosResponse<any, any> = await axios.post("/api/users", {
      ...data,
      walletAddress: account,
    });
    try {
      if (atr.status === 200) return await router.push("/user/dataUserSuccess");
      return await router.push("/error");
    } catch (error) {
      router.push("/user/error");
    }
    return router.push("/home");
  };

  return (
    <Stack align="center" mb="40px" mt="50px">
      <Text>Sing up</Text>
      <Stack align="center" as="form" direction="column" onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder="Name" {...register("name")} w={300} />
        <Input placeholder="E-mail" {...register("email")} w={300} />
        <Input cursor="pointer" type="submit" w={150} />
      </Stack>
    </Stack>
  );
}
