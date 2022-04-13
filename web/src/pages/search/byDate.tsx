import type { AppState } from "../../redux/store";

import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { getEvents } from "../../redux/actions";
import eventData from "../../components/eventData";
import CardPage from "../../components/CardPage/CardPage";

type Props = {};

export default function byDate({}: Props) {
  const { query } = useRouter(); //  query.opt
  const dispatch = useDispatch();

  const events = useSelector((state: AppState) => state.events);
  useEffect(() => {
    dispatch(getEvents());
  }, []);

  let displayTitle: string = "";
  const filteredEvents = events.filter((ev: any) => {
    const { metadata } = eventData(ev.address);
    const { date }: Date = metadata;

    let filter: boolean;
    switch (query.opt) {
      case "all": {
        filter = true;
        break;
      }
      case "days": {
        const coupleOfDays = new Date(
          new Date().setDate(new Date().getDate() + 3)
        );
        filter = date > new Date() && date < coupleOfDays;
        displayTitle = "In a couple of days...";
        break;
      }
      case "week": {
        const week = new Date(new Date().setDate(new Date().getDate() + 8));
        filter = date > new Date() && date < week;
        displayTitle = "Within a week...";
        break;
      }
      case "weekend": {
        const fridayDay = new Date().getDate() + (4 - new Date().getDay() + 1);
        const fridayDate = new Date(new Date().setDate(fridayDay));

        const saturdayDay =
          new Date().getDate() + (5 - new Date().getDay() + 1);
        const saturdayDate = new Date(new Date().setDate(saturdayDay));

        const sundayDay = new Date().getDate() + (6 - new Date().getDay() + 1);
        const sundayDate = new Date(new Date().setDate(sundayDay));

        filter =
          date > new Date() &&
          (date.toDateString() === fridayDate.toDateString() ||
            date.toDateString() === saturdayDate.toDateString() ||
            date.toDateString() === sundayDate.toDateString());
        displayTitle = "This weekend...";
        break;
      }
      case "month": {
        const oneMonth = new Date(
          new Date().setMonth(new Date().getMonth() + 1)
        );
        filter = date > new Date() && date < oneMonth;
        displayTitle = "This month...";
        break;
      }
      default: {
        const chosenDate = new Date(`${query.opt}Z`); // Raro, toma el dia anterior !!!
        filter = date.toDateString() === chosenDate.toDateString();
        displayTitle = chosenDate.toDateString();
      }
    }

    return filter;
  });
  const eventsWithContractData = filteredEvents.map((ev: any) => ({
    ...ev,
    contract: eventData(ev.address),
  }));

  return (
    <>
      {/* <CategoriesDropDown />
      <DatesDropDown /> */}

      {eventsWithContractData && (
        <CardPage data={eventsWithContractData} title={displayTitle} />
      )}
    </>
  );
}
