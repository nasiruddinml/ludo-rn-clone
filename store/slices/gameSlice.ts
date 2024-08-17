import { StateCreator } from "zustand";
import { initialState } from "./initialState";
import { Actions, InitialStateI, PlayerStateI } from "@/types/game";
import { selectCurrentPosition, selectDiceNo } from "./gameSelector";
import {
  SafeSpots,
  StarSpots,
  startingPoints,
  turningPoints,
  victoryStart,
} from "@/helpers/PlotData";
import { playSound } from "@/helpers/SoundUtils";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const createGameSlice: StateCreator<InitialStateI & Actions, [], []> = (
  set,
  get
) => ({
  ...initialState,
  resetGame: () => set({ ...initialState }),
  updateDiceNo: (diceNo) => set({ diceNo, isDiceRolled: true }),
  enablePileSelection: (playerNo: number) =>
    set({ touchDiceBlock: true, pileSelectionPlayer: playerNo }),
  enableCellSelection: (playerNo: number) =>
    set({ touchDiceBlock: true, cellSelectionPlayer: playerNo }),
  disableTouch: () =>
    set({
      touchDiceBlock: true,
      cellSelectionPlayer: -1,
      pileSelectionPlayer: -1,
    }),
  unfreezeDice: () => set({ touchDiceBlock: false, isDiceRolled: false }),
  updateFireworks: (fireworks: boolean) => set({ fireworks }),
  announceWinner: (player: number | null) => set({ winner: player }),
  updatePlayerChance: (player: number) =>
    set({ chancePlayer: player, touchDiceBlock: false, isDiceRolled: false }),
  updatePlayerPieceValue: (
    playerNo: string,
    pieceId: string,
    position: number,
    travelCount: number
  ) => {
    const playerPieces = get()[
      playerNo as keyof InitialStateI
    ] as PlayerStateI[];
    const piece = playerPieces.find((p) => p.id === pieceId);
    set({ pileSelectionPlayer: -1 });

    if (piece) {
      piece.position = position;
      piece.travelCount = travelCount;
      const currentPositionIndex = get().currentPositions.findIndex(
        (p) => p.id === pieceId
      );
      if (position == 0) {
        if (currentPositionIndex !== -1) {
          const oldCurrentPosition = get().currentPositions;
          oldCurrentPosition.splice(currentPositionIndex, 1);
          set({ currentPositions: oldCurrentPosition });
        }
      } else {
        if (currentPositionIndex !== -1) {
          const oldCurrentPosition = get().currentPositions;
          oldCurrentPosition[currentPositionIndex] = {
            id: pieceId,
            position,
            travelCount,
          };
          set({ currentPositions: oldCurrentPosition });
        } else {
          const oldCurrentPosition = get().currentPositions;
          oldCurrentPosition.push({
            id: pieceId,
            position,
            travelCount,
          });
        }
      }
    }
  },
  handleForward: async (
    playerNo: number,
    id: string | number,
    position: number
  ) => {
    const state = get();
    const checkWinningCriteria = (pieces: PlayerStateI[]) => {
      for (let piece of pieces) {
        if (piece.travelCount < 57) {
          return false;
        }
      }
      return true;
    };
    const plottedPieces = selectCurrentPosition(state);
    const diceNo = selectDiceNo(state);

    let alpha =
      playerNo == 1 ? "A" : playerNo == 2 ? "B" : playerNo == 3 ? "C" : "D";

    const piecesAtPosition = plottedPieces?.filter(
      (item) => item.position === position
    );
    const piece =
      piecesAtPosition[
        piecesAtPosition.findIndex((item) => item.id[0] == alpha)
      ];

    state.disableTouch();

    let finalPath = piece.position;
    const playerPiece = state[
      `player${playerNo}` as keyof InitialStateI
    ] as PlayerStateI[];
    const beforePlayerPiece = playerPiece.find(
      (item) => item.id == id
    ) as PlayerStateI;
    let travelCount = beforePlayerPiece.travelCount;

    for (let i = 0; i < diceNo; i++) {
      const state = get();
      const updatedPosition = state[
        `player${playerNo}` as keyof InitialStateI
      ] as PlayerStateI[];
      const playerPiece = updatedPosition.find(
        (item) => item.id == id
      ) as PlayerStateI;
      let path = playerPiece.position + 1;

      if (turningPoints.includes(path) && turningPoints[playerNo - 1] == path) {
        path = victoryStart[playerNo - 1];
      }

      if (path == 53) {
        path = 1;
      }

      finalPath = path;
      travelCount += 1;

      state.updatePlayerPieceValue(
        `player${playerNo}`,
        playerPiece.id,
        path,
        travelCount
      );
      playSound("pile_move");
      await delay(200);
    }

    const updatedState = get();
    const updatedPlottedPieces = selectCurrentPosition(updatedState);

    // check Colliding

    const finalPlot = updatedPlottedPieces.filter(
      (item) => item.position == finalPath
    );
    const ids = finalPlot.map((item) => item.id[0]);
    const uniqueIds = new Set(ids);
    const areDifferentIds = uniqueIds.size > 1;

    if (SafeSpots.includes(finalPath) || StarSpots.includes(finalPath)) {
      playSound("safe_spot");
    }

    if (
      areDifferentIds &&
      !SafeSpots.includes(finalPlot[0].position) &&
      !StarSpots.includes(finalPlot[0].position)
    ) {
      const enemyPiece = finalPlot.find(
        (piece) => piece.id[0] !== String(id)[0]
      ) as PlayerStateI;
      const enemyId = enemyPiece?.id[0];
      let no = enemyId == "A" ? 1 : enemyId == "B" ? 2 : enemyId == "C" ? 3 : 4;
      let backwardPath = startingPoints[no - 1];
      let i = enemyPiece?.position;
      playSound("collide");

      while (i != backwardPath) {
        state.updatePlayerPieceValue(`player${no}`, enemyPiece.id, i, 0);

        await delay(0.4);
        i--;
        if (i == 0) {
          i = 52;
        }
      }
      state.updatePlayerPieceValue(`player${no}`, enemyPiece.id, 0, 0);
      state.unfreezeDice();
      return;
    }

    if (diceNo == 6 || travelCount == 57) {
      state.updatePlayerChance(playerNo);
      if (travelCount == 57) {
        playSound("home_win");
        const finalPlayerState = state;
        const playerAllPieces = finalPlayerState[
          `player${playerNo}` as keyof InitialStateI
        ] as PlayerStateI[];
        if (checkWinningCriteria(playerAllPieces)) {
          state.announceWinner(playerNo);
          return;
        }
        state.updateFireworks(true);
        state.unfreezeDice();
        return;
      } else {
        state.unfreezeDice();
        return;
      }
    }
    let chancePlayer = playerNo + 1;
    if (chancePlayer > 4) {
      chancePlayer = 1;
    }
    state.updatePlayerChance(chancePlayer);
  },
});
