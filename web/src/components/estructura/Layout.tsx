import Head from "next/head";

import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

interface LAYOUT {
  children: React.ReactNode;
}

function Layout({ children }: LAYOUT) {
  return (
    <>
      <Head>
        <title>NFTicket</title>
        <link
          href="https://cdn-icons-png.flaticon.com/512/1614/1614997.png "
          rel="icon"
        />
      </Head>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
