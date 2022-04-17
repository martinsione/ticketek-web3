// eslint-disable-next-line import/prefer-default-export
import axios from "axios";


import dateFilter from "../components/Functional Components/dateFilter";
import ContractReader from "../components/Functional Components/ContractReader";

export function getEvents() {

    // eslint-disable-next-line func-names
    return async function (
        dispatch: (arg0: { type: string; payload: {} }) => {}
    ) {
        const { data } = await axios("/api/events");
        return dispatch({
            type: "GET_EVENTS",
            payload: data,
        });
    };
}

export function getCategories() {
  // eslint-disable-next-line func-names
  return async function (
    dispatch: (arg0: { type: string; payload: {} }) => {}
  ) {
    // interface EVENT {
    //   metadata: { type: string };
    // }
    const { data } = await axios("/api/events");
    // const addresses = data.map((ev: { address: string }) => ev.address);
    const categories = data.map(
      // async (address: string) => (await ContractReader(address)).metadata.type
      (ev: { metadata: { type: string } }) => ev.metadata.type
    );
    const uniqueCategories = categories.filter(
      (item: never, index: number, arr: []) => arr.indexOf(item) === index
    );
    return dispatch({
      type: "GET_CATEGORIES",
      payload: uniqueCategories,
    });
  };
}
export function getCities() {
  // eslint-disable-next-line func-names
  return async function (
    dispatch: (arg0: { type: string; payload: {} }) => {}
  ) {
    const { data } = await axios("/api/events");
    const cities = data.map((ev: { place: string }) => ev.place);
    const uniqueCities = cities.filter(
      (item: never, index: number, arr: []) => arr.indexOf(item) === index
    );
    return dispatch({
      type: "GET_CITIES",
      payload: uniqueCities,
    });
  };
}
export function getContracts() {
  // eslint-disable-next-line func-names
  return async function (
    dispatch: (arg0: { type: string; payload: {} }) => {}
  ) {
    const { data } = await axios("/api/events");
    const contracts = data.map((e: any) => {
      const contract = ContractReader(e.address);
      return { ...e, ...contract };
    });


        return dispatch({
            type: "GET_CONTRACTS",
            payload: contracts,
        });
    };
}
export function filterEvents(data: [], { date, city, category }: any) {
  // eslint-disable-next-line func-names
  return async function (
    dispatch: (arg0: { type: string; payload: {} }) => {}
  ) {
    const dataDate = date ? dateFilter(data, date) : data;
    const dataCategory =
      category && category !== "all"
        ? dataDate.filter((ev: any) => ev.metadata.type === category)
        : dataDate;
    const dataCity =
      city && city !== "all"
        ? dataCategory.filter((ev: any) => ev.city === city)
        : dataCategory;
    const dataFinal = dataCity;
    return dispatch({
      type: "FILTER_EVENTS",
      payload: dataFinal,
    });
  };
}
