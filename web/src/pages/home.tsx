import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import EventCardViewer from "../components/EventCardsViewer/EventCardsViewer";

function Home() {
  // const filter1 = (ev:string) => {ev.city === "Bogota"}

  return (
    <div>
      <nav>
        <NavBar />
      </nav>
      <main>
        <EventCardViewer range={[0, 4]} title="Destacados" />
        <EventCardViewer range={[4, 8]} title="En tu ciudad" />
        <EventCardViewer range={[7, 13]} title="Este fin de semana" />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Home;
