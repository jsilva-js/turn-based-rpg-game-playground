"use client";

import React from "react";
import { useSpaceStore } from "@/providers/board_space/hook";
import styles from "./tileslot.module.scss";
import { to_index } from "@/lib/utils/grid";
import Tile from "../Tile";

type TileSlotProps = {
  row: number;
  col: number;
};

const TileSlot: React.FC<TileSlotProps> = ({ row, col }) => {
  const tile = useSpaceStore((state) => {
    const idx = to_index(row, col, state.width);
    return state.tiles[idx];
  });

  return <div className={styles.tileSlot}>{tile && <Tile tile={tile} />}</div>;
};

export default TileSlot;
