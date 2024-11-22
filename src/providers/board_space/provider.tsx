"use client";

import { createContext, useRef, ReactNode } from "react";

import { createSpaceStore } from "@/lib/stores/dasboard/space";
import { enableMapSet } from "immer";

enableMapSet();

export type SpaceStoreApi = ReturnType<typeof createSpaceStore>;

export const SpaceStoreContext = createContext<SpaceStoreApi | undefined>(
  undefined
);

export interface SpaceStoreProviderProps {
  children: ReactNode;
}

export const SpaceStoreProvider = ({ children }: SpaceStoreProviderProps) => {
  const storeRef = useRef<SpaceStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createSpaceStore();
  }

  return (
    <SpaceStoreContext.Provider value={storeRef.current}>
      {children}
    </SpaceStoreContext.Provider>
  );
};
