"use client";

import ThemeSwitch from "../ThemeSwitch/ThemeSwitcher";
import styles from "./main.module.scss";

function Main() {
  return (
    <div className={styles.main}>
      <ThemeSwitch />
    </div>
  );
}

export default Main;
