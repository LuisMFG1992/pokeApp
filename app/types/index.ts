export type Pokemon = {
  name: string
  url: string
}

export type Pokemons = {
  count: number
  next: string
  previous: any
  results: Pokemon[]
}

export type Ability = {
  ability: {
    name: string
    url: string
  }
  is_hidden: boolean
  slot: number
}

export type Stat = {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}

export type Type = {
  slot: number
  type: {
    name: string
    url: string
  }
}

export type PokemonDetailsType = {
  id: number
  name: string
  info: string
  sprite: string
  abilities: string[]
  height: number
  weight: number
  stats: string[]
  types: string[]
}
