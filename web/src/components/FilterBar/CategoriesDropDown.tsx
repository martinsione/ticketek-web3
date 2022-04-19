import { useDispatch, useSelector } from "react-redux";
import React, { ChangeEvent, useEffect } from "react";
import { Select } from "@chakra-ui/react";

import { AppState } from "../../redux/store";
import { getCategories } from "../../redux/actions";

interface FUNC {
  fn: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export default function CategoriesDropDown({ fn }: FUNC) {
  const dispatch = useDispatch();
  const { categories, events } = useSelector((state: AppState) => state);

  useEffect(() => {
    if (!categories.length) {
      dispatch(getCategories(events));
    }
  }, [events]);

  return (
    <Select
      bg="#38665B"
      border="none"
      borderRadius="30"
      color="white"
      defaultValue="All events..."
      name="category"
      // p="10px"
      onChange={fn}
    >
      <option style={{ backgroundColor: "#38665B" }} value="all">All categories...</option>
      {categories &&
        categories.map((type: string) => (
          <option key={type} style={{ backgroundColor: "#38665B" }} value={type}>
            {type}
          </option>
        ))}
    </Select>
  );
}
