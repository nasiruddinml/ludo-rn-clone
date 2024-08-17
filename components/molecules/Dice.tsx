import { Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { XStack, Image, Button } from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";
import { BackgroundImage } from "@/helpers/GetIcons";
import LottieView from "lottie-react-native";
import DiceRoll from "@/assets/animation/diceroll.json";
import { Easing } from "react-native-reanimated";
import { useAppStore } from "@/store/store";
import {
  selectCurrentPlayerChance,
  selectDiceNo,
  selectDiceRolled,
} from "@/store/slices/gameSelector";
import { InitialStateI, PlayerStateI } from "@/types/game";
import useSound from "@/hooks/useSound";

interface DiceProps {
  color: string;
  rotate?: boolean;
  player: any;
  data: PlayerStateI[];
}

export const Dice = React.memo(
  ({ color, rotate, player, data }: DiceProps) => {
    const currentPlayerChance = useAppStore(selectCurrentPlayerChance);
    const isDiceRolled = useAppStore(selectDiceRolled);
    const diceNo = useAppStore(selectDiceNo);
    const playerPieces = useAppStore(
      (state) =>
        state[
          `player${currentPlayerChance}` as keyof InitialStateI
        ] as PlayerStateI[]
    );
    const {
      updateDiceNo,
      enableCellSelection,
      enablePileSelection,
      updatePlayerChance,
    } = useAppStore((state) => state);
    const pileIcon = BackgroundImage.GetImage(color);
    const diceIcon = BackgroundImage.GetImage(diceNo);
    const arrowAnim = useRef(new Animated.Value(0)).current;

    const [diceRolling, setDiceRolling] = useState(false);
    const { playSound } = useSound();

    useEffect(() => {
      const animateArrow = () => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(arrowAnim, {
              toValue: rotate ? -10 : 10,
              duration: 600,
              easing: Easing.out(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(arrowAnim, {
              toValue: rotate ? 10 : -10,
              duration: 600,
              easing: Easing.in(Easing.ease),
              useNativeDriver: true,
            }),
          ])
        ).start();
      };
      animateArrow();
    }, [diceRolling]);

    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    const handleDicePress = async () => {
      playSound('dice_roll');
      const newDiceNo = Math.floor(Math.random() * 6) + 1;
      // const newDiceNo = 6;
      setDiceRolling(true);
      await delay(800);
      updateDiceNo(newDiceNo);
      setDiceRolling(false);

      const isAnyPieceAlive = data?.findIndex(
        (i) => i.position != 0 && i.position != 57
      );
      const isAnyPieceLocked = data?.findIndex((i) => i.position == 0);

      if (isAnyPieceAlive == -1) {
        if (newDiceNo == 6) {
          enablePileSelection(player);
        } else {
          let chancePlayer = player + 1;
          if (chancePlayer > 4) {
            chancePlayer = 1;
          }
          await delay(600);
          updatePlayerChance(chancePlayer);
        }
      } else {
        const canMove = playerPieces.some(
          (pile) => pile.travelCount + newDiceNo <= 57 && pile.position != 0
        );
        if (
          (!canMove && newDiceNo == 6 && isAnyPieceLocked == -1) ||
          (!canMove && newDiceNo != 6 && isAnyPieceLocked != -1) ||
          (!canMove && newDiceNo != 6 && isAnyPieceLocked == -1)
        ) {
          let chancePlayer = player + 1;
          if (chancePlayer > 4) {
            chancePlayer = 1;
          }
          await delay(600);
          updatePlayerChance(chancePlayer);
          return;
        }
        if (newDiceNo == 6) {
          enablePileSelection(player);
        }
        enableCellSelection(player);
      }
    };

    return (
      <XStack
        jc="center"
        ai="center"
        fd={rotate ? "row-reverse" : "row"}
        // style={{ transform: [{ scaleX: rotate ? -1 : 1 }] }}
      >
        <XStack bw={3} brw={0} bc="#f0ce2c">
          <LinearGradient
            colors={["#0052be", "#5f9fcb", "#97c6c9"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          >
            <XStack paddingHorizontal={3}>
              <Image
                source={{
                  width: 35,
                  height: 35,
                  uri: pileIcon,
                }}
              />
            </XStack>
          </LinearGradient>
        </XStack>
        <XStack bw={3} p={1} bg="#aac8ab" br={10} blw={3} bc="#aac8ab">
          <LinearGradient
            colors={["#aac8ab", "#aac8ab", "#aac8ab"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            bw={3}
            blw={3}
            bc="#f0c32c"
            jc="center"
            ai="center"
          >
            <XStack
              paddingHorizontal={8}
              bg="#e8c0c1"
              bw={1}
              br={5}
              w={55}
              h={55}
              p={4}
              jc="center"
              ai="center"
            >
              {currentPlayerChance === player && !diceRolling && (
                <Button
                  unstyled
                  disabled={isDiceRolled}
                  onPress={handleDicePress}
                >
                  <Image
                    source={{
                      width: 45,
                      height: 45,
                      uri: diceIcon,
                    }}
                  />
                </Button>
              )}
            </XStack>
          </LinearGradient>
        </XStack>
        {currentPlayerChance === player && !isDiceRolled && (
          <Animated.View
            style={{
              transform: [{ translateX: arrowAnim }],
            }}
          >
            <Image
              source={{
                width: 50,
                height: 30,
                uri: require("@/assets/images/arrow.png"),
              }}
              rotate={rotate ? '180deg' : '0deg'}
            />
          </Animated.View>
        )}
        {currentPlayerChance === player && diceRolling && (
          <LottieView
            source={DiceRoll}
            loop={false}
            autoPlay
            style={{
              height: 80,
              width: 80,
              zIndex: 99,
              top: -25,
              position: "absolute",
            }}
          />
        )}
      </XStack>
    );
  }
);

export default Dice;
