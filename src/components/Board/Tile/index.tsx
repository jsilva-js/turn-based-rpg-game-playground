import React from "react";
import styles from "./tile.module.scss";
import { useSpaceStore } from "@/providers/board_space/hook";
import { to_index } from "@/lib/utils/grid";
import { TileStatus } from "@/lib/stores/dasboard/space";
import { useCharStore } from "@/lib/stores/char";
import { throttle } from "lodash";
import { getPathFromMouseMovement } from "@/lib/stores/char/path";

type TileProps = {
  row: number;
  col: number;
};

const Tile: React.FC<TileProps> = React.memo(({ row, col }) => {
  const hover_tile = useSpaceStore((state) => state.hover_tile);
  const move_character = useSpaceStore((state) => state.move_character);
  const width = useSpaceStore((state) => state.width);

  const idx = React.useMemo(() => to_index(row, col, width), [row, col, width]);

  const tile = useSpaceStore((state) => state.tiles[idx]);

  const move = useCharStore((state) => state.world_map.get(idx));

  const {
    selected_char,
    select_char,
    deselect_char,
    set_highlighted_path,
    add_to_mouse_path,
    reset_mouse_path,
  } = useCharStore();

  const throttledHandleMouseEnter = React.useMemo(
    () =>
      throttle(() => {
        if (selected_char) {
          add_to_mouse_path({ row, col });

          const path = getPathFromMouseMovement(
            selected_char,
            useCharStore.getState().mouse_movement_path,
            selected_char.move_points
          );
          set_highlighted_path(path);
        }
      }, 50),
    [selected_char, row, col]
  );

  const handleMouseEnter = () => {
    hover_tile(row, col);
    throttledHandleMouseEnter();
  };

  const handleMouseLeave = () => {
    // Optionally clear the path
  };

  const handleClick = () => {
    if (tile?.slot) {
      // Clicked on a character
      select_char(tile.slot);
      reset_mouse_path();
    } else if (move) {
      if (selected_char) {
        const destinationInPath = useCharStore
          .getState()
          .highlighted_path.some((pos) => pos.row === row && pos.col === col);

        if (destinationInPath) {
          move_character(selected_char, row, col);
          deselect_char();
          reset_mouse_path();
        } else {
          // Move not allowed, as it's beyond move_points limit
        }
      }
    } else {
      deselect_char();
      reset_mouse_path();
    }
  };

  if (!tile) {
    return null;
  }

  const isInPath = useCharStore((state) =>
    state.highlighted_path.some((pos) => pos.row === row && pos.col === col)
  );

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`${styles.tile} ${
        isInPath
          ? styles.path
          : move
            ? styles.highlighted
            : styles[TileStatus[tile.status].toLowerCase()]
      }`}
    >
      {tile.slot && <div className={styles.charBall}>{tile.slot.id}</div>}
    </div>
  );
});

export default Tile;
