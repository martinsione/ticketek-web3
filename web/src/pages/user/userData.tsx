import { Input } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function UserData() {
  const { account } = useWeb3React();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: {}) => {
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
  };
  useEffect(() => {
    if (!account) router.push("/nouser");
  }, [account]);
  if (!account) return <div></div>;

  return (
    <div>
      formulario para user ID: {account}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder="Name" {...register("name")} w={300} />
        <Input placeholder="E-mail" {...register("email")} w={300} />
        <Input type="submit" w={150} />
      </form>
    </div>
  );
}
