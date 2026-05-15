import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

import PokemonList from "../components/PokemonList";
import SearchBar from "../components/SearchBar";

import {
  getPokemonByName,
  getPokemons,
  getPokemonsByType,
} from "../services/pokemonService";
import { typeColors } from "../utils/typeColors";

const HomeScreen = ({ navigation }) => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [searchType, setSearchType] = useState("");
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [typeUrls, setTypeUrls] = useState([]);

  useEffect(() => {
    loadPokemons(true);
  }, []);

  useEffect(() => {
    const parentNav = navigation.getParent();
    if (!parentNav) return;

    const unsubscribe = parentNav.addListener('tabPress', (e) => {
      // If we are searching, tapping the tab should reset the list
      if (searchName !== "" || searchType !== "" || error !== null || typeUrls.length > 0) {
        setSearchName("");
        setSearchType("");
        setError(null);
        setTypeUrls([]);
        loadPokemons(true);
      } else {
        loadPokemons(true);
      }
    });

    return unsubscribe;
  }, [navigation, searchName, searchType, error, typeUrls]);

  // 🔥 CARGA INICIAL + PAGINACIÓN
  const loadPokemons = async (reset = false) => {
    if (loading && !reset) return; // Prevent duplicate requests
    try {
      setLoading(true);
      setError(null);

      const currentOffset = reset ? 0 : offset;
      const data = await getPokemons(currentOffset);

      const fullData = await Promise.all(
        data.results.map((p) =>
          fetch(p.url).then((res) => res.json())
        )
      );

      setPokemons((prev) =>
        reset ? fullData : [...prev, ...fullData]
      );

      setOffset(currentOffset + 20);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // 🔍 BUSCADOR POR NOMBRE
  const handleNameSearchSubmit = async (textToSearch = searchName) => {
    const textLower = textToSearch.trim().toLowerCase();

    if (textLower === "") {
      setError(null);
      setTypeUrls([]);
      loadPokemons(true);
      return;
    }

    try {
      setSearchType(""); // Clear type search visually
      setLoading(true);
      setError(null);
      setTypeUrls([]); // Normal search by name
      
      const result = await getPokemonByName(textLower);
      setPokemons([result]);
    } catch (error) {
      setPokemons([]);
      setTypeUrls([]);
      setError(`No se encontró ningún Pokémon llamado "${textToSearch}"`);
    } finally {
      setLoading(false);
    }
  };

  // 🔍 BUSCADOR POR TIPO
  const handleTypeSearchSubmit = async (textToSearch = searchType) => {
    const textLower = textToSearch.trim().toLowerCase();

    if (textLower === "") {
      setError(null);
      setTypeUrls([]);
      loadPokemons(true);
      return;
    }

    try {
      setSearchName(""); // Clear name search visually
      setLoading(true);
      setError(null);

      const isType = Object.keys(typeColors).includes(textLower);

      if (isType) {
        const typeData = await getPokemonsByType(textLower);
        const urls = typeData.pokemon.map((p) => p.pokemon.url);
        setTypeUrls(urls);
        setOffset(0);

        const first20Urls = urls.slice(0, 20);
        const fullData = await Promise.all(
          first20Urls.map((url) => fetch(url).then((res) => res.json()))
        );
        setPokemons(fullData);
        setOffset(20);
      } else {
        setPokemons([]);
        setTypeUrls([]);
        setError(`"${textToSearch}" no es un tipo válido. Usa fire, water, grass...`);
      }
    } catch (error) {
      setPokemons([]);
      setTypeUrls([]);
      setError(`Error buscando el tipo "${textToSearch}"`);
    } finally {
      setLoading(false);
    }
  };

  // 📜 SCROLL INFINITO
  const loadMore = async () => {
    if (loading) return;

    if (typeUrls.length > 0) {
      // Pagination for type search
      if (offset >= typeUrls.length) return;

      try {
        setLoading(true);
        const nextUrls = typeUrls.slice(offset, offset + 20);
        const fullData = await Promise.all(
          nextUrls.map((url) => fetch(url).then((res) => res.json()))
        );
        setPokemons((prev) => [...prev, ...fullData]);
        setOffset((prev) => prev + 20);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    } else if (!searchName && !searchType) {
      // Pagination for normal list
      loadPokemons(false);
    }
  };

  if (loading && pokemons.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#DC0A2D" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
      <SearchBar 
        value={searchName} 
        onChange={setSearchName} 
        onSubmit={() => handleNameSearchSubmit()} 
        placeholder="Buscar Pokémon por nombre..."
      />
      <SearchBar 
        value={searchType} 
        onChange={setSearchType} 
        onSubmit={() => handleTypeSearchSubmit()} 
        placeholder="Buscar por tipo (fire, water...)"
      />

      {error ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 16, color: "#666", textAlign: "center", padding: 20 }}>
            {error}
          </Text>
        </View>
      ) : (
        <PokemonList
          pokemons={pokemons}
          navigation={navigation}
          loadMore={loadMore}
        />
      )}
    </View>
  );
};

export default HomeScreen;