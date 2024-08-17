import React from 'react'
import { useAppStore } from '@/store/store';
import { useRouter } from 'expo-router';
import { Dialog, XStack, YStack } from 'tamagui';
import { LinearGradient } from 'tamagui/linear-gradient';
import GradientButton from './GradientButton';
import useSound from '@/hooks/useSound';

interface MenuModalProps {
  visible: boolean;
  onClose?: () => void
}
const MenuModal = ({visible, onClose}: MenuModalProps) => {
  const { resetGame, announceWinner } = useAppStore(state => state);
  const router = useRouter();
  const { playSound } = useSound();

  const handleNewGame = () => {
    resetGame();
    announceWinner(null);
    playSound('game_start');
    onClose && onClose();
  };

  const handleHome = () => {
    router.back();
  }
  return (
    <Dialog modal open={visible}>
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.8}
          onPress={onClose}
        />

        <Dialog.Content
          elevate
          key="content"
          bg="$colorTransparent"
          animateOnly={['transform', 'opacity']}
          animation={[
            'quicker',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{opacity: 0, scale: 0 }}
          exitStyle={{opacity: 0, scale: 0 }}
          gap="$4">
          <XStack jc="center" w="95%" als="center" >
            <LinearGradient
              colors={['#0f0c29', '#302b63', '#24243e']}
              br={20}
              bw={2}
              bc="gold"
              ov="hidden"
              p={20}
              paddingVertical={40}
              w="98%"
              jc="center"
              ai="center"
            >
              <YStack w="100%" als="center" jc="center" ai="center">
                <GradientButton title="RESUME" onPress={onClose} />
                <GradientButton title="NEW GAME" onPress={handleNewGame} />
                <GradientButton title="HOME" onPress={handleHome} />
              </YStack>
            </LinearGradient>
          </XStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}

export default MenuModal