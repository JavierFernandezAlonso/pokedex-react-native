import { FlatList, View, Text, StyleSheet } from "react-native";
import PokemonCard from "../components/PokemonCard";
import { useFavorites } from "../context/FavoritesContext";

const FavoritesScreen = ({ navigation }) => {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No tienes Pokémon favoritos aún.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <PokemonCard
          pokemon={item}
          onPress={() =>
            navigation.navigate("Pokédex", {
              screen: "Detail",
              params: { pokemon: item },
            })
          }
        />
      )}
      contentContainerStyle={{ paddingTop: 10, paddingBottom: 20 }}
    />
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
});