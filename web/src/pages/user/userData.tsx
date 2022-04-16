import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useWeb3React } from "@web3-react/core";
import { Input, Stack } from "@chakra-ui/react";

interface InputProps {
    name: string;
    email: string;
    image: FileList;
}

export default function UserData() {
    const { account } = useWeb3React();
    const router = useRouter();
    const { register, handleSubmit } = useForm<InputProps>();

    const onSubmit: SubmitHandler<InputProps> = async (data) => {
        //   const atr: AxiosResponse<any, any> = await axios.post("/api/users", {
        //       ...data,
        //       walletAddress: account,
        //   });
        console.log(data.image[0]);
        try {
            const formData = new FormData();
            formData.append("file", data.image[0]);
            formData.append("upload_preset", "eqhbw7eb");

            axios
                .post(
                    "https://api.cloudinary.com/v1_1/dm9n9hrgn/image/upload",
                    formData
                )
                .then((res) => {
                    axios
                        .post("/api/users", {
                            name: data.name,
                            email: data.email,
                            walletAddress: account,
                            image: res.data.public_id.toString(),
                        })
                        .then((response) => console.log(response));
                })
                .catch((err) => console.log(err));
        } catch (error) {
            console.log(error);
        }

        //   try {
        //       if (atr.status === 200)
        //           return await router.push("/user/dataUserSuccess");
        //       return await router.push("/error");
        //   } catch (error) {
        //       router.push("/user/error");
        //   }
        //   return router.push("/home");
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
                <Input
                    placeholder="User Image"
                    {...register("image")}
                    accept=".png,.jpg,.jpeg"
                    type="file"
                />
                <Input cursor="pointer" type="submit" w={150} />
            </Stack>
        </Stack>
    );
}
