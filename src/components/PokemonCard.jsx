import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { typeColors } from "../utils/typeColors";
import { useFavorites } from "../context/FavoritesContext";

const PokemonCard = ({ pokemon, onPress }) => {
  const type =
    pokemon?.types?.[0]?.type?.name || "normal";

  const bgColor = typeColors[type] || "#ccc";

  const { toggleFavorite, isFavorite } = useFavorites();
  const isFav = isFavorite(pokemon.id);

  const handleToggleFavorite = () => {
    toggleFavorite(pokemon);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.card,
        { borderLeftColor: bgColor },
      ]}
    >
      <Image
        source={{
          uri: pokemon?.sprites?.front_default,
        }}
        style={styles.image}
      />

      <View style={[styles.info, { flex: 1 }]}>
        <Text style={styles.name}>
          {pokemon?.name?.toUpperCase()}
        </Text>

        <Text style={styles.id}>
          #{pokemon?.id}
        </Text>

        <View style={styles.typesContainer}>
          {pokemon?.types?.map((t) => {
            const typeName = t.type.name;
            const badgeColor = typeColors[typeName] || "#ccc";
            return (
              <View
                key={typeName}
                style={[
                  styles.typeBadge,
                  { backgroundColor: badgeColor },
                ]}
              >
                <Text style={styles.typeText}>
                  {typeName}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* ❤️ FAVORITO */}
      <TouchableOpacity onPress={handleToggleFavorite}>
        <Ionicons 
          name={isFav ? "heart" : "heart-outline"} 
          size={28} 
          color={isFav ? "#DC0A2D" : "#999"} 
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default PokemonCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginVertical: 8,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderLeftWidth: 8,

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 70,
    height: 70,
  },
  info: {
    marginLeft: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  id: {
    color: "#666",
  },
  typesContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  typeBadge: {
    marginRight: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  typeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});