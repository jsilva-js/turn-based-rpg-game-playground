"use client";

import React from "react";
import { useSpaceStore } from "@/providers/board_space/hook";
import styles from "./createtile.module.scss";
import { Tile } from "@/lib/stores/dasboard/tile";

const CreateTile: React.FC = () => {
  const { tiles, width, createTile } = useSpaceStore((state) => ({
    tiles: state.tiles,
    width: state.width,
    createTile: state.create_tile, // New action to create tiles
  }));

  const handleCreateTiles = () => {
    // Find the first `null` space and create a tile
    tiles.forEach((tile, idx) => {
      if (tile === null) {
        const row = Math.floor(idx / width);
        const col = idx % width;
        createTile(row, col); // Action to create a tile at this position
      }
    });
  };

  return (
    <button className={styles.createTileButton} onClick={handleCreateTiles}>
      Create Tiles
    </button>
  );
};

export default CreateTile;
