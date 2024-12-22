import { REQUEST_POKEMON_LIMIT } from '~/constant'

export async function getPokemons(limit = REQUEST_POKEMON_LIMIT, offset = 0) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  )
  return response.json()
}
