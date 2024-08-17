import { Animated } from "react-native";
import React, { useCallback, useEffect, useRef } from "react";
import { WrapperContainer } from "@/components/layouts/Wrapper";
import { YStack, Image, Spinner, XStack, Button } from "tamagui";
import { deviceHeight, deviceWidth } from "@/constants/Scaling";
import GradientButton from "@/components/molecules/GradientButton";
import { useAppStore } from "@/store/store";
import { useRouter } from "expo-router";
import { selectCurrentPosition } from "@/store/slices/gameSelector";
import { useIsFocused } from "@react-navigation/native";
import useSound from "@/hooks/useSound";
import LottieView from "lottie-react-native";
import Witch from "@/assets/animation/witch.json";

const Home = () => {
  const { resetGame, announceWinner } = useAppStore((state) => state);
  const currentPosition = useAppStore(selectCurrentPosition);
  const isFocused = useIsFocused();
  const router = useRouter();
  const { playSound, stopSound } = useSound();
  const witchAnim = useRef(new Animated.Value(-deviceWidth)).current;
  const scaleXAnim = useRef(new Animated.Value(-1)).current;

  const startGame = async (isNew: boolean = false) => {
    if (isNew) {
      resetGame();
    }
    await stopSound();
    announceWinner(null);
    router.push("/board");
  };

  const handleNewGame = async () => {
    await startGame(true);
  };

  const handleResumeGame = async () => {
    await startGame();
  };

  const playMusic = useCallback(async () => {
    await playSound("home", true);
  }, []);

  const stopMusic = useCallback(async () => {
    await stopSound();
  }, []);

  const loopAnimation =
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(witchAnim, {
            toValue: deviceWidth * 0.02,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(scaleXAnim, {
            toValue: -1,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),
        Animated.delay(3000),
        Animated.parallel([
          Animated.timing(witchAnim, {
            toValue: deviceWidth * 2,
            duration: 6000,
            useNativeDriver: true,
          }),
          Animated.timing(scaleXAnim, {
            toValue: -1,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(witchAnim, {
            toValue: -deviceWidth * 0.05,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(scaleXAnim, {
            toValue: 1,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
        Animated.delay(3000),
        Animated.parallel([
          Animated.timing(witchAnim, {
            toValue: -deviceWidth * 2,
            duration: 6000,
            useNativeDriver: true,
          }),
          Animated.timing(scaleXAnim, {
            toValue: 1,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ])
    );

  useEffect(() => {
    if (isFocused) {
      playMusic();
    }
    return () => {
      stopMusic();
    };
  }, [isFocused]);

  useEffect(() => {
    const cleanupAnimation = () => {
      loopAnimation.stop();
    };

    loopAnimation.start();

    return cleanupAnimation;
  }, [witchAnim, scaleXAnim]);

  return (
    <WrapperContainer>
      <YStack jc="flex-start">
        <Animated.View
          style={{
            width: deviceWidth * 0.6,
            height: deviceHeight * 0.2,
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 40,
            alignSelf: "center",
            // transform: [{ scale }],
          }}
        >
          <Image
            objectFit="contain"
            w="100%"
            h="100%"
            source={{
              // width: '100%',
              // height: '100%',
              uri: require("@/assets/images/logo.png"),
            }}
          />
        </Animated.View>
        <XStack fd="column" jc="center" ai="center">
          {currentPosition.length !== 0 && (
            <GradientButton title="RESUME" onPress={handleResumeGame} />
          )}
          <GradientButton title="NEW GAME" onPress={handleNewGame} />
        </XStack>
        <Animated.View
          style={{
            transform: [{ translateX: witchAnim }, { scaleX: scaleXAnim }],
          }}
        >
          <Button
            unstyled
            onPress={() => {
              const random = Math.floor(Math.random() * 3) + 1;
              playSound(`girl${random}`);
            }}
          >
            <LottieView
              source={Witch}
              autoPlay
              speed={1}
              loop
              style={{
                width: 250,
                height: 250,
                position: "absolute",
                top: "70%",
                left: "24%",
                transform: [{ rotate: "25deg" }],
              }}
            />
          </Button>
        </Animated.View>
      </YStack>
    </WrapperContainer>
  );
};

export default Home;
