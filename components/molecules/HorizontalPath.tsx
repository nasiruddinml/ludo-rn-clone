import React, { useMemo } from 'react'
import { XStack } from 'tamagui';
import Cell from './Cell';

interface VerticalPathProps {
  cells: number[];
  color: string | number;
}

export const VerticalPath = React.memo(({cells, color}: VerticalPathProps) => {
  const groupCells = useMemo(() => {
    const groups = [];
    for (let i = 0; i < cells.length; i+= 6) {
      groups.push(cells.slice(i, i+ 6));
    }
    return groups;
  }, [cells])
  return (
    <XStack fd="row" ai="center" w="40%" h="100%">
      <XStack fd="column" w="100%" h="100%">
        {
          groupCells.map((group, groupIndex) => (
            <XStack key={'group=' + groupIndex.toString()} fd="row" h="33.3%" w="16.7%">
              {
                group.map(id => 
                  <Cell key={'cell-' + id} cell id={id} color={color} />
                )
              }
            </XStack>
          ))
        }
      </XStack>
    </XStack>
  )
});

export default VerticalPath