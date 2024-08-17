export interface PlayerStateI {
  id: string;
  position: number;
  travelCount: number;
}

export interface PlayerDataI {
  player: PlayerStateI[];
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  pieceColor: string;
  translate: string;
};

export interface InitialStateI {
  player1: PlayerStateI[],
  player2: PlayerStateI[],
  player3: PlayerStateI[],
  player4: PlayerStateI[],
  chancePlayer: number,
  diceNo: number,
  isDiceRolled: boolean,
  pileSelectionPlayer: number,
  cellSelectionPlayer: number,
  touchDiceBlock: boolean,
  currentPositions: PlayerStateI[],
  fireworks: boolean,
  winner: number | null,
}

export type Actions = {
  resetGame: () => void;
  updateDiceNo: (diceNo: number) => void;
  enablePileSelection: (playerNo: number) => void;
  enableCellSelection: (playerNo: number) => void;
  disableTouch: () => void;
  unfreezeDice: () => void;
  updateFireworks: (fireworks: boolean) => void;
  announceWinner: (player: number | null) => void;
  updatePlayerChance: (player: number) => void;
  updatePlayerPieceValue: (playerNo: string, pieceId: string, position: number, travelCount: number) => void;
  handleForward: (playerNo: number, id: string | number, position: number) => Promise<void>;
};