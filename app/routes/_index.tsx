import type {
  LoaderFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import CardApp from '~/components/custom/CardApp'
import { Button } from '~/components/ui/button'
import { getPokemons } from '~/services'
import { Pokemon } from '~/types'
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
    console.log(data.results)
    return new Response(JSON.stringify(data.results), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {}
  return null
}

export default function Index() {
  const pokemons: Pokemon[] = useLoaderData()

  console.log(getPokemonImageFromUrl(pokemons[0].url))
  return (
    <main className='min-h-screen h-full w-screen justify-center flex-col bg-gray-100'>
      <div className='flex justify-center'>
        <img src='/logo+text.png' alt='logoApp' />
      </div>
      <div className='p-6 grid grid-cols-10 gap-8'>
        {pokemons.map((pokemon: Pokemon) => (
          <CardApp pokemon={pokemon} />
        ))}
      </div>
    </main>
  )
}
