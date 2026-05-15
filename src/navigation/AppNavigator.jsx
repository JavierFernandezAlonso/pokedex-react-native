import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DetailScreen from "../screens/DetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import HomeScreen from "../screens/HomeScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function PokedexStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#DC0A2D" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold", fontSize: 22 },
        contentStyle: { backgroundColor: "#f0f0f0" }
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Pokédex" }} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ title: "Ficha" }} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#DC0A2D",
        tabBarInactiveTintColor: "#888",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 2,
          borderTopColor: "#DC0A2D",
          paddingBottom: 5,
          height: 60,
        },
        tabBarIcon: ({ color, size }) => {
          const icon = route.name === "Pokédex" ? "list" : "heart";
          return <Ionicons name={icon} size={size + 4} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Pokédex" component={PokedexStack} />
      <Tab.Screen name="Favoritos" component={FavoritesScreen} />
    </Tab.Navigator>
  );
}