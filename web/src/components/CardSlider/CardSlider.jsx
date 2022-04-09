import React from "react";

import style from "./CardSlider.module.css";

export default function CardSlider() {
  const scroll = 1500;
  function goLeft(e) {
    e.preventDefault();
    document.querySelector("#box").scrollBy(-scroll, 0);
  }
  function goRight(e) {
    e.preventDefault();
    document.querySelector("#box").scrollBy(scroll, 0);
  }
  return (
    <div className={style.root}>
      <button className={style.bot} type="button" onClick={goLeft}>
        ◀
      </button>
      <ul className={style.box} id="box">
        <li className={style.item}>test0</li>
        <li className={style.item}>test1</li>
        <li className={style.item}>test2</li>
        <li className={style.item}>test3</li>
        <li className={style.item}>test4</li>
        <li className={style.item}>test5</li>
        <li className={style.item}>test6</li>
        <li className={style.item}>test7</li>
        <li className={style.item}>test8</li>
        <li className={style.item}>test9</li>
      </ul>
      <button className={style.bot} type="button" onClick={goRight}>
        ▶
      </button>
    </div>
  );
}
