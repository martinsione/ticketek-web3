import Link from "next/link";
import axios from "axios";
import { Button } from "@chakra-ui/react";

export default function Home() {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <Link passHref href="/home">
      <Button
        backgroundColor="transparent"
        className="border-gradient"
        fontSize="32px"
        fontWeight="semibold"
        px="48px"
        py="32px"
        rounded="full"
      >
        Explore
      </Button>
    </Link>
  );
}
