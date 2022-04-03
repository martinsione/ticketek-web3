import EventCardViewer from "../components/EventCardsViewer/EventCardsViewer";
import NavBar from "../components/NavBar/NavBar";

function Home() {
  // const filter1 = (ev:string) => {ev.city === "Bogota"}

  return (
    <div>
      <NavBar long={false} />
      <main>
        <EventCardViewer range={[0, 3]} title="Destacados" />
        <EventCardViewer range={[4, 7]} title="En tu ciudad" />
        <EventCardViewer range={[8, 11]} title="Este fin de semana" />
      </main>
    </div>
  );
}

export default Home;
