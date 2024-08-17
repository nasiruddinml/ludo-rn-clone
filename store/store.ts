import { create, useStore as useZustandStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { zustandStorage } from "./mmkv-storage";
import { createGameSlice } from "./slices/gameSlice";
import { Actions, InitialStateI } from "@/types/game";

export type StoreType = typeof appState;

export const useAppStore = <T>(
  selector: (state: InitialStateI & Actions) => T
) => {
  return useZustandStore(appState, selector);
};

export const appState = create<InitialStateI & Actions>()(
  persist(
    (...a) => ({
      ...createGameSlice(...a),
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
