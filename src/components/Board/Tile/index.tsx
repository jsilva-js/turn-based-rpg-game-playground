"use client";

import React, { useEffect } from "react";
import styles from "./tile.module.scss";
import { TileStatus, Tile as TileType } from "@/lib/stores/dasboard/tile";
import { useSpaceStore } from "@/providers/board_space/hook";
import { to_index } from "@/lib/utils/grid";
import { shallow } from "zustand/shallow";

type TileProps = {
  row: number;
  col: number;
};

const Tile: React.FC<TileProps> = ({ row, col }) => {
  const { hover_tile, select_tile, deselect_tile, hovered, width, tile } =
    useSpaceStore((state) => ({
      hover_tile: state.hover_tile,
      select_tile: state.select_tile,
      deselect_tile: state.deselect_tile,
      hovered: state.hoveredTile,
      width: state.width,
      tile: state.tiles[to_index(row, col, state.width)],
    }));

  const handleMouseEnter = () => {
    hover_tile(row, col);
  };

  const handleClick = () => {
    if (tile?.status === TileStatus.SELECTED) {
      deselect_tile(row, col);
    } else {
      select_tile(row, col);
    }
  };

  if (!tile) {
    return null;
  }

  const statuses_map = ["hovered", "selected", "highlighted", "idle"];

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      className={`${styles.tile} 
        ${styles[statuses_map[tile.status]]}`}
    >
      {tile.slot && <div className={styles.charBall}>{tile.slot.id}</div>}
    </div>
  );
};

export default Tile;
