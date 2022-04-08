import axios from "axios";

import EventCardViewer from "../../components/EventCardsViewer/EventCardsViewer";

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
  const { data } = await axios("/api/cities");

  const paths = data.map((city: string) => ({ params: city }));
  console.log("🚀 ~ file: [city].tsx ~ line 34 ~ paths ~ paths", paths);

  return {
    paths,
    fallback: false,
  };
}
// export async function getStaticPaths() {
//   interface EVENT {
//     city: string;
//   }
//   const { data } = await axios("/api/cities");

//   const paths = data.map((city) => ({
//     params: {
//       city,
//     },
//   }));
//   console.log("🚀 ~ file: [city].tsx ~ line 34 ~ paths ~ paths", paths);

//   return {
//     paths,
//     fallback: false,
//   };
// }
