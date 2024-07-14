import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailScreen from '@/app/detail';
import NotFoundScreen from '@/app/+not-found';
import HomeScreen from "@/app/index";
import PagesScreen from "@/app/pages";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/Lato-Bold.ttf'),
  });

  useEffect(() => {
    const hideSplashScreen = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };
    hideSplashScreen();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Prevent rendering until fonts are loaded
  }

  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme} independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="home" component={HomeScreen} options={{headerShown : false}}/>
        <Stack.Screen name="details" component={DetailScreen}  />
        <Stack.Screen name="pages" component={PagesScreen}  />
        <Stack.Screen name="+not-found" component={NotFoundScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
