import { useEffect } from "react";
import { useRouter } from "next/router";

const estilos = {
  fontSize: "50px",
  color: "white",
};

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
      <div style={estilos}>Data has been successfully changed</div>;
      <div style={estilos}>You will be redirected now</div>
    </>
  );
}
