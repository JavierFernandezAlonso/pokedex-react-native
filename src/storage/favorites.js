import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "FAVORITE_POKEMONS";

export const getFavorites = async () => {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};

export const saveFavorites = async (data) => {
  await AsyncStorage.setItem(KEY, JSON.stringify(data));
};

export const toggleFavorite = async (pokemon) => {
  const current = await getFavorites();

  const exists = current.find((p) => p.id === pokemon.id);

  const updated = exists
    ? current.filter((p) => p.id !== pokemon.id)
    : [...current, pokemon];

  await saveFavorites(updated);
  return updated;
};