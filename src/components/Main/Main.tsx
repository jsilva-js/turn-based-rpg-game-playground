"use client";

import Header from "../Layout";
import Side from "../Side";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitcher";
import styles from "./main.module.scss";

function Main() {
  return (
    <>
      <Header>
        <ThemeSwitch />
      </Header>
      <Side>somessssthing</Side>
    </>
  );
}

export default Main;
