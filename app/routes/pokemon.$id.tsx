import { LoaderFunction, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Pokemon } from '~/types'

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
  const pokemon: Pokemon = useLoaderData() // Datos cargados por el loader

  return (
    <div className='min-h-screen h-full w-screen flex-col flex items-center'>
      <img src='/logo+text.png' alt='logoApp' />
      <p>{pokemon.name}</p>
    </div>
  )
}

export default PokemonDetails
