import type {
  LoaderFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import CardApp from '~/components/custom/CardApp'
import { PaginationApp } from '~/components/custom/PaginationApp'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { getPokemons } from '~/services'
import { Pokemon, Pokemons } from '~/types'

export const meta: MetaFunction = () => {
  return [
    { title: 'PokeApp' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export const loader: LoaderFunction = async ({
  params,
  request,
}: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const search = url.searchParams.get('search')

  console.log('search param: ', search)
  try {
    const data = await getPokemons()
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
    <main className='h-full  w-screen gap-4 justify-between py-4 flex-col flex'>
      <Form className='flex justify-center gap-2'>
        <Input
          type='text'
          placeholder='Choose your pokemon...'
          className='w-72'
          name='search'
        />
        <Button
          type='submit'
          className='bg-[#ffcb00] text-[#064587] font-semibold'
        >
          Search
        </Button>
      </Form>
      <div className='p-6 grid grid-cols-10 gap-12'>
        {pokemons.map((pokemon: Pokemon) => (
          <CardApp key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
      <PaginationApp totalPokemons={data.count} />
    </main>
  )
}
