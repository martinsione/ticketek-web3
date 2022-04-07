import axios from "axios";

export default async function getStaticProps() {
    const { data } = await axios("/api/users");
    return {
        props: {
            data,
        },
    };
}
