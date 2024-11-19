"use client";

import React, { useEffect } from "react";
import { useSpaceStore } from "@/providers/board_space/hook";
import styles from "./board.module.scss";
import TileSlot from "./TileSlot";

const Board = () => {
  const { width, height, set_tile } = useSpaceStore((state) => ({
    width: state.width,
    height: state.height,
    set_tile: state.set_tile,
  }));

  useEffect(() => {
    const randomTile1 = {
      row: Math.floor(Math.random() * height),
      col: Math.floor(Math.random() * width),
    };
    const randomTile2 = {
      row: Math.floor(Math.random() * height),
      col: Math.floor(Math.random() * width),
    };
    set_tile(randomTile1.row, randomTile1.col);
    set_tile(randomTile2.row, randomTile2.col);
  }, [set_tile, width, height]);

  return (
    <div className={styles.board}>
      {Array.from({ length: height }).map((_, row) => (
        <div key={`row-${row}`} className={styles.row}>
          {Array.from({ length: width }).map((_, col) => (
            <TileSlot key={`slot-${row}-${col}`} row={row} col={col} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
