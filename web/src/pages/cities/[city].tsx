import axios from "axios";

// import DatesDropDown from "../../components/FilterBar/DatesDropDown";
// import CategoriesDropDown from "../../components/FilterBar/CategoriesDropDown";
import CardPage from "../../components/CardPage/CardPage";

export default function City({ data, city }: { data: []; city: string }) {
  // const handleCategories = (e: React.ChangeEvent<HTMLInputElement>) => {}; //  fn={handleCategories}
  // const handleDates = (e: React.ChangeEvent<HTMLInputElement>) => {};  //  fn={handleDates}
  return (
    <>
      {/* <CategoriesDropDown />
      <DatesDropDown /> */}

      {data && <CardPage data={data} title={city} />}
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
