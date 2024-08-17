import useSound from "@/hooks/useSound";
import React, { ReactNode } from "react";
import {
  ComputerDesktopIcon,
  HomeIcon,
  PlayCircleIcon,
  PlayPauseIcon,
  UsersIcon,
} from "react-native-heroicons/outline";
import { Button, XStack, Text } from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";

interface GradientButtonProps {
  title: ReactNode;
  onPress?: any;
  iconColor?: string;
}
const GradientButton = ({
  title,
  onPress,
  iconColor = "#d5be3e",
}: GradientButtonProps) => {
  const iconSize = 22;
  const { playSound } = useSound();
  return (
    <XStack br={10} bw={2} bc="black" marginVertical={10}>
      <Button
        unstyled
        onPress={() => {
          playSound("ui");
          onPress && onPress();
        }}
        bw={2}
        br={10}
        bc="#d5be3e"
        elevation={5}
        bg="white"
        shadowColor="#d5be3e"
        shadowOpacity={0.5}
        shadowRadius={10}
        shadowOffset={{ width: 1, height: 1 }}
        w={240}
      >
        <LinearGradient
          colors={["#4c669f", "#3b5998", "#192f6a"]}
          start={[0, 0]}
          end={[0, 1]}
          paddingHorizontal={20}
          paddingVertical={10}
          br={5}
          bw={2}
          bc="black"
          fd="row"
          ai="center"
          jc="center"
          gap={20}
        >
          {title == "RESUME" ? (
            <PlayPauseIcon size={iconSize} color={iconColor} />
          ) : title == "NEW GAME" ? (
            <PlayCircleIcon size={iconSize} color={iconColor} />
          ) : title == "VS CPU" ? (
            <ComputerDesktopIcon size={iconSize} color={iconColor} />
          ) : title == "HOME" ? (
            <HomeIcon size={iconSize} color={iconColor} />
          ) : (
            <UsersIcon size={iconSize} color={iconColor} />
          )}
          <Text 
            fontFamily="PhilosopherBold"
            fontSize={16}
            ta="left"
            w="70%"
            color="white"
          >{title}</Text>
        </LinearGradient>
      </Button>
    </XStack>
  );
};

export default GradientButton;
