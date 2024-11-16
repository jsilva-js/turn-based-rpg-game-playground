"use client";

import Board from "../Board";
import Dashboard from "../Dashboard";
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
      <Dashboard>
        <Side>char</Side>
        <Board />
      </Dashboard>
    </>
  );
}

export default Main;
