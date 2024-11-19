"use client";

import React from "react";
import { useSpaceStore } from "@/providers/board_space/hook";
import styles from "./addchar.module.scss";
import { Char } from "@/lib/stores/char";

const AddChar: React.FC = () => {
  const addCharToRandomTile = useSpaceStore(
    (state) => state.add_char_to_random_tile
  );

  const handleAddChar = () => {
    const char = new Char(`char-${Math.random().toString(36).substring(2, 7)}`);
    addCharToRandomTile(char);
  };

  return (
    <button className={styles.addCharButton} onClick={handleAddChar}>
      Add Character
    </button>
  );
};

export default AddChar;
