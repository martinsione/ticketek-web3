export default function Evento({ data }: { data: [] }) {
  return (
    data &&
    data.map(
      ({
        artist,
        city,
        date,
        id,
        location,
        imageURL,
        type,
        tickets_available,
        tickets_left,
      }) => (
        <div key={id}>
          <p>artist: {artist}</p>
          <p>city: {city}</p>
          <p>date: {date}</p>
          <p>id: {id}</p>
          <p>type: {type}</p>
          <p>imageURL: {imageURL}</p>
          <p>tickets_available: {tickets_available}</p>
          <p>tickets_left: {tickets_left}</p>
          <p>location: {location}</p>
          <hr />
        </div>
      )
    )
  );
}

export async function getStaticProps(context: { params: { evento: string } }) {
  const { params } = context;
  const data = await fetch(`http://localhost:3000/api/events/${params.evento}`);
  const json = await data.json();

  if (!json.length) return { notFound: true };

  return {
    props: {
      data: json,
    },
  };
}

export async function getStaticPaths() {
  interface EVENT {
    id: number;
  }
  const data = await fetch("http://localhost:3000/api/events");
  const json = await data.json();

  const paths = json.map((event: EVENT) => {
    return {
      params: {
        evento: `${event.id}`,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}
