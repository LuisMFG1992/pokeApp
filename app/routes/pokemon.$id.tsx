import { LoaderFunction, json } from '@remix-run/node'
import { Link, useLoaderData, useNavigate } from '@remix-run/react'
import RadarChart from '~/components/custom/RadarChart'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Ability, Pokemon, PokemonDetailsType, Stat, Type } from '~/types'
import {
  CapitalizeFirstLetter,
  getPokemonImageFromUrl,
  getPokemonImageFromUrlSprite,
} from '~/utils'

import { IoMdArrowBack } from 'react-icons/io'
import { useEffect, useState } from 'react'

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params
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
    order: data.order,
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
  const [imageUrl, setImageUrl] = useState('/unknown.png')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadImage = async () => {
      const url = await getPokemonImageFromUrlSprite(pokemon.sprite)
      setImageUrl(url)
      setIsLoading(false)
    }

    loadImage()
  }, [])

  return (
    <div className='min-h-screen w-screen grid grid-cols-1 lg:grid-cols-3'>
      <Button
        onClick={() => navigate(-1)}
        className='absolute top-10 left-2 md:left-10 bg-[#ffcb00] text-[#064587] hover:bg-[#ffcb00] hover:text-[#064587] hover:brightness-95 font-semibold'
      >
        <IoMdArrowBack />
        <span className='hidden md:block'>Back to pokemon list</span>
      </Button>
      <div className='col-span-1 z-0 flex justify-center flex-col'>
        <div className='relative flex justify-center items-center'>
          <div className='w-[300px] h-[450px] flex'>
            <img src='/pokedex-short.png' alt='' />
          </div>
          <div className='w-[300px] h-[450px] absolute'>
            <img
              src={imageUrl}
              alt={`${pokemon.name} image`}
              className='size-[120px] absolute top-[31.5%] left-[26%] z-20'
            />
          </div>
        </div>
      </div>
      <div className='h-full flex items-center col-span-1 lg:col-span-2 flex-col lg:flex-row'>
        <div className='flex flex-col gap-4 p-3 lg:pr-10'>
          <div>
            <p></p>
            <label>Number</label>
            <div className='border border-gray-400 rounded-lg p-2 bg-white'>
              {pokemon.order}
            </div>
          </div>
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
                <Badge
                  className='p-2 bg-red-700 hover:bg-[#ffcb00] hover:text-[#064587]'
                  key={index}
                >
                  {element}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <p>Types</p>
            <div className=' flex gap-4'>
              {pokemon.types.map((element: string, idx: number) => (
                <Badge
                  className='p-2 bg-red-700 hover:bg-[#ffcb00] hover:text-[#064587]'
                  key={idx}
                >
                  {element}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className='w-[250px] sm:w-[350px] lg:w-[400px]'>
          <RadarChart pokemon={pokemon} />
        </div>
      </div>
    </div>
  )
}

export default PokemonDetails
