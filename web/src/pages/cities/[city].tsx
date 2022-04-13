import prisma from "../../lib/prisma";
import CardPage from "../../components/CardPage/CardPage";

// import DatesDropDown from "../../components/FilterBar/DatesDropDown";
// import CategoriesDropDown from "../../components/FilterBar/CategoriesDropDown";

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

export async function getStaticProps(context: { params: { city: string } }) {
  // const { data } = await axios(
  //   `http://localhost:3000/api/cities/${params.city}`
  // );

  // if (!data.length) return { notFound: true };

  // return {
  //   props: {
  //     data,
  //     city: params.city,
  //   },
  // };
  const { params } = context;
  const cities = await prisma.contract.findMany();

  const data = cities.filter((e: { city: string }) => e.city === params.city);

  return {
    props: {
      data,
    },
  };
}

export async function getStaticPaths() {
  const cities = await prisma.contract.findMany();
  const paths = cities.map((element) => ({
    params: { city: element.city.toLowerCase() },
  }));
  return {
    paths,
    fallback: true,
  };
}
