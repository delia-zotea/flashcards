import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, Alert } from "react-native";
import { FlashcardsContext } from "../context/FlashcardsContext";
import InputField from "../components/InputField";
import SubjectPill from "../components/SubjectPill";
import { COLORS } from "../styles/theme";
import { SafeAreaView } from "react-native-safe-area-context"; // updated import

export default function AddCardScreen({ navigation }) {
  const { subjects, addCard } = useContext(FlashcardsContext);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [subject, setSubject] = useState("");
  const [errors, setErrors] = useState({});

  const pickSubject = (s) => {
    setSubject(s);
    setErrors((e) => ({ ...e, subject: null }));
  };

  const validate = () => {
    const e = {};
    if (!question.trim()) e.question = "Întrebarea este obligatorie.";
    if (!answer.trim()) e.answer = "Răspunsul este obligatoriu.";
    if (!subject.trim()) e.subject = "Subiectul este obligatoriu (alege sau scrie unul nou).";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSave = () => {
    if (!validate()) return;
    addCard(question, answer, subject);
    Alert.alert("Salvat", "Cardul a fost adăugat.", [{ text: "OK", onPress: () => navigation.goBack() }]);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Adaugă card</Text>

        <InputField label="Întrebare" value={question} onChange={setQuestion} placeholder="Scrie întrebarea..." error={errors.question} />
        <InputField label="Răspuns" value={answer} onChange={setAnswer} placeholder="Scrie răspunsul..." error={errors.answer} multiline />

        <Text style={styles.label}>Alege sau scrie subiect</Text>

        <View style={styles.pillsRow}>
          {subjects.map((s) => (
            <Pressable key={s} onPress={() => pickSubject(s)} style={{ marginRight: 8 }}>
              <SubjectPill label={s} selected={subject === s} onPress={() => pickSubject(s)} />
            </Pressable>
          ))}
        </View>

        <InputField label="Subiect (sau scrie unul nou)" value={subject} onChange={setSubject} placeholder="Ex: Fizică" error={errors.subject} />

        <View style={styles.actions}>
          <Pressable style={styles.saveBtn} onPress={onSave}>
            <Text style={styles.saveText}>Salvează</Text>
          </Pressable>

          <Pressable style={styles.cancelBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelText}>Anulează</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 60 },
  title: { fontSize: 24, fontWeight: "800", color: COLORS.textDark, marginBottom: 12 },
  label: { fontWeight: "700", marginTop: 6, marginBottom: 8, color: COLORS.textDark },
  pillsRow: { flexDirection: "row", marginBottom: 12, flexWrap: "wrap" },
  actions: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
  saveBtn: { backgroundColor: COLORS.primary, paddingVertical: 12, paddingHorizontal: 22, borderRadius: 12 },
  saveText: { color: "#fff", fontWeight: "700" },
  cancelBtn: { paddingVertical: 12, paddingHorizontal: 22, borderRadius: 12, borderWidth: 1, borderColor: "#E6E9EE" },
  cancelText: { color: COLORS.textDark, fontWeight: "700" },
});
