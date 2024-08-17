import React, { useEffect, useState } from "react";
import { useAppStore } from "@/store/store";
import { useRouter } from "expo-router";
import { Dialog, XStack, YStack, Text } from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";
import GradientButton from "./GradientButton";
import LottieView from "lottie-react-native";
import HeartGirl from "@/assets/animation/girl.json";
import Trophy from "@/assets/animation/trophy.json";
import Firework from "@/assets/animation/firework.json";
import Pile from "./Pile";
import { colorPlayer } from "@/helpers/PlotData";
import useSound from "@/hooks/useSound";

interface WinnerModalProps {
  winner: number | null;
}
const WinnerModal = ({ winner }: WinnerModalProps) => {
  const { resetGame, announceWinner } = useAppStore((state) => state);

  const router = useRouter();
  const [visible, setVisible] = useState(!!winner);
  const { playSound } = useSound();

  const handleNewGame = () => {
    resetGame();
    announceWinner(null);
    playSound("game_start");
  };

  const handleHome = () => {
    resetGame();
    announceWinner(null);
    router.navigate("/home");
  };

  useEffect(() => {
    setVisible(!!winner);
  }, [winner]);

  return (
    <Dialog modal open={visible}>
      <Dialog.Portal>
        <Dialog.Overlay key="overlay" animation="quick" opacity={0.8} />

        <Dialog.Content
          elevate
          key="content"
          bg="$colorTransparent"
          animateOnly={["transform", "opacity"]}
          animation={[
            "quicker",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ opacity: 0, scale: 0 }}
          exitStyle={{ opacity: 0, scale: 0 }}
          gap="$2"
        >
          <XStack jc="center" w="95%" als="center">
            <LinearGradient
              colors={["#0f0c29", "#302b63", "#24243e"]}
              br={20}
              bw={2}
              bc="gold"
              ov="hidden"
              p={20}
              paddingVertical={40}
              w="98%"
              jc="center"
              ai="center"
            >
              <YStack w="100%" als="center" jc="center" ai="center">
                <XStack w={90} h={40}>
                  <Pile player={1} color={colorPlayer[Number(winner) - 1]} />
                </XStack>
                <Text
                  fontFamily="PhilosopherBold"
                  fontSize={18}
                  color="white"
                  mt={10}
                >
                  🥳 Congratulations! PLAYER {winner}
                </Text>
                <LottieView
                  source={Trophy}
                  loop
                  autoPlay
                  style={{
                    height: 200,
                    width: 200,
                    marginTop: 10,
                  }}
                />
                <LottieView
                  source={Firework}
                  loop
                  autoPlay
                  style={{
                    height: 200,
                    width: 500,
                    zIndex: -1,
                    marginTop: 20,
                    position: "absolute",
                  }}
                />
                <GradientButton title="NEW GAME" onPress={handleNewGame} />
                <GradientButton title="HOME" onPress={handleHome} />
              </YStack>
            </LinearGradient>
            <LottieView
              source={HeartGirl}
              loop
              autoPlay
              style={{
                height: 400,
                width: 280,
                zIndex: 99,
                bottom: -250,
                right: -100,
                position: "absolute",
              }}
            />
          </XStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

export default WinnerModal;
