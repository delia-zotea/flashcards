import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { FlashcardsContext } from "../context/FlashcardsContext";
import SubjectPill from "../components/SubjectPill";
import Flashcard from "../components/FlashCard";
import { COLORS } from "../styles/theme";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SubjectsScreen({ navigation }) {
  const { subjects, getCardsBySubjects, getFavoriteCards } =
    useContext(FlashcardsContext);

  const [selected, setSelected] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const toggleSubject = (s) => {
    setSelected((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
    setShowFavorites(false); 
  };

  const filteredCards = showFavorites
    ? getFavoriteCards()
    : getCardsBySubjects(selected);

  return (
    <SafeAreaView style={styles.container}>
      {/* TITLU + FAVORITE BUTTON */}
      <View style={styles.topRow}>
        <Text style={styles.title}>Subiecte</Text>
      </View>

      {/* SUBIECTE */}
      <View style={{ height: 50 }}>
  <FlatList
    data={["⭐ Favorite", ...subjects]}   // <<< AICI AM ADAUGAT FAVORITE CA PRIMUL ELEMENT
    keyExtractor={(item) => item}
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{ paddingHorizontal: 8, alignItems: "center" }}
    renderItem={({ item }) => {
      if (item === "⭐ Favorite") {
        return (
          <SubjectPill
            label="⭐ Favorite"
            selected={showFavorites}
            onPress={() => {
              setShowFavorites((prev) => !prev);
              setSelected([]); // scoate selecțiile de subiecte
            }}
          />
        );
      }

      return (
        <SubjectPill
          label={item}
          selected={selected.includes(item)}
          onPress={() => toggleSubject(item)}
        />
      );
    }}
    ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
  />
</View>
 

      {/* INFO + CLEAR */}
      <View style={styles.actionsRow}>
        <Text style={styles.hint}>
          {showFavorites
            ? "Vizualizezi cardurile favorite"
            : selected.length
            ? `${selected.length} selectate`
            : "Niciun subiect selectat — afișează toate"}
        </Text>

        {selected.length > 0 && !showFavorites && (
          <Pressable onPress={() => setSelected([])} style={styles.clearBtn}>
            <Text style={styles.clearText}>Clear</Text>
          </Pressable>
        )}
      </View>

      {/* LISTA CARDURI */}
      <FlatList
        data={[...filteredCards].reverse()}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 140 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.navigate("CardDetails", { id: item.id })
            }
          >
            <Flashcard card={item} />
          </Pressable>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Nu există carduri pentru selecția ta.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 20 },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  title: { fontSize: 24, fontWeight: "700", color: COLORS.textDark },

  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  hint: { color: COLORS.textLight },

  clearBtn: { padding: 6 },
  clearText: { color: COLORS.primary, fontWeight: "700" },

  empty: {
    textAlign: "center",
    marginTop: 30,
    color: COLORS.textLight,
  },
});
