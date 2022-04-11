// import { useSelector } from "react-redux";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  MutableRefObject,
  useRef,
} from "react"; //  ChangeEventHandler,
import { Select, Input } from "@chakra-ui/react";

interface FUNC {
  fn: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export default function CategoriesDropDown({ fn }: FUNC) {
  const date = useRef<HTMLInputElement>(null);
  const handleVisibleDate: ChangeEventHandler<HTMLSelectElement> = (e) => {
    e.preventDefault();
    if (date.current !== null) {
      if (e.target.value === "choose") {
        date.current.style.visibility = "visible";
      } else {
        date.current.style.visibility = "hidden";
      }
    }
    fn(e);
  };
  return (
    <>
      <Select
        bg="gray.100"
        borderRadius="30"
        defaultValue="All dates..."
        name="category"
        p="10px"
        w="15%"
        onChange={handleVisibleDate}
      >
        <option value="all">All dates...</option>
        <option value="days">In a couple of days</option>
        <option value="weekend">This weekend</option>
        <option value="month">This month</option>
        <option value="choose">Choose a date</option>
      </Select>
      <Input
        ref={date}
        background-color="gray.100"
        border-radius="30"
        id="chooseDate"
        name="date"
        placeholder="Enter your date"
        style={{ visibility: "hidden", padding: "10px", width: "15%" }}
        type="date"
      />
    </>
  );
}