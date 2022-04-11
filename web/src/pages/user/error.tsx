import { useEffect } from "react";
import { useRouter } from "next/router";

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
      <div style={{ fontSize: "50px" }}>
        Something went wrong, data could not be changed
      </div>
      ;<div style={{ fontSize: "50px" }}>You will be redirected now</div>
    </>
  );
}
