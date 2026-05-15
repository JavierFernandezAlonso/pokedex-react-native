import { FlatList } from "react-native";
import PokemonCard from "./PokemonCard";

const PokemonList = ({ pokemons, navigation, loadMore }) => {
  return (
    <FlatList
      data={pokemons}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <PokemonCard
          pokemon={item}
          onPress={() =>
            navigation.navigate("Detail", {
              pokemon: item,
            })
          }
        />
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 120,
        paddingTop: 10,
      }}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export default PokemonList;