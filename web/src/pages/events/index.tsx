import prisma from "../../lib/prisma";
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
  return <CardPage data={data} title="All events" />;
}

export async function getStaticProps() {
  // const { data } = await axios("http://localhost:3000/api/events");
  // return {
  //   props: {
  //     data,
  //   },
  // };
  const data = await prisma.contract.findMany();
  return {
    props: { data },
  };
}
