import React, { useMemo } from "react";
import { XStack } from "tamagui";
import Cell from "./Cell";

interface VerticalPathProps {
  cells: number[];
  color: string | number;
}

export const VerticalPath = React.memo(
  ({ cells, color }: VerticalPathProps) => {
    const groupCells = useMemo(() => {
      const groups = [];
      for (let i = 0; i < cells.length; i += 3) {
        groups.push(cells.slice(i, i + 3));
      }
      return groups;
    }, [cells]);
    return (
      <XStack fd="row" ai="center" w="20%" h="100%">
        <XStack fd="column" w="100%" h="100%">
          {groupCells.map((group, groupIndex) => (
            <XStack
              key={"group=" + groupIndex.toString()}
              fd="row"
              w="33.3%"
              h="16.7%"
            >
              {group.map((id) => (
                <Cell key={"cell-" + id} cell id={id} color={color} />
              ))}
            </XStack>
          ))}
        </XStack>
      </XStack>
    );
  }
);

export default VerticalPath;
