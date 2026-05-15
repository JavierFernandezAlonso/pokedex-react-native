import { StyleSheet, Text, View } from "react-native";
import { typeColors } from "../utils/typeColors";

export default function TypeBadge({ type }) {
  return (
    <View style={[styles.badge, { backgroundColor: typeColors[type] || "#999" }]}>
      <Text style={styles.text}>{type.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginHorizontal: 3,
    marginTop: 5,
  },
  text: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});