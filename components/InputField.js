import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { COLORS } from "../styles/theme";

export default function InputField({ label, value, onChange, placeholder, error, multiline }) {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        style={[styles.input, multiline && { height: 100, textAlignVertical: "top" }, error && { borderColor: "red" }]}
        multiline={multiline}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 12 },
  label: { fontWeight: "600", marginBottom: 6, color: COLORS.textDark },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E6E9EE",
    padding: 12,
    borderRadius: 12,
    fontSize: 16,
  },
  error: { color: "red", marginTop: 6 },
});
