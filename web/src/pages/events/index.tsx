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
  const data = await fetch('http://localhost:3000/api/events');
  const json = await data.json();
  return {
    props: {
      data: json,
    },
  };
}
