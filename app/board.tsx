import { Button, Image, XStack, YStack } from "tamagui";
import { WrapperContainer } from "@/components/layouts/Wrapper";
import { deviceHeight, deviceWidth } from "@/constants/Scaling";
import Dice from "@/components/molecules/Dice";
import { Colors } from "@/constants/Colors";
import { Pocket } from "@/components/molecules/Pocket";
import VerticalPath from "@/components/molecules/VerticalPath";
import { Plot1Data, Plot2Data, Plot3Data, Plot4Data } from "@/helpers/PlotData";
import HorizontalPath from "@/components/molecules/HorizontalPath";
import FourTriangles from "@/components/molecules/FourTriangles";
import { useAppStore } from "@/store/store";
import { selectCurrentPosition, selectDiceTouch, selectPlayer1, selectPlayer2, selectPlayer3, selectPlayer4 } from "@/store/slices/gameSelector";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import MenuModal from "@/components/molecules/MenuModal";
import WinnerModal from "@/components/molecules/WinnerModal";
import useSound from "@/hooks/useSound";

export default function TabOneScreen() {
  const player1 = useAppStore(selectPlayer1);
  const player2 = useAppStore(selectPlayer2);
  const player3 = useAppStore(selectPlayer3);
  const player4 = useAppStore(selectPlayer4);
  const isDiceTouch = useAppStore(selectDiceTouch);
  const currentPosition = useAppStore(selectCurrentPosition);
  const winner = useAppStore(state => state.winner);

  const isFocused = useIsFocused();

  const [showStartImage, setShowStartImage] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const opacity = useRef(new Animated.Value(1)).current;
  const { playSound } = useSound();

  const handleMenuPress = async () => {
    await playSound('ui');
    setMenuVisible(true);
  }
  
  useEffect(() => {
    if(isFocused && currentPosition.length == 0) {
      setShowStartImage(true);
      const blinkAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      );

      blinkAnimation.start();

      const timeout = setTimeout(() => {
        blinkAnimation.stop();
        setShowStartImage(false);
      }, 2500)

      return () => {
        blinkAnimation.stop();
        clearTimeout(timeout);
      }
    }

  }, [isFocused, currentPosition]);

  return (
    <WrapperContainer>
      <YStack f={1} ai="center" jc="center">
        <Button unstyled pos="absolute" t={20} l={20} onPress={handleMenuPress}>
          <Image
            source={{
              width: 30,
              height: 30,
              uri: require("@/assets/images/menu.png"),
            }}
          />
        </Button>
        <YStack
          ai="center"
          jc="center"
          als="center"
          h={deviceHeight * 0.5}
          w={deviceWidth}
        >
          <XStack
            fd="row"
            paddingHorizontal={30}
            jc="space-between"
            ai="center"
            w="100%"
            pointerEvents={isDiceTouch ? 'none' : 'auto'}
          >
            <Dice color={Colors.green} player={2} data={player2} />
            <Dice color={Colors.yellow} rotate player={3} data={player3} />
          </XStack>
          <YStack w="100%" h="100%" alignSelf="center" p={10}>
            <XStack w="100%" h="40%" jc="space-between" fd="row" bg="#ccc">
              <Pocket color={Colors.green} player={2} data={player2} />
              <VerticalPath cells={Plot2Data} color={Colors.yellow} />
              <Pocket color={Colors.yellow} player={3} data={player3} />
            </XStack>
            <XStack w="100%" h="20%" jc="space-between" fd="row" bg="#1e51ff">
              <HorizontalPath cells={Plot1Data} color={Colors.green} />
              <FourTriangles />
              <HorizontalPath cells={Plot3Data} color={Colors.blue} />
            </XStack>
            <XStack w="100%" h="40%" jc="space-between" fd="row" bg="#ccc">
              <Pocket color={Colors.red} player={1} data={player1} />
              <VerticalPath cells={Plot4Data} color={Colors.red} />
              <Pocket color={Colors.blue} player={4} data={player4} />
            </XStack>
          </YStack>
          <XStack
            fd="row"
            paddingHorizontal={30}
            jc="space-between"
            ai="center"
            w="100%"
            pointerEvents={isDiceTouch ? 'none' : 'auto'}
          >
            <Dice color={Colors.red} player={1} data={player1}/>
            <Dice color={Colors.blue} rotate player={4} data={player4} />
          </XStack>
        </YStack>
      {showStartImage && (
        <Animated.Image
        source={require('@/assets/images/start.png')}
        style={{
          width: deviceWidth * 0.5,
          height: deviceHeight * 0.2,
          position: 'absolute',
          opacity
        }}
        />
      )}
      {menuVisible && <MenuModal visible={menuVisible} onClose={() => setMenuVisible(false)} />}
      {winner != null && <WinnerModal winner={winner} />}
      </YStack>
    </WrapperContainer>
  );
}
