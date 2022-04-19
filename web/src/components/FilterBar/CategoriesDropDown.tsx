import { useDispatch, useSelector } from "react-redux";
import React, { ChangeEvent, useEffect } from "react";
import { Select } from "@chakra-ui/react";

import { IState } from "../../redux/reducer";
import { getCategories } from "../../redux/actions";

interface FUNC {
  fn: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export default function CategoriesDropDown({ fn }: FUNC) {
  const dispatch = useDispatch();
  const { categories, events } = useSelector((state: IState) => state);

  useEffect(() => {
    if (!(categories as any).length) {
      dispatch(getCategories(events));
    }
  }, [events]);

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
      {categories &&
        categories.map((type: string) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
    </Select>
  );
}
