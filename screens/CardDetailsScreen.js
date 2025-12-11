import React, { useContext } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { FlashcardsContext } from "../context/FlashcardsContext";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../styles/theme";
import { SafeAreaView } from "react-native-safe-area-context"; // updated import

export default function CardDetailsScreen({ route, navigation }) {
  const { id } = route.params;
  const { cards, toggleFavorite } = useContext(FlashcardsContext);

  const card = cards.find((c) => c.id === id);
  if (!card) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.error}>Cardul nu a fost găsit.</Text>
      </SafeAreaView>
    );
  }

  const subjectCards = cards.filter((c) => c.subject === card.subject);
  const currentIndex = subjectCards.findIndex((c) => c.id === card.id);
  const prev = subjectCards[currentIndex - 1];
  const next = subjectCards[currentIndex + 1];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.subject}>{card.subject}</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Întrebare</Text>
        <Text style={styles.question}>{card.question}</Text>

        <Text style={styles.label}>Răspuns</Text>
        <Text style={styles.answer}>{card.answer}</Text>
      </View>

      <Pressable
        style={[styles.favoriteBtn, card.favorite && { backgroundColor: COLORS.warning }]}
        onPress={() => toggleFavorite(card.id)}
      >
        <Ionicons name={card.favorite ? "star" : "star-outline"} size={20} color="#fff" />
        <Text style={styles.favoriteText}>{card.favorite ? "Elimină din favorite" : "Adaugă la favorite"}</Text>
      </Pressable>

      <View style={styles.row}>
        <Pressable
          disabled={!prev}
          style={[styles.navBtn, !prev && { opacity: 0.4 }]}
          onPress={() => navigation.replace("CardDetails", { id: prev?.id })}
        >
          <Text style={styles.navText}>← Anterior</Text>
        </Pressable>

        <Pressable
  style={[
    styles.favoriteBtn,
    card.favorite && { backgroundColor: COLORS.warning }
  ]}
  onPress={() => toggleFavorite(card.id)}
>
  <Ionicons
    name={card.favorite ? "star" : "star-outline"}
    size={20}
    color="#fff"
  />
  <Text style={styles.favoriteText}>
    {card.favorite ? "Elimină din favorite" : "Adaugă la favorite"}
  </Text>
</Pressable>


        <Pressable
          disabled={!next}
          style={[styles.navBtn, !next && { opacity: 0.4 }]}
          onPress={() => navigation.replace("CardDetails", { id: next?.id })}
        >
          <Text style={styles.navText}>Următor →</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 20 },
  subject: { color: COLORS.secondary, fontWeight: "800", marginBottom: 12, fontSize: 18 },
  card: { backgroundColor: "#fff", padding: 18, borderRadius: 14, marginBottom: 18, elevation: 3 },
  label: { color: COLORS.primary, fontWeight: "700", marginBottom: 8 },
  question: { fontSize: 20, fontWeight: "800", color: COLORS.textDark, marginBottom: 10 },
  answer: { color: COLORS.textLight },
  favoriteBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: COLORS.primary, padding: 12, borderRadius: 30, gap: 10, marginBottom: 14 },
  favoriteText: { color: "#fff", fontWeight: "700" },
  row: { flexDirection: "row", justifyContent: "space-between" },
  navBtn: { paddingVertical: 10, paddingHorizontal: 18, borderRadius: 10, backgroundColor: "#fff", borderWidth: 1, borderColor: "#E6E9EE" },
  navText: { fontWeight: "700", color: COLORS.textDark },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  error: { color: "red", fontWeight: "700" },
});
