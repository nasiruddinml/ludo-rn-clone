import { InitialStateI } from "@/types/game";

export const selectCurrentPosition = (state: InitialStateI) => state.currentPositions;
export const selectCurrentPlayerChance = (state: InitialStateI) => state.chancePlayer;
export const selectDiceRolled = (state: InitialStateI) => state.isDiceRolled;
export const selectDiceNo = (state: InitialStateI) => state.diceNo;

export const selectPlayer1 = (state: InitialStateI) => state.player1;
export const selectPlayer2 = (state: InitialStateI) => state.player2;
export const selectPlayer3 = (state: InitialStateI) => state.player3;
export const selectPlayer4 = (state: InitialStateI) => state.player4;

export const selectPocketPileSelection = (state: InitialStateI) => state.pileSelectionPlayer;
export const selectCellSelection = (state: InitialStateI) => state.cellSelectionPlayer;
export const selectDiceTouch = (state: InitialStateI) => state.touchDiceBlock;
export const selectFireworks = (state: InitialStateI) => state.fireworks;