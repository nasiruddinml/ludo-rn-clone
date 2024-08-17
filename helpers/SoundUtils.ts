import { Audio } from 'expo-av';

const sound = new Audio.Sound();

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

export const playSound = async (soundName: string, loop: boolean = false) => {
  
  try {
    // clearing previous sound object
    if(sound._loaded) {
      await sound.unloadAsync();
    }
    // get new sound path
    const soundPath = getSoundPath(soundName);
    console.log('Loading Sound');
    await sound.loadAsync(soundPath, {
      shouldPlay: true,
      isLooping: loop
    });
    // Your sound is playing!
    console.log('Playing Sound');
    // await sound.unloadAsync();
  
  } catch (error) {
    // An error occurred!
    console.log('error on playing', error)
  }

}

export const stopSound = async () => {
  try {
    await sound.stopAsync();
    // Don't forget to unload the sound from memory
    // when you are done using the Sound object
    // await sound.unloadAsync();
  } catch (error) {
    // An error occurred!
    console.log('error on playing', error)
  }
};
