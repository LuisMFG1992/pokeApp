import { LoaderFunction, json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import RadarChart from '~/components/custom/RadarChart'
import { Button } from '~/components/ui/button'
import { Ability, Pokemon, PokemonDetailsType, Stat, Type } from '~/types'
import { CapitalizeFirstLetter, getPokemonImageFromUrl } from '~/utils'

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  if (!response.ok) {
    throw new Response('Not Found', { status: 404 })
  }
  const data = await response.json()

  // TODO: Sacar la historia de aqui https://pokeapi.co/api/v2/pokemon-species/${id}/
  // TODO: Y ponerla en info

  const pokemonDetailsFormatted = {
    id: data.id,
    name: CapitalizeFirstLetter(data.name),
    sprite: data.sprites.front_default,
    abilities: data.abilities.map((element: Ability) =>
      CapitalizeFirstLetter(element.ability.name)
    ),
    info: data.flavor_text_entries,
    height: data.height / 10,
    weight: data.weight / 10,
    stats: data.stats.map((element: Stat) => [
      CapitalizeFirstLetter(element.stat.name),
      element.base_stat,
    ]),
    types: data.types.map((element: Type) =>
      CapitalizeFirstLetter(element.type.name)
    ),
  }

  console.log(pokemonDetailsFormatted)

  return new Response(JSON.stringify(pokemonDetailsFormatted), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  })
}

const PokemonDetails = () => {
  const pokemon: PokemonDetailsType = useLoaderData()

  return (
    <div className='h-full w-screen grid grid-cols-3'>
      <div className='col-span-1 z-0 flex justify-center flex-col'>
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
      <div className='h-full  flex justify-evenly items-center col-span-2'>
        <div className='flex flex-col gap-4 bg-blue-100'>
          <Link to={'/'}>
            <Button>Back to Pokemons list</Button>
          </Link>
          <p>Number: {pokemon.id}</p>
          <p>Name: {pokemon.name}</p>
          <p>Height: {pokemon.height} m</p>
          <p>Weight: {pokemon.weight} kg</p>
          <div>
            <p>Abilities:</p>
            <div className=' flex gap-4'>
              {pokemon.abilities.map((element: string, index: number) => (
                <p key={index}>{element}</p>
              ))}
            </div>
          </div>
          <div>
            <p>Stats:</p>
            <div className=' flex gap-4'>
              {pokemon.stats.map(([name, value], idx) => (
                <p key={idx}>
                  {name}: {value}
                </p>
              ))}
            </div>
          </div>

          <div>
            <p>Types:</p>
            <div className=' flex gap-4'>
              {pokemon.types.map((element: string, idx: number) => (
                <p key={idx}>{element}</p>
              ))}
            </div>
          </div>
        </div>
        <div className='w-96 '>
          <RadarChart pokemon={pokemon} />
        </div>
      </div>
    </div>
  )
}

export default PokemonDetails
