import { ActivityIndicator, View } from "react-native";

export default function Loading() {
  return (
    <View style={{ padding: 20 }}>
      <ActivityIndicator size="large" />
    </View>
  );
}