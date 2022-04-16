import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";
import { useWeb3React } from "@web3-react/core";
import { Input, Stack } from "@chakra-ui/react";

const estilos = {
  fontSize: "50px",
  color: "white",
};

export default function UserData() {
  const { account, activate } = useWeb3React();
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    logOut();
  }, [account]);
  if (!account) return <div style={estilos}>Detecting wallet...</div>;

  async function logOut() {
    checkConnection(false, activate, async () => {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      router.push("/nouser");
    });
  }

  const onSubmit: (data: {}) => Promise<
    boolean | undefined
  > = async (data: {}) => {
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
      if (error.response.request.status === 403) {
        return router.push("/user/forbidden");
      }
      router.push("/user/error");
    }
    return router.push("/home");
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

import { verify } from "jsonwebtoken";
import { useEffect } from "react";
import checkConnection from "../../lib/walletConectionChecker";

export async function getServerSideProps(context: {
  req: { cookies: { NFTicketLoginJWT: string } };
}) {
  const { cookies } = context.req;
  const loginJWT = cookies?.NFTicketLoginJWT;

  return verify(loginJWT, process.env.SECRET_WORD as string, (error, user) => {
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
