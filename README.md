### 1. Breve explicación del funcionamiento de la app

La aplicación es una Pokédex móvil construida con React Native que cuenta con dos pantallas principales navegables a través de un menú inferior con estética clásica de Nintendo:
- **Pantalla Principal (Pokédex):** Muestra una lista de Pokémon que se carga de forma infinita (de 20 en 20 para no saturar la memoria). Incluye dos buscadores independientes: uno para buscar un Pokémon por su **nombre exacto** y otro para filtrar todos los Pokémon de un **tipo específico** (ej. `fire`, `water`), manteniendo en todo momento el scroll fluido y adaptativo. Si el usuario toca el botón "Pokédex" en el menú, cualquier búsqueda activa se limpia y la lista vuelve a su estado inicial.
- **Pantalla de Favoritos:** Muestra los Pokémon que el usuario ha guardado tocando el ícono de corazón. Utiliza un **Contexto Global** apoyado por almacenamiento local (`AsyncStorage`), por lo que los cambios se reflejan al instante en cualquier parte de la aplicación de forma permanente.
- **Ficha de Detalle:** Al pulsar en cualquier Pokémon, se abre su información detallada. Además de sus estadísticas (HP, ataque, velocidad...) y tipos (mostrados con etiquetas de colores), la app calcula y renderiza visualmente toda la **cadena evolutiva** del Pokémon al final de la pantalla.

---

### 2. Indicación de los endpoints utilizados (PokeAPI)

La aplicación extrae toda su información de forma dinámica conectándose a la PokeAPI mediante los siguientes endpoints:

1. **`GET https://pokeapi.co/api/v2/pokemon?limit=20&offset={offset}`**
   *Se utiliza para la pantalla inicial, pidiendo la información básica de los Pokémon por bloques de 20 para alimentar la paginación.*

2. **`GET https://pokeapi.co/api/v2/pokemon/{name_or_id}`**
   *Se usa tanto para buscar un Pokémon específico por su nombre, como para descargar los datos detallados (sprites, stats, tipos) de las URLs individuales que devuelven el resto de endpoints.*

3. **`GET https://pokeapi.co/api/v2/type/{type}`**
   *Se utiliza en el segundo buscador. Devuelve una lista con todos los Pokémon existentes que pertenecen al tipo solicitado.*

4. **`GET https://pokeapi.co/api/v2/pokemon-species/{id}/`**
   *Se utiliza dentro de la ficha de detalle para conocer la especie del Pokémon y, de ahí, obtener la URL de su cadena evolutiva.*

5. **`GET https://pokeapi.co/api/v2/evolution-chain/{id}/`**
   *Se utiliza para extraer recursivamente todas las etapas evolutivas de una familia (nombres y referencias) y poder renderizar las imágenes de las evoluciones en la ficha de detalle.*
