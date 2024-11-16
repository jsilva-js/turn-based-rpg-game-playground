"use client";
import styles from "./layout.module.scss";

const Side = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.lay}>{children}</div>;
};

export default Side;
