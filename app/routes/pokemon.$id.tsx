import { LoaderFunction, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Pokemon } from '~/types'
import { CapitalizeFirstLetter, getPokemonImageFromUrl } from '~/utils'

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  if (!response.ok) {
    throw new Response('Not Found', { status: 404 })
  }
  const data = await response.json()

  const pokemonDetailsFormatted = {
    id: data.id,
    name: CapitalizeFirstLetter(data.name),
    sprite: data.sprites.front_default,
    abilities: data.abilities.map((element: Ability) =>
      CapitalizeFirstLetter(element.ability.name)
    ),
    height: data.height / 10,
    weight: data.weight / 10,
    stats: data.stats.map(
      (element: Stat) =>
        `${CapitalizeFirstLetter(element.stat.name)}: ${element.base_stat}`
    ),
    types: data.types.map((element: Type) =>
      CapitalizeFirstLetter(element.type.name)
    ),
  }

  return new Response(JSON.stringify(pokemonDetailsFormatted), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  })
}

type Ability = {
  ability: {
    name: string
    url: string
  }
  is_hidden: boolean
  slot: number
}

type Stat = {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}

type Type = {
  slot: number
  type: {
    name: string
    url: string
  }
}

type PokemonDetailsType = {
  id: number
  name: string
  sprite: string
  abilities: string[]
  height: number
  weight: number
  stats: string[]
  types: string[]
}

const PokemonDetails = () => {
  const pokemon: PokemonDetailsType = useLoaderData()

  return (
    <div className='min-h-screen h-full w-screen grid grid-cols-[500px_1fr]'>
      <div className='col-span-1 z-0'>
        {/* <div className='relative w-[500px]'> */}
        {/* <img src='/pokedex.png' alt='' className='w-[700px] z-10' /> */}
        <div className='relative flex justify-center items-center'>
          <div className='w-[300px] h-[450px] flex'>
            <img src='/pokedex-short.png' alt='' />
          </div>
          <div className='w-[300px] h-[450px] absolute'>
            <img
              src={pokemon.sprite}
              alt={`${pokemon.name} image`}
              className='size-[130px] absolute top-[30%] left-[26%] z-20'
            />
          </div>
        </div>
      </div>
      <div className='h-full bg-blue-100'>
        <p>Number: {pokemon.id}</p>
        <p>Name: {pokemon.name}</p>
        <p>Height: {pokemon.height} m</p>
        <p>Weight: {pokemon.weight} kg</p>
        <div>
          <p>Abilities:</p>
          {pokemon.abilities.map((element: string, index: number) => (
            <p key={index}>{element}</p>
          ))}
        </div>
        <p>Stats:</p>
        {pokemon.stats.map((element: string, idx: number) => (
          <p key={idx}>{element}</p>
        ))}

        <p>Types:</p>
        {pokemon.types.map((element: string, idx: number) => (
          <p key={idx}>{element}</p>
        ))}
      </div>
    </div>
  )
}

export default PokemonDetails
