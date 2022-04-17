import { useDispatch, useSelector } from "react-redux";
import React, { ChangeEvent, useEffect } from "react";
import { Select } from "@chakra-ui/react";

import { getCategories } from "../../redux/actions";

interface FUNC {
  fn: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export default function CategoriesDropDown({ fn }: FUNC) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories);
  }, []);
  const allCategories = useSelector(
    (state: { categories: [] }) => state.categories
  ); //  .sort

  return (
    <Select
      bg="gray.100"
      borderRadius="30"
      defaultValue="All events..."
      name="category"
      p="10px"
      w="25%"
      onChange={fn}
    >
      <option value="all">All categories...</option>
      {allCategories &&
        allCategories.map((type: string) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
    </Select>
  );
}
