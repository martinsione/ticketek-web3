import EventCardViewer from "../components/EventCardsViewer/EventCardsViewer";
import NavBar from "../components/NavBar/NavBar";

interface JSON {
  json: [];
}

function Home({ json }: JSON) {
  // const filter1 = (ev:string) => {ev.city === "Bogota"}

  return (
    <div>
      <NavBar long={false} />
      <main>
        <EventCardViewer range={[0, 3]} title="Destacados" json={json} />
        <EventCardViewer range={[4, 7]} title="En tu ciudad" json={json} />
        <EventCardViewer
          range={[8, 11]}
          title="Este fin de semana"
          json={json}
        />
      </main>
    </div>
  );
}

export default Home;

export async function getStaticProps() {
  const data = await fetch("http://localhost:3000/api/events");
  const json = await data.json();
  return {
    props: {
      json,
    },
  };
}
