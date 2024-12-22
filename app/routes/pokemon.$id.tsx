import { LoaderFunction, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Pokemon } from '~/types'
import { getPokemonImageFromUrl } from '~/utils'

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  if (!response.ok) {
    throw new Response('Not Found', { status: 404 })
  }
  const pokemon = await response.json()
  return new Response(JSON.stringify(pokemon), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  })
}

const PokemonDetails = () => {
  const pokemon: any = useLoaderData()
  console.log({ pokemon })

  return (
    <div className='min-h-screen h-full w-screen grid grid-cols-[500px_1fr] bg-gray-100'>
      <div className='col-span-1 z-0'>
        <div className='relative w-[500px]'>
          <img src='/pokedex.png' alt='' className='w-[700px] z-10' />
          <img
            src={pokemon.sprites.front_default}
            alt={`${pokemon.forms[0].name} image`}
            className='size-[110px] absolute top-[32%] left-[17%] z-20'
          />
        </div>
      </div>
      <div className='h-full bg-blue-100'>{pokemon.name}</div>
    </div>
  )
}

export default PokemonDetails
