import { Animated } from "react-native";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Button, Image, XStack } from "tamagui";
import { BackgroundImage } from "@/helpers/GetIcons";
import { Svg, Circle } from "react-native-svg";
import { Easing } from "react-native-reanimated";
import { useAppStore } from "@/store/store";
import {
  selectCellSelection,
  selectDiceNo,
  selectPocketPileSelection,
} from "@/store/slices/gameSelector";
import { InitialStateI, PlayerStateI } from "@/types/game";

interface PileProps {
  color: string | number;
  cell?: any;
  player?: number;
  onPress?: any;
  pieceId?: string | number;
  reached?: boolean;
}
export const Pile = ({
  color,
  cell,
  player,
  onPress,
  pieceId,
  reached = false,
}: PileProps) => {
  const rotation = useRef(new Animated.Value(0)).current;
  const currentPlayerPileSelection = useAppStore(selectPocketPileSelection);
  const currentPlayerCellSelection = useAppStore(selectCellSelection);
  const diceNo = useAppStore(selectDiceNo);
  const playerPieces = useAppStore(
    (state) => state[`player${player}` as keyof InitialStateI] as PlayerStateI[]
  );

  const isPileEnabled = player === currentPlayerPileSelection;

  const isCellEnabled = player === currentPlayerCellSelection;

  const isForwardable = useCallback(() => {
    const piece = playerPieces?.find((item) => item.id === pieceId);
    return piece && piece.travelCount + diceNo <= 57;
  }, [playerPieces, pieceId, diceNo]);

  const pileImage = BackgroundImage.GetImage(color);

  useEffect(() => {
    const rotateAnimation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    rotateAnimation.start();

    // return () => rotateAnimation.stop();
  }, [rotation]);

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Button
      unstyled
      fd="row"
      jc="center"
      ai="center"
      w="100%"
      h="100%"
      disabled={!(cell ? isCellEnabled && isForwardable() : isPileEnabled)}
      onPress={onPress}
    >
      <XStack
        w={15}
        h={15}
        pos="absolute"
        br={25}
        bw={2}
        bc="black"
        jc="center"
        ai="center"
      >
          <Animated.View
            style={{
              transform: [{ rotate: rotateInterpolate }],
            }}
            >
            {((cell && isCellEnabled && isForwardable()) || isPileEnabled) && (
            <Svg height={18} width={18}>
              <Circle
                cx={9}
                cy={9}
                r={8}
                stroke="white"
                strokeWidth={2}
                strokeDasharray={[4, 4]}
                strokeDashoffset={0}
                fill="transparent"
              />
            </Svg>
            )}
          </Animated.View>
      </XStack>
      <Image
        source={{
          width: cell ? 30 : 32,
          height: cell ? 30 : 32,
          uri: pileImage,
        }}
        pos="absolute"
        top={cell && !reached ? -25 : -16}
      />
    </Button>
  );
};

export default Pile;
