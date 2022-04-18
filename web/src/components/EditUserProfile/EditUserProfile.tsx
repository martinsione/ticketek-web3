import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Input, Stack} from "@chakra-ui/react";


interface IUser {
    image: string,
    name: string,
    email: string
}

interface InputProps {
    name: string;
    email: string;
    image: FileList;
}


export default function EditUserProfile (account: any){
    
    
    const [user, setUser] = useState({} as IUser);
    const router = useRouter();
    const { register, handleSubmit } = useForm<InputProps>();
    
    async function getUserData() {
        const data = await axios.get('/api/test') 
        setUser(data.data)
    }

    useEffect(() => {
        getUserData()
    },[])

    
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
                    const atr = await axios.post(
                        "/api/users",
                        {
                            name: data.name,
                            email: data.email,
                            walletAddress: account,
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
                <Input  defaultValue={user.name} placeholder="Name"{...register("name")} w={300} />
                <Input  defaultValue={user.email} placeholder="E-mail" {...register("email")} w={300} />
                <Input
                    placeholder="User Image"
                    {...register("image")}
                    accept=".png,.jpg,.jpeg"
                    type="file"
                    w={300}
                />
                <Input cursor="pointer" type="submit" w={150} />
            </Stack>
    )
}