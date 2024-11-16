import { SpaceStore } from "@/lib/stores/dasboard/space";
import { SpaceStoreContext } from "../board_space/provider";
import { useContext } from "react";
import { useStore } from "zustand";

export const useSpaceStore = <T,>(selector: (store: SpaceStore) => T): T => {
    const spaceStoreContext = useContext(SpaceStoreContext);

    if (!spaceStoreContext) {
        throw new Error(`useSpaceStore must be used within SpaceStoreProvider`);
    }


    return useStore(spaceStoreContext, selector);
};
