import EventCardViewer from "../components/EventCardsViewer/EventCardsViewer";

function Home() {
  // const filter1 = (ev:string) => {ev.city === "Bogota"}

  return (
    <div>
      <main>
        <EventCardViewer range={[0, 4]} title="Destacados" />
        <EventCardViewer range={[4, 8]} title="En tu ciudad" />
        <EventCardViewer range={[7, 13]} title="Este fin de semana" />
      </main>
    </div>
  );
}

export default Home;
