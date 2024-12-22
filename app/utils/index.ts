export const getPokemonIdByUrl = (url: string) => {
  const parts = url.split('/')
  const id = parts[parts.length - 2]
  return parseInt(id, 10)
}

export const getPokemonImageFromUrl = (url: string) => {
  const id = getPokemonIdByUrl(url)
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
  return imageUrl
}

export const CapitalizeFirstLetter = (text: string) => {
  const firstLetter = text.split('')[0].toUpperCase()
  const rest = text.slice(1)
  const formatted = `${firstLetter}${rest}`
  return formatted
}
