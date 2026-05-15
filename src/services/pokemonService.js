const BASE_URL = "https://pokeapi.co/api/v2";

export const getPokemons = async (offset = 0) => {
  const res = await fetch(
    `${BASE_URL}/pokemon?limit=20&offset=${offset}`
  );

  return await res.json();
};

export const getPokemonByName = async (name) => {
  const res = await fetch(
    `${BASE_URL}/pokemon/${name.toLowerCase()}`
  );

  return await res.json();
};

export const getPokemonsByType = async (type) => {
  const res = await fetch(
    `${BASE_URL}/type/${type.toLowerCase()}`
  );

  return await res.json();
};