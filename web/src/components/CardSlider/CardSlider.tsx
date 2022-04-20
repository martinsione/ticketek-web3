import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import React, { useRef, useState } from "react";
import { Box, Text, Flex, Stack } from "@chakra-ui/react";

import style from "./CardSlider.module.css";
import NewCard from "../Card/NewCard";

interface Props {
  data: [{ name: string; price: number; place: string; metadata: [] }];
  title: string;
  fn: (ev: any) => boolean;
  loading: boolean;
}

const estilos = {
  fontSize: "50px",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default function CardSlider({ data, title, fn, loading }: Props) {
  const scrollStep = 1500; //  1500
  const cardWidth = 300;
  const columnWidth = Math.round(cardWidth * 1.1);

  const [scrollBox, setScrollBox] = useState(0);

  const dataIntermediate = fn ? data.filter(fn) : data;

  const gridColumns = dataIntermediate.reduce(
    (str) => `${str}${columnWidth}px `,
    ""
  );

  const maxWidth = (dataIntermediate.length - 1) * columnWidth - scrollStep; // superaproximado, pero hace lo suyo!

  const box = useRef<HTMLDivElement>(null);

  function quadratic(duration: number, range: number, current: number) {
    return ((duration * 4) / range ** 4) * current ** 3;
  }

  function animateValue(start: number, duration: number, direction: string) {
    const end = 55;
    const range = end - start;
    let current = start;
    const increment = end > start ? 1 : -1;

    const step = function tomaTuNombrePaQueDejesDeJoderPutoEslintDeMierda() {
      current += increment;
      if (direction === "right" && box.current)
        box.current.scrollBy(current, 0);
      else if (direction === "left" && box.current)
        box.current.scrollBy(-current, 0);

      if (current !== end) {
        setTimeout(step, quadratic(duration, range, current));
      } else {
        setScrollBox(
          typeof box.current?.scrollLeft === "number"
            ? Number(box.current.scrollLeft)
            : 0
        );
      }
    };
    setTimeout(step, quadratic(duration, range, start));
  }

  function goLeft(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (box.current !== null) {
      animateValue(0, 400, "left");
      setScrollBox(box.current.scrollLeft);
    }
  }

  function goRight(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (box.current !== null) {
      animateValue(0, 400, "right");
    }
  }

  return (
    <Stack px="6rem" py="1rem">
      <Text borderBottom="2px" color="white" fontSize="3xl">
        {title}
      </Text>
      {loading ? (
        <div style={estilos}>Cargando...</div>
      ) : (
        <Flex p="10px">
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
            <IoIosArrowDropleftCircle color="white" />
          </button>
          <div
            ref={box}
            className={style.box}
            style={{
              gridTemplateColumns: gridColumns,
            }}
          >
            {dataIntermediate &&
              dataIntermediate.map((ev: any) => (
                <Box key={ev.symbol}>
                  <NewCard
                    address={ev.address}
                    date={ev.metadata.date}
                    image={ev.metadata.image}
                    location={ev.metadata.location}
                    name={ev.name}
                    place={ev.place}
                    price={ev.price}
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
            <IoIosArrowDroprightCircle color="white" />
          </button>
        </Flex>
      )}
    </Stack>
  );
}
