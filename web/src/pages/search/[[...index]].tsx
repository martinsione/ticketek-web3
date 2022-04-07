import { Box } from "@chakra-ui/react";
import axios from "axios";

export default function Search({ data }: { data: { data: [] } }) {
  return (
    <>
      <div>
        {data.data.map(({ id, imageURL, artist, date, city }) => (
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
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const key in query) {
    searchLink += `${key}=${query[key]}&`;
  }
  const { data } = await axios(`/api/search?${searchLink}`);
  return {
    props: {
      data,
    },
  };
}
