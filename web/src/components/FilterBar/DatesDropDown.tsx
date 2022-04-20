// import { useSelector } from "react-redux";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  useState,
  useRef,
  useEffect,
} from "react"; //  ChangeEventHandler,
import { useRouter } from "next/router";
import { Select, Input, Stack } from "@chakra-ui/react";

interface FUNC {
  fn: (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => void;
}

export default function DatesDropDown({ fn }: FUNC) {
  const date = useRef<HTMLInputElement>(null);
  const { query } = useRouter();
  const [option, setOption] = useState(query.title); // Parece no tener sentido, pero forza el render cuando cambia

  useEffect(() => {
    setOption(query.opt);
  }, []);

  const handleDateMenu: ChangeEventHandler<HTMLSelectElement> = (e) => {
    e.preventDefault();
    if (date.current !== null) {
      // setOption(e.target.value);
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

  const dateOptions = [
    { value: "all", name: "All dates..." },
    { value: "days", name: "In a couple of days" },
    { value: "weekend", name: "Next weekend" },
    { value: "week", name: "Next week" },
    { value: "month", name: "Next month" },
    { value: "choose", name: "Choose a date" },
  ];
  return (
    <Stack>
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
        {dateOptions.map((opt: { value: string; name: string }) => (
          <option
            selected={!!(option && option === opt.value)}
            style={{ backgroundColor: "#38665B" }}
            value={opt.value}
          >
            {opt.name}
          </option>
        ))}
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
