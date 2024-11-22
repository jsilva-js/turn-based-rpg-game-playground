import React from "react";
import styles from "./tile.module.scss";
import { useSpaceStore } from "@/providers/board_space/hook";
import { to_index } from "@/lib/utils/grid";
import { TileStatus } from "@/lib/stores/dasboard/space";
import { useCharStore } from "@/lib/stores/char";

type TileProps = {
  row: number;
  col: number;
};

const Tile: React.FC<TileProps> = React.memo(({ row, col }) => {
  const hover_tile = useSpaceStore((state) => state.hover_tile);
  const select_tile = useSpaceStore((state) => state.select_tile);
  const deselect_tile = useSpaceStore((state) => state.deselect_tile);
  const width = useSpaceStore((state) => state.width);

  const idx = React.useMemo(() => to_index(row, col, width), [row, col, width]);

  const tile = useSpaceStore((state) => state.tiles[idx]);

  const handleMouseEnter = () => {
    hover_tile(row, col);
  };

  const move = useCharStore((state) => state.world_map[idx]);
  const { select_char } = useCharStore();

  const handleClick = () => {
    if (tile?.slot) {
      // Clicked on a character
      select_char(tile.slot);
    } else {
      if (tile?.status === TileStatus.SELECTED) {
        deselect_tile(row, col);
      } else {
        select_tile(row, col);
      }
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
      className={`${styles.tile} ${styles[statuses_map[!!move ? 2 : tile.status]]}`}
    >
      {tile.slot && <div className={styles.charBall}>{tile.slot.id}</div>}
    </div>
  );
});

export default Tile;
