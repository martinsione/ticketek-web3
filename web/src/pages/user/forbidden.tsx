import { useRouter } from "next/router";
import { useEffect } from "react";

const estilos = {
  fontSize: "50px",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

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
      <div style={estilos}>Forbidden access</div>;
      <div style={estilos}>You will be redirected now</div>
    </>
  );
}
