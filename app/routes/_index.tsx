import type {
  LoaderFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import CardApp from '~/components/custom/CardApp'
import { PaginationApp } from '~/components/custom/PaginationApp'
import { Button } from '~/components/ui/button'
import { getPokemons } from '~/services'
import { Pokemon, Pokemons } from '~/types'
import { CapitalizeFirstLetter, getPokemonImageFromUrl } from '~/utils'

export const meta: MetaFunction = () => {
  return [
    { title: 'PokeApp' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export const loader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  try {
    const data = await getPokemons()
    console.log(data)
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {}
  return null
}

export default function Index() {
  const data: Pokemons = useLoaderData()
  const pokemons = data.results

  return (
    <main className='min-h-screen h-full w-screen justify-center flex-col bg-gray-100'>
      <div className='p-6 grid grid-cols-10 gap-8'>
        {pokemons.map((pokemon: Pokemon) => (
          <CardApp key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
      <PaginationApp totalPokemons={data.count} />
    </main>
  )
}
