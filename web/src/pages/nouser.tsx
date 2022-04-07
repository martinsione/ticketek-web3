import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function NoUser() {
  const router = useRouter();
  let timeOutAtr: ReturnType<typeof setTimeout>;
  function redirect() {
    timeOutAtr = setTimeout(() => {
      router.push("/home");
    }, 3000);
  }
  useEffect(() => {
    redirect();
    return () => clearTimeout(timeOutAtr);
  }, []);
  return (
    <>
      <div>You need to be logged in to see this Page</div>
      <div>You will be redirected Home</div>
      <Link href="/home" passHref>
        <div style={{ cursor: "pointer" }}>Go back Home</div>
      </Link>
    </>
  );
}
