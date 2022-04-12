import React, { useRef, useState } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";

import style from "./CardSlider.module.css";
import CardTemp from "../Card/CardTemp";

// interface Props {
//   title: string;
//   fn: () => void;
//   range: [number, number];
//   data: [];
// }

export default function CardSlider({ data, title, fn }) {
  const scrollStep = 1500;
  const cardWidth = 350;
  const columnWidth = Math.round(cardWidth * 1.15);

  const [scrollBox, setScrollBox] = useState(0);

  data = fn ? data.filter(fn) : data;

  const maxWidth = (data.length - 1) * columnWidth - scrollStep; // superaproximado, pero hace lo suyo!

  const box = useRef();

  function goLeft(e) {
    e.preventDefault();
    box.current.scrollBy(-scrollStep, 0);
    setScrollBox(box.current.scrollLeft);
  }
  function goRight(e) {
    e.preventDefault();
    box.current.scrollBy(scrollStep, 0);
    setScrollBox(box.current.scrollLeft);
    countR;
    console.log(counter);
  }

  const countR = setInterval(intervalR, 300);
  let counter = 0;
  function intervalR() {
    if (counter > 10) {
      clearInterval(countR);
      counter = 0;
      return;
    }
    counter += 1;
    console.log(
      "🚀 ~ file: CardSlider.jsx ~ line 47 ~ intervalR ~ counter",
      counter
    );
  }

  const gridColumns = data.reduce((str) => `${str}${columnWidth}px `, "");
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
          {data &&
            data.map((card) => (
              <Box>
                <CardTemp
                  key={card.address}
                  address={card.address}
                  city={card.city}
                  name={card.name}
                  symbol={card.symbol}
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
