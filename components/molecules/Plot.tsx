import React from 'react'
import { XStack } from 'tamagui';
import Pile from './Pile';
import { PlayerStateI } from '@/types/game';

interface PlotProps {
  pieceNo: number;
  player: number;
  color: string | number;
  data: PlayerStateI[];
  onPress: any;
}
export const Plot = React.memo(({ pieceNo, player, color, data, onPress }: PlotProps) => {
  return (
    <XStack bg={color} h="80%" w="36%" br={120}>
      {data && data[pieceNo]?.position === 0 && (
        <Pile color={color} player={player} onPress={() => onPress(data[pieceNo])}/>
      )}
    </XStack>
  )
});

export default Plot;