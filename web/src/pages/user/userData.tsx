import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { verify } from "jsonwebtoken";
import axios from "axios";
import { useWeb3React } from "@web3-react/core";
import { Input, Stack } from "@chakra-ui/react";

import checkConnection from "../../lib/walletConectionChecker";

const estilos = {
  fontSize: "50px",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default function UserData() {
  const { account, activate } = useWeb3React();
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  async function logOut() {
    checkConnection(false, activate, async () => {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      router.push("/nouser");
    });
  }

  useEffect(() => {
    logOut();
  }, [account]);
  if (!account) return <div style={estilos}>Detecting wallet...</div>;

  const onSubmit: (data: {}) => Promise<void> = async (data: {}) => {
    try {
      const atr = await axios.post(
        "/api/users",
        { ...data, walletAddress: account },
        { withCredentials: true }
      );
      if (atr.status === 200) router.push("/user/dataUserSuccess");
      else if (atr.status === 403) router.push("user/forbidden");
      else if (atr.status === 500) router.push("user/error");
      return;
    } catch (error: any) {
      if (error.response.request.status === 403) router.push("/user/forbidden");

      router.push("/user/error");
    }
  };

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

export async function getServerSideProps(context: {
  req: { cookies: { NFTicketLoginJWT: string } };
}) {
  const { cookies } = context.req;
  const loginJWT = cookies?.NFTicketLoginJWT;

  return verify(loginJWT, process.env.SECRET_WORD as string, (error) => {
    if (error) {
      return {
        redirect: {
          permanent: false,
          destination: "/nouser",
        },
        props: {},
      };
    }
    return {
      props: {},
    };
  });
}
