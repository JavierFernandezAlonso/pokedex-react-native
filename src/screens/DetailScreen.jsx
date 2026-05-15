import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { typeColors } from "../utils/typeColors";

const DetailScreen = ({ route }) => {
  const { pokemon } = route.params;

  const mainType = pokemon.types[0].type.name;
  const bgColor = typeColors[mainType] || "#e3350d";

  const getStat = (name) => {
    const stat = pokemon.stats.find((s) => s.stat.name === name);
    return stat ? stat.base_stat : 0;
  };

  const [evolutions, setEvolutions] = useState([]);

  useEffect(() => {
    fetchEvolutions();
  }, [pokemon.id]);

  const fetchEvolutions = async () => {
    try {
      const speciesRes = await fetch(pokemon.species.url);
      const speciesData = await speciesRes.json();
      
      const evolutionRes = await fetch(speciesData.evolution_chain.url);
      const evolutionData = await evolutionRes.json();
      
      const evoList = [];

      const extractEvolutions = (chain) => {
        const speciesUrl = chain.species.url;
        const idMatch = speciesUrl.match(/\/(\d+)\/$/);
        const id = idMatch ? idMatch[1] : null;

        evoList.push({
          name: chain.species.name,
          id: id,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        });

        chain.evolves_to.forEach(evo => extractEvolutions(evo));
      };

      extractEvolutions(evolutionData.chain);
      setEvolutions(evoList);
    } catch (error) {
      console.error("Error fetching evolutions", error);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: bgColor }]}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.name}>
          {pokemon.name.toUpperCase()}
        </Text>
        <Text style={styles.id}>#{pokemon.id}</Text>
      </View>

      {/* IMAGE */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: pokemon.sprites.front_default }}
          style={styles.image}
        />
      </View>

      {/* PANEL */}
      <View style={styles.card}>
        <Text style={styles.section}>TIPOS</Text>
        <Text>{pokemon.types.map(t => t.type.name).join(", ")}</Text>

        <Text style={styles.section}>HABILIDADES</Text>
        <Text>{pokemon.abilities.map(a => a.ability.name).join(", ")}</Text>

        <Text style={styles.section}>ESTADÍSTICAS</Text>

        <Text>HP: {getStat("hp")}</Text>
        <Text>Ataque: {getStat("attack")}</Text>
        <Text>Defensa: {getStat("defense")}</Text>
        <Text>Ataque Especial: {getStat("special-attack")}</Text>
        <Text>Defensa Especial: {getStat("special-defense")}</Text>
        <Text>Velocidad: {getStat("speed")}</Text>

        <Text style={styles.section}>EVOLUCIONES</Text>
        {evolutions.length > 0 ? (
          <View style={styles.evolutionContainer}>
            {evolutions.map((evo) => (
              <View key={evo.id} style={styles.evolutionItem}>
                <Image source={{ uri: evo.image }} style={styles.evoImage} />
                <Text style={styles.evoName}>{evo.name}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text>Cargando evoluciones...</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    alignItems: "center",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  id: {
    color: "#fff",
    opacity: 0.9,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: -10,
  },
  image: {
    width: 180,
    height: 180,
  },
  card: {
    backgroundColor: "#fff",
    margin: 15,
    borderRadius: 20,
    padding: 15,
  },
  section: {
    fontWeight: "bold",
    marginTop: 10,
    color: "#DC0A2D",
  },
  evolutionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginTop: 10,
  },
  evolutionItem: {
    alignItems: "center",
    marginRight: 15,
    marginBottom: 10,
  },
  evoImage: {
    width: 60,
    height: 60,
  },
  evoName: {
    textTransform: "capitalize",
    fontSize: 12,
    fontWeight: "500",
  },
});