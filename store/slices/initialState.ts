import { InitialStateI, PlayerStateI } from "@/types/game"

const player1InitialState: PlayerStateI[] = [
  {id: 'A1', position: 0, travelCount: 0},
  {id: 'A2', position: 0, travelCount: 0},
  {id: 'A3', position: 0, travelCount: 0},
  {id: 'A4', position: 0, travelCount: 0},
]

const player2InitialState: PlayerStateI[] = [
  {id: 'B1', position: 0, travelCount: 0},
  {id: 'B2', position: 0, travelCount: 0},
  {id: 'B3', position: 0, travelCount: 0},
  {id: 'B4', position: 0, travelCount: 0},
]

const player3InitialState: PlayerStateI[] = [
  {id: 'C1', position: 0, travelCount: 0},
  {id: 'C2', position: 0, travelCount: 0},
  {id: 'C3', position: 0, travelCount: 0},
  {id: 'C4', position: 0, travelCount: 0},
]

const player4InitialState: PlayerStateI[] = [
  {id: 'D1', position: 0, travelCount: 0},
  {id: 'D2', position: 0, travelCount: 0},
  {id: 'D3', position: 0, travelCount: 0},
  {id: 'D4', position: 0, travelCount: 0},
]

export const initialState: InitialStateI = {
  player1: player1InitialState,
  player2: player2InitialState,
  player3: player3InitialState,
  player4: player4InitialState,
  chancePlayer: 1,
  diceNo: 1,
  isDiceRolled: false,
  pileSelectionPlayer: -1,
  cellSelectionPlayer: -1,
  touchDiceBlock: false,
  currentPositions: [],
  fireworks: false,
  winner: null,
}