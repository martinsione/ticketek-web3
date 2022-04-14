import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from "next/router";
import axios, { AxiosResponse } from "axios";
import { useWeb3React } from "@web3-react/core";
import { Input, Stack } from "@chakra-ui/react";

export default function UserData() {
  const { account } = useWeb3React();
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit: (data: {}) => Promise<
    boolean | undefined
  > = async (data: {}) => {
    const atr: AxiosResponse<any, any> = await axios.post("/api/users", {
      ...data,
      walletAddress: account,
    });
    try {
      const atr = await axios.post(
        "/api/users",
        { ...data, walletAddress: account },
        { withCredentials: true }
      );
      if (atr.status === 200) return router.push("/user/dataUserSuccess");
      else if (atr.status === 403) return router.push("user/forbidden");
      else if (atr.status === 500) return router.push("user/error");
      return router.push("/user/dataUserSuccess");
    } catch (error: any) {
      console.log({ error });
      if (error.response.request.status === 403)
        return router.push("/user/forbidden");
      router.push("/user/error");
    }
    return router.push("/home");
  };
  useEffect(() => {
    if (!account) router.push("/nouser");
  }, [account]);
  if (!account) return <div />;

  return (
    <Stack align="center" mb="40px" mt="50px">
      formulario para user ID: {account}
      <Stack
        align="center"
        as="form"
        direction="column"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input placeholder="Name" {...register("name")} w={300} />
        <Input placeholder="E-mail" {...register("email")} w={300} />
        <Input cursor="pointer" type="submit" w={150} />
      </Stack>
    </Stack>
  );
}
