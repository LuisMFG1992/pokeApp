export async function getPokemons(limit = 40, offset = 0) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  )
  return response.json()
}
