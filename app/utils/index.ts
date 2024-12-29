import { Pokemons } from '~/types'

export const getPokemonIdByUrl = (url: string) => {
  const parts = url.split('/')
  const id = parts[parts.length - 2]
  return parseInt(id, 10)
}

export const getPokemonImageFromUrl = async (url: string): Promise<string> => {
  const id = getPokemonIdByUrl(url)
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

  try {
    const res = await fetch(imageUrl)
    if (res.ok) {
      return imageUrl
    } else {
      return '/unknown.png'
    }
  } catch (error) {
    console.error('Error fetching image:', error)
    return '/unknown.png'
  }
}

export const getPokemonIdByUrlSprite = (url: string) => {
  const lastSlashIndex = url.lastIndexOf('/')
  const lastDotIndex = url.lastIndexOf('.')

  return url.substring(lastSlashIndex + 1, lastDotIndex)
}

export const getPokemonImageFromUrlSprite = async (
  url: string
): Promise<string> => {
  const id = getPokemonIdByUrlSprite(url)
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

  try {
    const res = await fetch(imageUrl)
    if (res.ok) {
      return imageUrl
    } else {
      return '/unknown.png'
    }
  } catch (error) {
    console.error('Error fetching image:', error)
    return '/unknown.png'
  }
}

export const CapitalizeFirstLetter = (text: string) => {
  const firstLetter = text.split('')[0].toUpperCase()
  const rest = text.slice(1)
  const formatted = `${firstLetter}${rest}`
  return formatted
}

export function getVisiblePages(currentPage: number, totalPages: number) {
  const visiblePages = []

  let start = Math.max(2, currentPage - 2)
  let end = Math.min(totalPages - 1, currentPage + 2)

  if (currentPage <= 3) {
    start = 2
    end = Math.min(totalPages - 1, 5)
  }

  if (currentPage >= totalPages - 2) {
    start = Math.max(2, totalPages - 4)
    end = totalPages - 1
  }

  for (let i = start; i <= end; i++) {
    visiblePages.push(i)
  }

  return visiblePages
}

export async function isImage(url: string) {
  try {
    const response = await fetch(url, { method: 'HEAD' })
    const contentType = response.headers.get('Content-Type')

    return contentType && contentType.startsWith('image/')
  } catch (error) {
    console.error('Error: ', error)
    return false
  }
}

export const getFilteredPokemonsByName = (
  pokemons: Pokemons,
  searchText: string | null
): Pokemons => {
  const pokemonList = pokemons.results

  if (!searchText || searchText.trim() === '') {
    return pokemons
  }

  const normalizedSearchText = searchText.trim().toLowerCase()

  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().startsWith(normalizedSearchText)
  )

  return { ...pokemons, results: filteredPokemonList }
}
