import { Animated } from "react-native";
import React, { useEffect, useState } from "react";
import { WrapperContainer } from "../components/layouts/Wrapper";
import { Image, Spinner, YStack } from "tamagui";
import { deviceHeight, deviceWidth } from "@/constants/Scaling";
import { useRouter } from "expo-router";

const Splash = () => {
  const [isStop, setIsStop] = useState(false);
  const scale = new Animated.Value(1);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/home');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const breathingAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );

    if (!isStop) {
      breathingAnimation.start();
    }

    return () => {
      breathingAnimation.stop();
    };
  }, [isStop]);

  return (
    <WrapperContainer>
      <YStack flex={1} w="100%" jc="center">
        <Animated.View
          style={{
            justifyContent: "center",
            alignItems: "center",
            transform: [{ scale }],
          }}
        >
          <Image
            objectFit="contain"
            source={{
              width: deviceWidth * 0.7,
              height: deviceHeight * 0.6,
              uri: require("@/assets/images/logo.png"),
            }}
          />
        </Animated.View>
        <Spinner size="small" color="white" />
      </YStack>
    </WrapperContainer>
  );
};

export default Splash;
