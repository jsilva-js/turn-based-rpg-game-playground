"use client";

import React from "react";
import styles from "./tile.module.scss";
import { Tile as TileType } from "@/lib/stores/dasboard/tile";

type TileProps = {
  tile: TileType;
};

const Tile: React.FC<TileProps> = ({ tile }) => {
  return (
    <div className={`${styles.tile} ${styles[tile.state]}`}>{tile.id}</div>
  );
};

export default Tile;
