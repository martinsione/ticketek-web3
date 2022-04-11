import axios from "axios";

import CardPage from "../../components/CardPage/CardPage";

export default function Evento({ data }: { data: [] }) {
  return <CardPage data={data} title="All events" />;
}

export async function getStaticProps() {
  const { data } = await axios("http://localhost:3000/api/events");
  return {
    props: {
      data,
    },
  };
}
