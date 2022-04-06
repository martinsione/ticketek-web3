import EventCardViewer from "../../components/EventCardsViewer/EventCardsViewer";

export default function City({ data, city }: { data: []; city: string }) {
  return data && <EventCardViewer json={data} range={[0, 5]} title={city} />;
}

export async function getStaticProps(context: { params: { city: string } }) {
  const { params } = context;
  const data = await fetch(`http://localhost:3000/api/cities/${params.city}`);
  const json = await data.json();

  if (!json.length) return { notFound: true };

  return {
    props: {
      data: json,
      city: params.city,
    },
  };
}

export async function getStaticPaths() {
  interface EVENT {
    city: string;
  }
  const data = await fetch("http://localhost:3000/api/cities");
  const json = await data.json();

  const paths = json.map((event: EVENT) => ({
    params: {
      city: `${event.city}`,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
