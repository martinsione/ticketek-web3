import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";
import { Input, Stack } from "@chakra-ui/react";

// interface IUser {
//     image: string;
//     name: string;
//     email: string;
// }

interface InputProps {
    name: string;
    email: string;
    image: FileList;
}

export default function EditUserProfile(account: any) {
    const router = useRouter();
    const { register, handleSubmit } = useForm<InputProps>();
    const { name, email } = account;

    const onSubmit: SubmitHandler<InputProps> = async (data) => {
        try {
            const formData = new FormData();
            formData.append("file", data.image[0]);
            formData.append("upload_preset", "eqhbw7eb");

            axios
                .post(
                    "https://api.cloudinary.com/v1_1/dm9n9hrgn/image/upload",
                    formData
                )
                .then(async (res) => {
                    // eslint-disable-next-line react/destructuring-assignment

                    const atr = await axios.put(
                        // eslint-disable-next-line react/destructuring-assignment
                        `/api/users/${account.account.walletAddress}`,
                        {
                            name: data.name,
                            email: data.email,
                            image: res.data.public_id.toString(),
                        },
                        { withCredentials: true }
                    );
                    if (atr.status === 200)
                        router.push("/user/dataUserSuccess");
                    else if (atr.status === 403) router.push("user/forbidden");
                    else if (atr.status === 500) router.push("user/error");
                })
                .catch((err) => err);
        } catch (error: any) {
            if (error.response.request.status === 403)
                router.push("/user/forbidden");

            router.push("/user/error");
        }
    };

    return (
        <Stack
            align="center"
            as="form"
            direction="column"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Input
                defaultValue={name}
                placeholder="Name"
                {...register("name")}
                w={300}
            />
            <Input
                defaultValue={email}
                placeholder="E-mail"
                {...register("email")}
                w={300}
            />
            <Input
                placeholder="User Image"
                {...register("image")}
                accept=".png,.jpg,.jpeg"
                type="file"
                w={300}
            />
            <Input cursor="pointer" type="submit" w={150} />
        </Stack>
    );
}
