// import prisma from "../../lib/prisma";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default function Evento({ data }: { data: [] }) {
  // return data.map(({ address, city, name, symbol }) => (
  //   <div key={address}>
  //     <p>address: {address}</p>
  //     <p>city: {city}</p>
  //     <p>name: {name}</p>
  //     <p>symbol: {symbol}</p>
  //     <hr />
  //   </div>
  // ));
  return data.map((element) => <div>{element}</div>);
}

export async function getStaticProps() {
  const justCities = (await prisma.contract.findMany()).map(
    (e: { city: string }) => e.city
  );
  const cities = new Set(justCities);
  return {
    props: {
      data: Array.from(cities),
    },
  };
}
