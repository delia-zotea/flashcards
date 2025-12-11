import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import FlashcardsProvider from "./context/FlashcardsContext";

export default function App() {
  return (
    <FlashcardsProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </FlashcardsProvider>
  );
}
