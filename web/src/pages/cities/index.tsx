import axios from "axios";

export default function Evento({ data }: { data: [] }) {
  return data.map(({ artist, city, date, id, location }) => (
    <div key={id}>
      <p>artist: {artist}</p>
      <p>city: {city}</p>
      <p>date: {date}</p>
      <p>id: {id}</p>
      <p>location: {location}</p>
      <hr />
    </div>
  ));
}

export async function getStaticProps() {
  const { data } = await axios("/api/cities");
  return {
    props: {
      data,
    },
  };
}
