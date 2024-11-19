import { SpaceStore } from "@/lib/stores/dasboard/space";
import { SpaceStoreContext } from "../board_space/provider";
import { useContext } from "react";
import { StoreApi, useStore } from "zustand";
import { shallow, useShallow } from "zustand/shallow";


export const useSpaceStore = <T,>(selector: (store: SpaceStore) => T): T => {
    const spaceStoreContext = useContext(SpaceStoreContext);

    if (!spaceStoreContext) {
        throw new Error(`useSpaceStore must be used within SpaceStoreProvider`);
    }

    const typedStore = spaceStoreContext as unknown as StoreApi<SpaceStore>;

    return useStore(typedStore, useShallow(selector));
};
