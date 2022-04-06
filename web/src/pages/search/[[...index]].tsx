import { Box } from "@chakra-ui/react";

import NavBar from "../../components/NavBar/NavBar";

export default function Search({ json }: { json: { data: [] } }) {
  // console.log("DESDE SEARCH", { RESULTADO: json });
  return (
    <>
      <NavBar long={false} />
      <div>
        {json.data.map(({ id, imageURL, artist, date, city }) => (
          <div key={id}>
            <Box w={200}>
              <img alt="" src={imageURL} />
            </Box>
            <div>Artist: {artist}</div>
            <div>Date: {date}</div>
            <div>City: {city}</div>
            <hr />
          </div>
        ))}
      </div>
    </>
  );
}

export async function getServerSideProps(context: { query: any }) {
  const { query } = context;
  let searchLink: string = "";
  // eslint-disable-next-line guard-for-in, no-restricted-syntax
  for (const key in query) {
    searchLink += `${key}=${query[key]}&`;
  }
  const data = await fetch(`/api/search?${searchLink}`);
  const json = await data.json();
  return {
    props: {
      json,
    },
  };
}
