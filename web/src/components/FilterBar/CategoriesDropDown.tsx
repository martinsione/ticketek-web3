import { useDispatch, useSelector } from "react-redux";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Select } from "@chakra-ui/react";

import { IState } from "../../redux/reducer";
import { getCategories } from "../../redux/actions";

interface FUNC {
  fn: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export default function CategoriesDropDown({ fn }: FUNC) {
  const dispatch = useDispatch();
  const { categories, events } = useSelector((state: IState) => state);
  const { query } = useRouter();
  const [category, setCategory] = useState(query.title); // Parece no tener sentido (title no existe), pero forza el render cuando cambia

  useEffect(() => {
    setCategory(query.cat);
  }, []);

  useEffect(() => {
    if (!(categories as any).length) {
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
      <option style={{ backgroundColor: "#38665B" }} value="all">
        All categories...
      </option>
      {categories &&
        categories.map((type: string) => (
          <option
            key={type}
            selected={!!(category && category === type)}
            style={{ backgroundColor: "#38665B" }}
            value={type}
          >
            {type}
          </option>
        ))}
    </Select>
  );
}
