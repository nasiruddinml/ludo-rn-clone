import React, { useEffect, useState } from "react";
import { XStack } from "tamagui";
import { Colors } from "@/constants/Colors";
import { Svg, Polygon } from "react-native-svg";
import LottieView from "lottie-react-native";
import Fireworks from "@/assets/animation/firework.json";
import { useAppStore } from "@/store/store";
import { selectFireworks, selectPlayer1, selectPlayer2, selectPlayer3, selectPlayer4 } from "@/store/slices/gameSelector";
import { PlayerDataI } from "@/types/game";
import PlayerPieces from "./PlayerPieces";

const FourTriangles = () => {
  const player1 = useAppStore(selectPlayer1);
  const player2 = useAppStore(selectPlayer2);
  const player3 = useAppStore(selectPlayer3);
  const player4 = useAppStore(selectPlayer4);
  const isFirework = useAppStore(selectFireworks);
  const { updateFireworks } = useAppStore(state => state);
  const size = 300;
  const [blast, setBlast] = useState(false);

  const playerData: PlayerDataI[] = [
    {
      player: player1,
      top: 62,
      left: 18,
      pieceColor: Colors.red,
      translate: 'translateX'
    },
    {
      player: player3,
      top: 2,
      left: 18,
      pieceColor: Colors.yellow,
      translate: 'translateX'
    },
    {
      player: player2,
      top: 20,
      left: -2,
      pieceColor: Colors.green,
      translate: 'translateY'
    },
    {
      player: player4,
      top: 20,
      right: -2,
      pieceColor: Colors.blue,
      translate: 'translateX'
    },
  ];

  const renderPlayerPieces = (data: PlayerDataI, index: number) => {
    return (
      <PlayerPieces
        key={index.toString()}
        player={data?.player.filter(item => item.travelCount === 57)}
        style={{
          top: data?.top,
          bottom: data?.bottom,
          right: data?.right,
          left: data?.left,
        }}
        pieceColor={data.pieceColor}
        translate={data.translate}
      />
    )
  }

  useEffect(() => {
    if(isFirework) {
      setBlast(true);
      const timer = setTimeout(() => {
        setBlast(false);
        updateFireworks(false);
      }, 5000);
      return () => {
        clearTimeout(timer);
      }
    }
  }, [isFirework])
  return (
    <XStack
      ai="center"
      jc={"center"}
      bw={0.8}
      w="20%"
      h="100%"
      ov="hidden"
      bg="white"
      bc={Colors.borderColor}
    >
      {blast && (<LottieView
          source={Fireworks}
          autoPlay
          speed={1}
          loop
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            zIndex: 1,
          }}
        />
      )}
      <Svg height={size} width={size - 5}>
        <Polygon
          points={`0,0 ${size / 2}, ${size / 2} ${size}, 0`}
          fill={Colors.yellow}
        />
        <Polygon
          points={`${size}, 0 ${size }, ${size} ${size / 2}, ${size /2}`}
          fill={Colors.blue}
        />
        <Polygon
          points={`0, ${size} ${size / 2 }, ${size / 2} ${size}, ${size}`}
          fill={Colors.red}
        />
        <Polygon
          points={`0, 0 ${size / 2 }, ${size / 2} 0, ${size}`}
          fill={Colors.green}
        />
      </Svg>
      {playerData.map(renderPlayerPieces)}
    </XStack>
  );
};

export default FourTriangles;
