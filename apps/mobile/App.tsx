import "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { RootNavigator } from "./src/navigation/RootNavigator";
import { useState } from "react";
import AppSplash from "./src/components/AppSplash";

export default function App() {
  const [showSplash, setShowSplash] = useState(true)

  return (
    <>
      <RootNavigator />
      {showSplash && <AppSplash onFinish={() => setShowSplash(false)} />}
      <StatusBar style="auto" />
    </>
  );
}