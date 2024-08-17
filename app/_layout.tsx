import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { PortalProvider, TamaguiProvider } from "tamagui";
import tamaguiConfig from "@/tamagui.config";
import { ToastProvider } from "@tamagui/toast";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    PhilosopherBold: require("../assets/fonts/Philosopher-Bold.ttf"),
    Philosopher: require("../assets/fonts/Philosopher-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <PortalProvider shouldAddRootHost>
          <SafeAreaProvider>
            <ToastProvider native>
              <Stack>
                <Stack.Screen
                  name="splash"
                  options={{ headerShown: false, animation: "fade" }}
                />
                <Stack.Screen
                  name="index"
                  options={{ headerShown: false, animation: "fade" }}
                />
                <Stack.Screen
                  name="home"
                  options={{ headerShown: false, animation: "fade" }}
                />
                <Stack.Screen
                  name="board"
                  options={{ headerShown: false, animation: "fade" }}
                />
                <Stack.Screen name="+not-found" />
              </Stack>
              <StatusBar style="light" />
            </ToastProvider>
          </SafeAreaProvider>
        </PortalProvider>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
