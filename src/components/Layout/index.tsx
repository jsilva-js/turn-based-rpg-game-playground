"use client";
import styles from "./layout.module.scss";

const MenusLayout = ({ children }: { children: React.ReactNode }) => {
  return <header className={styles.lay}>{children}</header>;
};

export default MenusLayout;
