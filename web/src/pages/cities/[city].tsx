import axios from "axios";

import DatesDropDown from "../../components/FilterBar/DatesDropDown";
import CategoriesDropDown from "../../components/FilterBar/CategoriesDropDown";
import EventCardViewer from "../../components/EventCardsViewer/EventCardsViewer";

export default function City({ data, city }: { data: []; city: string }) {
  const handleDates = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.value === "choose") {
      document.querySelector("#chooseDate").style.visibility = "visible";
    } else {
      document.querySelector("#chooseDate").style.visibility = "hidden";
    }
  };
  return (
    <>
      <CategoriesDropDown />
      <DatesDropDown fn={handleDates} />

      {data && <EventCardViewer json={data} range={[0, 5]} title={city} />}
    </>
  );
}

export async function getServerSideProps(context: {
  params: { city: string };
}) {
  const { params } = context;
  const { data } = await axios(
    `http://localhost:3000/api/cities/${params.city}`
  );

  if (!data.length) return { notFound: true };

  return {
    props: {
      data,
      city: params.city,
    },
  };
}

// export async function getStaticPaths() {
//   const { data } = await axios("/api/cities");

//   const paths = data.map((city: string) => ({ params: city }));
//   console.log("🚀 ~ file: [city].tsx ~ line 34 ~ paths ~ paths", paths);

//   return {
//     paths,
//     fallback: false,
//   };
// }
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
