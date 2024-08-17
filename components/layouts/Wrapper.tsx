import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { CardProps } from "tamagui";
import { Card, Image, styled, XStack } from "tamagui";
import { ImageBackground } from "react-native";

export function WrapperContainer({ children }: React.PropsWithChildren) {
  return (
    <XStack $sm={{ flexDirection: "column", flex: 1 }}>
      <WrapperCard flex={1}>
        {children}
      </WrapperCard>
    </XStack>
  );
}

export function WrapperCard(props: CardProps) {
  const insets = useSafeAreaInsets();
  return (
    <Card {...props} paddingBottom={insets.bottom} paddingTop={insets.top}>
      <Card.Background>
        <Image objectFit="cover" source={require('@/assets/images/bg.jpg')} w={'100%'} h={'100%'} />
      </Card.Background>
      {/* <Card.Content> */}
      {props.children}
      {/* </Card.Content> */}
    </Card>
  );
}

export function BackgroundImg({ children, ...props }: React.PropsWithChildren) {
  const insets = useSafeAreaInsets();
  return (
    <ImageBackground {...props} resizeMode="cover" source={require('@/assets/images/bg.jpg')} style={{
      paddingBottom: insets.bottom, paddingTop: insets.top, flex: 1, justifyContent: 'center'
    }}>
      {children}
    </ImageBackground>
  );
}
