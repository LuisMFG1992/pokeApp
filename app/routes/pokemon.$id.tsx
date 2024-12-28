import { LoaderFunction, json } from '@remix-run/node'
import { Link, useLoaderData, useNavigate } from '@remix-run/react'
import RadarChart from '~/components/custom/RadarChart'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Ability, Pokemon, PokemonDetailsType, Stat, Type } from '~/types'
import { CapitalizeFirstLetter, getPokemonImageFromUrl } from '~/utils'

import { IoMdArrowBack } from 'react-icons/io'

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params
  console.log(id)
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  if (!response.ok) {
    throw new Response('Not Found', { status: 404 })
  }
  const data = await response.json()

  const responseInfo = await fetch(data.species.url)
  if (!responseInfo.ok) {
    throw new Response('Not Found', { status: 404 })
  }
  const dataInfo = await responseInfo.json()
  const information = dataInfo.flavor_text_entries[0].flavor_text
    .split('\n')
    .join(' ')
    .replace('""', ' ')
    .replace('\f', ' ')

  const pokemonDetailsFormatted = {
    id: data.id,
    name: CapitalizeFirstLetter(data.name),
    sprite: data.sprites.front_default,
    abilities: data.abilities.map((element: Ability) =>
      CapitalizeFirstLetter(element.ability.name)
    ),
    info: information,
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

  return new Response(JSON.stringify(pokemonDetailsFormatted), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  })
}

const PokemonDetails = () => {
  const pokemon: PokemonDetailsType = useLoaderData()
  const navigate = useNavigate()

  return (
    <div className='h-full w-screen grid grid-cols-3'>
      <Button
        onClick={() => navigate(-1)}
        className='absolute top-10 left-10 bg-[#ffcb00] text-[#064587] hover:bg-[#ffcb00] hover:text-[#064587] hover:brightness-95 font-semibold'
      >
        <IoMdArrowBack />
        Back to pokemon list
      </Button>
      <div className='col-span-1 z-0 flex justify-center flex-col'>
        <div className='relative flex justify-center items-center'>
          <div className='w-[300px] h-[450px] flex'>
            <img src='/pokedex-short.png' alt='' />
          </div>
          <div className='w-[300px] h-[450px] absolute'>
            <img
              src={pokemon.sprite}
              alt={`${pokemon.name} image`}
              className='size-[120px] absolute top-[31.5%] left-[26%] z-20'
            />
          </div>
        </div>
      </div>
      <div className='h-full flex items-center col-span-2'>
        <div className='flex flex-col gap-4 pr-10'>
          <div>
            <label>Info</label>
            <div className='border border-gray-400 rounded-lg p-2 bg-white'>
              {pokemon.info}
            </div>
          </div>
          <div>
            <label>Name</label>
            <div className='border border-gray-400 rounded-lg p-2 bg-white'>
              {pokemon.name}
            </div>
          </div>
          <div className='flex justify-between gap-6'>
            <div className='w-full'>
              <label>Height</label>
              <div className=' border border-gray-400 rounded-lg p-2 bg-white'>
                {pokemon.height} m
              </div>
            </div>
            <div className='w-full'>
              <label>Weight</label>
              <div className='border border-gray-400 rounded-lg p-2 bg-white'>
                {pokemon.weight} kg
              </div>
            </div>
          </div>
          <div>
            <label>Abilities</label>
            <div className=' flex gap-4'>
              {pokemon.abilities.map((element: string, index: number) => (
                <Badge className='p-2 bg-red-700' key={index}>
                  {element}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <p>Types</p>
            <div className=' flex gap-4'>
              {pokemon.types.map((element: string, idx: number) => (
                <Badge className='p-2 bg-red-700' key={idx}>
                  {element}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className='w-[400px]'>
          <RadarChart pokemon={pokemon} />
        </div>
      </div>
    </div>
  )
}

export default PokemonDetails
