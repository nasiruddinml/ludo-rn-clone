import React from "react";
import { XStack, YStack } from "tamagui";
import { Colors } from "@/constants/Colors";
import Plot from "./Plot";
import { PlayerStateI } from "@/types/game";
import { startingPoints } from "@/helpers/PlotData";
import { useAppStore } from "@/store/store";

interface PocketProps {
  color: string | number;
  player: number;
  data: PlayerStateI[];
}
export const Pocket = React.memo(({ color, player, data }: PocketProps) => {
  const { enableCellSelection, updatePlayerPieceValue, unfreezeDice } = useAppStore(
    (state) => state
  );

  const handlePress = async (value: any) => {
    let playerNo = value?.id[0];
    switch (playerNo) {
      case "A":
        playerNo = "player1";
        break;

      case "B":
        playerNo = "player2";
        break;

      case "C":
        playerNo = "player3";
        break;

      case "D":
        playerNo = "player4";
        break;

      default:
        break;
    }
    updatePlayerPieceValue(
      playerNo,
      value.id,
      startingPoints[parseInt(playerNo.match(/\d+/)[0], 10) - 1],
      1
    );
    enableCellSelection(-1)
    unfreezeDice();

  };
  return (
    <XStack bw={0.4} jc="center" ai="center" w="40%" h="100%" bg={color}>
      <YStack
        bg="white"
        w="70%"
        h="70%"
        bc={Colors.borderColor}
        p={15}
        bw={0.4}
      >
        <XStack jc="space-between" ai="center" w="100%" h="40%" fd="row">
          <Plot
            pieceNo={0}
            player={player}
            color={color}
            data={data}
            onPress={handlePress}
          />
          <Plot
            pieceNo={1}
            player={player}
            color={color}
            data={data}
            onPress={handlePress}
          />
        </XStack>
        <XStack
          jc="space-between"
          ai="center"
          w="100%"
          h="40%"
          fd="row"
          mt={20}
        >
          <Plot
            pieceNo={2}
            player={player}
            color={color}
            data={data}
            onPress={handlePress}
          />
          <Plot
            pieceNo={3}
            player={player}
            color={color}
            data={data}
            onPress={handlePress}
          />
        </XStack>
      </YStack>
    </XStack>
  );
});

export default Pocket;
