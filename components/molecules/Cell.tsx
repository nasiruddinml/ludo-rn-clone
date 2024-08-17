import React, { useCallback, useMemo } from "react";
import { XStack, Text } from "tamagui";
import { Colors } from "@/constants/Colors";
import Pile from "./Pile";
import { ArrowSpot, SafeSpots, StarSpots } from "@/helpers/PlotData";
import { ArrowRightIcon, StarIcon } from "react-native-heroicons/outline";
import { useAppStore } from "@/store/store";
import { selectCurrentPosition } from "@/store/slices/gameSelector";

interface CellProps {
  cell: boolean;
  id: number;
  color: string | number;
}
export const Cell = React.memo(({ cell, id, color }: CellProps) => {
  const plottedPieces = useAppStore(selectCurrentPosition);
  const isSafeSpot = useMemo(() => SafeSpots.includes(id), [id]);
  const isStarSpot = useMemo(() => StarSpots.includes(id), [id]);
  const isArrowSpot = useMemo(() => ArrowSpot.includes(id), [id]);
  const { handleForward } = useAppStore(state => state);

  const piecesAtPosition = 
    plottedPieces.filter((item) => item.position == id);
  const getArrowColor = (id: number) => {
    const index = ArrowSpot.findIndex(item => item == id);
    return index === 0
    ? Colors.red
    : index === 1
    ? Colors.green
    : index === 2
    ? Colors.yellow
    : Colors.blue;
  }

  const handlePress = async(
    playerNo: number, pieceId: string | number) => {
      await handleForward(playerNo, pieceId, id)
    };

  return (
    <XStack
      bw={0.4}
      bc={Colors.borderColor}
      w="100%"
      h="100%"
      jc="center"
      ai="center"
      bg={isSafeSpot ? color : "white"}
    >
      {isStarSpot && <StarIcon size={20} color="grey" />}
      {isArrowSpot && (
        <ArrowRightIcon
          style={{
            transform: [
              {
                rotate:
                  id === 38
                    ? "180deg"
                    : id === 25
                    ? "90deg"
                    : id === 51
                    ? "-90deg"
                    : "0deg",
              },
            ],
          }}
          color={getArrowColor(id)}
        />
      )}
      {piecesAtPosition.map((piece, index) => {
        const playerNo =
          piece.id[0] === "A"
            ? 1
            : piece.id[0] === "B"
            ? 2
            : piece.id[0] === "C"
            ? 3
            : 4;
        const pieceColor =
          playerNo === 1
            ? Colors.red
            : playerNo === 2
            ? Colors.green
            : playerNo === 3
            ? Colors.yellow
            : Colors.blue;

        return (
          <XStack
            key={piece.id}
            transform={[
              { scale: piecesAtPosition.length === 1 ? 1 : 0.7 },
              {
                translateX:
                  piecesAtPosition.length === 1 ? 0 : index % 2 === 0 ? -6 : 6,
              },
              {
                translateY:
                  piecesAtPosition.length === 1 ? 0 : index < 2  ? -6 : 6,
              },
            ]}
            ai="center"
            jc="center"
            pos="absolute"
          >
            <Pile
              cell={cell}
              player={playerNo}
              onPress={() => handlePress(playerNo, piece.id)}
              pieceId={piece.id}
              color={pieceColor}
            />
          </XStack>
        );
      })}
      {/* <Pile cell={cell} player={2} onPress={() => {}} pieceId={2} color={Colors.green} /> */}
      {/* <Text>{id}</Text> */}
    </XStack>
  );
});

export default Cell;
