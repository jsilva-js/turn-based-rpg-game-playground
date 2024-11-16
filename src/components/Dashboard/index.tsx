"use client";

import React from "react";
import styles from "./dashboard.module.scss";

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.dashboard}>{children}</div>;
};

export default Dashboard;
