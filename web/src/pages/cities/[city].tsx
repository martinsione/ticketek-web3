import EventCardViewer from "../../components/EventCardsViewer/EventCardsViewer";
import axios from "axios";

export default function City({ data, city }: { data: []; city: string }) {
  return data && <EventCardViewer json={data} range={[0, 5]} title={city} />;
}

export async function getStaticProps(context: { params: { city: string } }) {
  const { params } = context;
  const { data } = await axios(`/api/cities/${params.city}`);

  if (!data.length) return { notFound: true };

  return {
    props: {
      data,
      city: params.city,
    },
  };
}

export async function getStaticPaths() {
  interface EVENT {
    city: string;
  }
  const { data } = await axios("/api/cities");

  const paths = data.map((event: EVENT) => ({
    params: {
      city: `${event.city}`,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
