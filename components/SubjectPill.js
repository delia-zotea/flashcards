import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";
import { COLORS } from "../styles/theme";

export default function SubjectPill({ label, selected, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.pill, selected && styles.selected]}
    >
      <Text
  style={[styles.text, selected && styles.textSelected]}
  numberOfLines={1}          // limitează la o linie
  ellipsizeMode="tail"       // adaugă ... dacă textul e prea lung
>
  {label}
</Text>

    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#E6E9EE",
    margin: 4,            // padding între pill-uri
    maxWidth: 120,        // limitează lățimea
    minWidth: 60,         // să nu fie prea mic
    alignItems: "center", // centrează textul
  },
  selected: {
    backgroundColor: COLORS.primary,
  },
  text: {
    color: COLORS.textDark,
    fontWeight: "700",
    fontSize: 14,
    textAlign: "center",
  },
  textSelected: {
    color: "#fff",
  },
});
