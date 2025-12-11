import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FlipCard from "react-native-flip-card";
import { COLORS } from "../styles/theme";

export default function Flashcard({ card }) {
  return (
    <FlipCard
      style={styles.card}
      friction={6}
      perspective={1000}
      flipHorizontal
      flipVertical={false}
      clickable
    >
      {/* Front side */}
      <View style={styles.face}>
        <Text style={styles.subject}>{card.subject}</Text>
        <Text style={styles.question}>{card.question}</Text>
        {card.favorite && <Text style={styles.favoriteStar}>⭐</Text>}
      </View>

      {/* Back side */}
      <View style={styles.back}>
        <Text style={styles.answer}>{card.answer}</Text>
      </View>
    </FlipCard>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 12 },
  face: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  back: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  subject: { color: COLORS.secondary, fontWeight: "700", marginBottom: 6 },
  question: { fontSize: 16, fontWeight: "700", color: COLORS.textDark },
  answer: { fontSize: 16, fontWeight: "700", color: COLORS.textDark },
  favoriteStar: { position: "absolute", top: 8, right: 8, fontSize: 18 },
});
