import { View, Text, TransformsStyle, TranslateXTransform, TranslateYTransform } from 'react-native'
import React from 'react'
import { PlayerStateI } from '@/types/game'
import { XStack } from 'tamagui';
import Pile from './Pile';
import { deviceHeight, deviceWidth } from '@/constants/Scaling';

interface PlayerPiecesProps {
  player: PlayerStateI[];
  style: any;
  pieceColor: string;
  translate: string;
}
const PlayerPieces = ({player, style, pieceColor, translate}: PlayerPiecesProps) => {
  const transformStyle = (translate: string, index: number) => {
    if (translate == 'translateX') {
      return [{'translateX': 14 * index}];
    }
    return [{'translateY': 14 * index}];
  }
  const getPlayerNo = (id: string) => {
    return id[0] === 'A' ? 1 : id[0] === 'B' ? 2 : id[0] === 'C' ? 3 : 4;
  }

  return (
    <XStack style={{...style}} w={deviceWidth*0.063} h={deviceHeight*0.032} jc="center" ai="center" pos="absolute" zIndex={99}>
      {player?.map((piece, index) => (
        <XStack key={piece.id} top={0} bottom={0} zIndex={99} pos="absolute" transform={[{scale: 0.5}, ...transformStyle(translate, index)]} pointerEvents='none'>
          <Pile cell reached player={getPlayerNo(piece.id)} pieceId={piece.id} onPress={() => {}} color={pieceColor} />
        </XStack>
      ))}
    </XStack>
  )
}



export default PlayerPieces