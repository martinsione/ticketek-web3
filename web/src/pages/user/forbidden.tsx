import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Forbidden() {
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
      <div style={{ fontSize: "60px" }}>Forbidden access</div>;
      <div style={{ fontSize: "60px" }}>You will be redirected now</div>
    </>
  );
}
