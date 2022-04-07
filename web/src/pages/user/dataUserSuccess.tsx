import { useRouter } from "next/router";
import { useEffect } from "react";

export default function dataUserSuccess() {
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
      <div style={{ fontSize: "50px" }}>Data has been successfully changed</div>
      ;<div style={{ fontSize: "50px" }}>You will be redirected now</div>
    </>
  );
}
