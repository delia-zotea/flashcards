import React, { useContext } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { FlashcardsContext } from "../context/FlashcardsContext";
import Flashcard from "../components/FlashCard";
import { COLORS } from "../styles/theme";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context"; // updated import

export default function HomeScreen({ navigation }) {
  const { cards } = useContext(FlashcardsContext);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>📚 Flashcards</Text>
      <Text style={styles.subtitle}>Toate cardurile — vizualizare rapidă</Text>

      <FlatList
        data={[...cards].reverse()} // cele mai noi sus
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 140 }}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigation.navigate("CardDetails", { id: item.id })}>
            <Flashcard card={item} />
          </Pressable>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Nu există carduri. Adaugă primul!</Text>}
      />

      {/* FAB */}
      <Pressable style={styles.fab} onPress={() => navigation.navigate("AddCard")}>
        <Ionicons name="add" size={28} color="#fff" />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 20 },
  title: { fontSize: 28, fontWeight: "800", color: COLORS.textDark },
  subtitle: { color: COLORS.textLight, marginBottom: 12 },
  empty: { textAlign: "center", marginTop: 30, color: COLORS.textLight },
  fab: {
    position: "absolute",
    right: 22,
    bottom: 22,
    backgroundColor: COLORS.primary,
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
  },
});
