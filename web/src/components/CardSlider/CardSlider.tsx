import React, { useRef, useState } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";

import style from "./CardSlider.module.css";
import CardTemp from "../Card/CardTemp";

interface PROPS {
  title: string;
  fn: (ev: { city: {} }) => boolean;
  data: [
    {
      address: string;
      city: string;
      name: string;
      symbol: string;
    }
  ];
}
// interface MAP {
//   address: string;
//   city: string;
//   name: string;
//   symbol: string
// }

export default function CardSlider({ data, title, fn }: PROPS) {
  const scrollStep = 1500;
  const cardWidth = 350;
  const columnWidth = Math.round(cardWidth * 1.15);

  const [scrollBox, setScrollBox] = useState(0);

  const dataIntermediate = fn ? data.filter(fn) : data;

  const maxWidth = (dataIntermediate.length - 1) * columnWidth - scrollStep; // superaproximado, pero hace lo suyo!

  const box = useRef<HTMLDivElement>(null);

  function goLeft(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (box.current !== null) {
      box.current.scrollBy(-scrollStep, 0);
      setScrollBox(box.current.scrollLeft);
    }
  }
  function goRight(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (box.current !== null) {
      box.current.scrollBy(scrollStep, 0);
      setScrollBox(box.current.scrollLeft);
    }
  }

  const gridColumns = dataIntermediate.reduce(
    (str) => `${str}${columnWidth}px `,
    ""
  );
  // grid-template-columns: 400px 400px 400px 400px

  return (
    <Box bg="pink" p="4">
      <Text borderBottom="2px" fontSize="3xl">
        {title}
      </Text>
      <Flex p="10px">
        {/* className={style.root} */}
        <button
          className={style.bot}
          style={
            scrollBox === 0
              ? { visibility: "hidden" }
              : { visibility: "visible" }
          }
          type="button"
          onClick={goLeft}
        >
          ◀
        </button>
        <div
          ref={box}
          className={style.box}
          style={{
            gridTemplateColumns: gridColumns,
          }}
        >
          {dataIntermediate &&
            dataIntermediate.map(({ address, city, name, symbol }) => (
              <Box>
                <CardTemp
                  key={address}
                  address={address}
                  city={city}
                  name={name}
                  symbol={symbol}
                />
              </Box>
            ))}
        </div>
        <button
          className={style.bot}
          style={
            scrollBox >= maxWidth
              ? { visibility: "hidden" }
              : { visibility: "visible" }
          }
          type="button"
          onClick={goRight}
        >
          ▶
        </button>
      </Flex>
    </Box>
  );
}
