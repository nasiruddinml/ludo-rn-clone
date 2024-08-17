import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';

const useSound = () => {
  const [sound, setSound] = useState(new Audio.Sound());
  const [isPlaying, setIsPlaying] = useState(false);

  const getSoundPath = (soundName: string) => {
    switch(soundName) {
      case 'dice_roll': 
        return require('@/assets/sfx/dice_roll.mp3');
      case 'cheer': 
        return require('@/assets/sfx/cheer.mp3');
      case 'collide': 
        return require('@/assets/sfx/collide.mp3');
      case 'game_start': 
        return require('@/assets/sfx/game_start.mp3');
      case 'girl1': 
        return require('@/assets/sfx/girl1.mp3');
      case 'girl2': 
        return require('@/assets/sfx/girl2.mp3');
      case 'girl3': 
        return require('@/assets/sfx/girl3.mp3');
      case 'home_win': 
        return require('@/assets/sfx/home_win.mp3');
      case 'home': 
        return require('@/assets/sfx/home.mp3');
      case 'pile_move': 
        return require('@/assets/sfx/pile_move.mp3');
      case 'safe_spot': 
        return require('@/assets/sfx/safe_spot.mp3');
      case 'ui': 
        return require('@/assets/sfx/ui.mp3');
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const playSound = async (soundName: string, loop: boolean = false) => {
    if (!isPlaying) {
      try {
        const soundPath = getSoundPath(soundName);
        await sound.loadAsync(soundPath, {isLooping: loop});
        await sound.playAsync();
        setIsPlaying(true);
      } catch (error) {
        console.error('Error playing sound:', error);
      }
    } else {
      try {
        await sound.stopAsync();
        setIsPlaying(false);
        await sound.unloadAsync();
        const soundPath = getSoundPath(soundName);
        await sound.loadAsync(soundPath, {isLooping: loop});
        await sound.playAsync();
        setIsPlaying(true);
      } catch (error) {
        console.error('Error playing sound:', error);
      }
    }
  };

  const stopSound = async () => {
    if (isPlaying) {
      try {
        await sound.stopAsync();
        setIsPlaying(false);
        await sound.unloadAsync();
      } catch (error) {
        console.error('Error stopping sound:', error);
      }
    }
  };

  return { playSound, stopSound, isPlaying };
};

export default useSound;