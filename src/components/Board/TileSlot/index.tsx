"use client";

import React from "react";
import { useSpaceStore } from "@/providers/board_space/hook";
import styles from "./tileslot.module.scss";
import Tile from "../Tile";
import { to_index } from "@/lib/utils/grid";

type TileSlotProps = {
  row: number;
  col: number;
};

const TileSlot: React.FC<TileSlotProps> = ({ row, col }) => {
  // Subscribe only to check if a tile exists at this position
  const hasTile = useSpaceStore(
    (state) => !!state.tiles[to_index(row, col, state.width)]
  );

  return (
    <div className={styles.tileSlot}>
      {hasTile && <Tile row={row} col={col} />}
    </div>
  );
};

export default TileSlot;
