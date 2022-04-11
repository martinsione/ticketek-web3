import axios from "axios";

export default function Evento({ data }: { data: [] }) {
  return data.map(({ address, city, name, symbol }) => (
    <div key={address}>
      <p>address: {address}</p>
      <p>city: {city}</p>
      <p>name: {name}</p>
      <p>symbol: {symbol}</p>
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
