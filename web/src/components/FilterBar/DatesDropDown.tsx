// import { useSelector } from "react-redux";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  // MutableRefObject,
  useRef,
} from "react"; //  ChangeEventHandler,
import { Select, Input, Stack } from "@chakra-ui/react";

interface FUNC {
  fn: (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => void;
}

export default function DatesDropDown({ fn }: FUNC) {
  const date = useRef<HTMLInputElement>(null);

  const handleDateMenu: ChangeEventHandler<HTMLSelectElement> = (e) => {
    e.preventDefault();
    if (date.current !== null) {
      if (e.target.value === "choose") {
        date.current.style.visibility = "visible";
      } else {
        date.current.style.visibility = "hidden";
        fn(e);
      }
    }
  };

  const handleChooseDate: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    fn(e);
  };
  return (
    <Stack >
      <Select
        bg="#38665B"
        border="none"
        borderRadius="30"
        color="white"
        defaultValue="All dates..."
        id="presetDate"
        name="category"
        width="20rem"
        onChange={handleDateMenu}
      >
        <option style={{ backgroundColor: "#38665B" }} value="all">All dates...</option>
        <option style={{ backgroundColor: "#38665B" }} value="days">In a couple of days</option>
        <option style={{ backgroundColor: "#38665B" }} value="weekend">This weekend</option>
        <option style={{ backgroundColor: "#38665B" }} value="week">Next week</option>
        <option style={{ backgroundColor: "#38665B" }} value="month">This month</option>
        <option style={{ backgroundColor: "#38665B" }} value="choose">Choose a date</option>
      </Select>
      <Input
        ref={date}
        backgroundColor="gray.100"
        borderRadius="30px"
        id="userDate"
        name="date"
        placeholder="Enter your date"
        type="date"
        visibility="hidden"
        onChange={handleChooseDate}
      />
    </Stack>
  );
}
