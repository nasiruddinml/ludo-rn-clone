// Learn more https://docs.expo.io/guides/customizing-metro

import { getDefaultConfig } from 'expo/metro-config';
import { withTamagui } from '@tamagui/metro-plugin';

const defaultConfig = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
})

const config = {
  ...defaultConfig,
  transformer: {
    ...defaultConfig.transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    ...defaultConfig.resolver,
    assetExts: defaultConfig.resolver?.assetExts?.filter((ext) => ext !== 'svg'),
    sourceExts: [...defaultConfig.resolver?.sourceExts as any, 'svg']
  }
};

// add nice web support with optimizing compiler + CSS extraction

// 2. Enable Tamagui
module.exports = withTamagui(config as any, {
  components: ['tamagui'],
  config: './tamagui.config.ts',
  outputCSS: './tamagui-web.css',
});
