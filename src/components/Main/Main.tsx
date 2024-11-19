"use client";

import Board from "../Board";
import Dashboard from "../Dashboard";
import Header from "../Layout";
import Side from "../Side";
import AddChar from "../Side/AddChar/AddChar";
import CreateTile from "../Side/Tiles/CreateTiles";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitcher";

function Main() {
  return (
    <>
      <Header>
        <ThemeSwitch />
      </Header>
      <Dashboard>
        <Side>
          <CreateTile />
          <AddChar />
        </Side>
        <Board />
      </Dashboard>
    </>
  );
}

export default Main;
