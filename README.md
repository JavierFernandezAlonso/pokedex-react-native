<<<<<<< HEAD
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
=======
# pokedex-react-native
# App Pokédex en React Native

## Sobre mí 😊👇
- Estudiante de Desarrollo de Aplicaciones Multiplataforma
- Junior Developer en formación
- Manejo de Java, Php y HTML
- Experiencia con Apache NetBeans, PhpStorm, Eclipse, phpMyAdmin, mySQL, Oracle VirtualBox y Docker.

## Objetivos 🎯
- Desarrollar una aplicación móvil utilizando React Native que se conecte a la PokéAPI para consultar y mostrar información sobre Pokémon. 
- Practicar el consumo de APIs REST desde una app móvil, el uso de componentes, estados, navegación, renderizado de listas y presentación de datos obtenidos desde un servicio externo.

## Requisitos mínimos 📑

1. Pantalla principal

La aplicación deberá mostrar una pantalla principal con un listado de Pokémon obtenido desde la API. <br>
Cada Pokémon deberá mostrarse en una tarjeta o elemento de lista con, al menos: <br>
● Nombre del Pokémon. <br>
● Imagen del Pokémon. <br>
● Número o ID del Pokémon. 

2. Consulta a la API
   
La aplicación deberá conectarse a la API de Pokémon para obtener los datos. <br>
Se podrá utilizar el siguiente endpoint: <br>
https://pokeapi.co/api/v2/pokemon?limit=20 <br>
La aplicación deberá cargar al menos los primeros 20 Pokémon.

3. Pantalla de detalle

Al pulsar sobre un Pokémon del listado, se deberá abrir una pantalla de detalle. <br>
La pantalla de detalle deberá mostrar, como mínimo: <br>
● Nombre del Pokémon. <br>
● Imagen. <br>
● ID. <br>
● Altura. <br>
● Peso. <br>
● Tipo o tipos. <br>
● Habilidades. <br>

4. Buscador 
   
La aplicación deberá incluir un campo de búsqueda para localizar un Pokémon por nombre. <br>
El usuario podrá escribir el nombre de un Pokémon y la app deberá consultar la API para mostrar su información. <br>
Ejemplo: <br>
https://pokeapi.co/api/v2/pokemon/charmander 

5. Gestión de errores

La aplicación deberá controlar posibles errores, por ejemplo: <br>
● Pokémon no encontrado. <br>
● Error de conexión. <br>
● Respuesta incorrecta de la API. <br>
● Campo de búsqueda vacío. <br>
En estos casos, se deberá mostrar un mensaje claro al usuario. 

6. Indicador de carga

Mientras la aplicación espera la respuesta de la API, deberá mostrarse un indicador de carga. <br>
Se puede utilizar el componente ActivityIndicator de React Native. 

7. Componentes mínimos 

La aplicación deberá estar organizada, como mínimo, en los siguientes componentes: <br>
● App <br>
● PokemonList <br>
● PokemonCard <br>
● PokemonDetail <br>
● SearchBar 

También se recomienda organizar el código en carpetas, por ejemplo: <br>
src/ <br>
├── components/ <br>
│ ├── PokemonCard.jsx <br>
│ ├── PokemonList.jsx <br>
│ └── SearchBar.jsx <br>
├── screens/ <br>
│ ├── HomeScreen.jsx <br>
│ └── DetailScreen.jsx <br>
├── services/ <br>
│ └── pokemonService.js <br>
└── App.jsx 

8. Requisitos técnicos 

La aplicación deberá cumplir los siguientes requisitos: <br>
● Estar desarrollada con React Native. <br>
● Utilizar componentes funcionales. <br>
● Utilizar hooks como useState y useEffect. <br>
● Utilizar FlatList para mostrar el listado. <br>
● Utilizar fetch o axios para consumir la API. <br>
● Separar la lógica de conexión a la API en un archivo de servicio. <br>
● Aplicar estilos con StyleSheet. <br>
● La aplicación debe poder ejecutarse correctamente en un emulador o dispositivo 
físico.

## Requisitos opcionales ⭐

Se valorará positivamente añadir alguna de las siguientes mejoras: <br>
● Paginación o botón para cargar más Pokémon. <br>
● Filtro por tipo de Pokémon. <br>
● Guardar Pokémon favoritos. <br>
● Pantalla de favoritos. <br>
● Persistencia de favoritos con AsyncStorage. <br>
● Diseño responsive adaptado a distintos tamaños de pantalla. <br>
● Uso de iconos. <br>
● Mejora visual de las tarjetas. <br>
● Diferenciar los Pokémon por colores según su tipo. <br>
● Mostrar estadísticas como ataque, defensa, vida o velocidad. <br>
● Mostrar la cadena evolutiva del Pokémon. <br>

## Tecnologías previstas 📚
- Visual Studio Code
- React Native
- Expo Go
  
>>>>>>> 515ecffe657addf539d8b00f63c924d250ebcc6c
