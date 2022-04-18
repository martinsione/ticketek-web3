import axios from "axios";

import CardPage from "../../components/CardPage/CardPage";

interface DATA {
  data: [
    {
      address: string;
      city: string;
      name: string;
      symbol: string;
      metadata: { date: Date; type: string };
    }
  ];
}

export default function Evento({ data }: DATA) {
  return <CardPage data={data} />;
}

export async function getServerSideProps() {
  const { data } = await axios("/api/events");
  return {
    props: {
      data,
    },
  };
  /* const data = await prisma.contract.findMany();
  return {
    props: { data },
  }; */
}
