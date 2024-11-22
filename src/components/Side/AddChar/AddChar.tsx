"use client";

import React from "react";
import { useSpaceStore } from "@/providers/board_space/hook";
import styles from "./addchar.module.scss";
import { Char } from "@/lib/stores/char";

const AddChar: React.FC = () => {
  const add_char_to_random_tile = useSpaceStore(
    (state) => state.add_char_to_random_tile
  );

  const handleAddChar = () => {
    const randomRow = Math.floor(Math.random() * 24);
    const randomCol = Math.floor(Math.random() * 24);

    const char: Char = {
      id: `char-${Math.random().toString(36).substring(2, 7)}`,
      row: randomRow,
      col: randomCol,
      move_points: 5,
    };

    add_char_to_random_tile(char);
  };

  return (
    <button className={styles.addCharButton} onClick={handleAddChar}>
      Add Character
    </button>
  );
};

export default AddChar;
