import type {
  LoaderFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node'
import {
  Form,
  redirect,
  useLoaderData,
  useSearchParams,
} from '@remix-run/react'
import CardApp from '~/components/custom/CardApp'
import { PaginationApp } from '~/components/custom/PaginationApp'
import { PaginationMobileApp } from '~/components/custom/PaginationMobileApp'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { REQUEST_POKEMON_LIMIT } from '~/constant'
import useResize from '~/hooks/useResize'
import { getPokemons } from '~/services'
import { Pokemon, Pokemons } from '~/types'

export const meta: MetaFunction = () => {
  return [
    { title: 'PokeApp' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const page = Number(url.searchParams.get('page'))

  if (!page) {
    url.searchParams.set('page', '1')
    return redirect(url.toString())
  }

  const offset = page * REQUEST_POKEMON_LIMIT - REQUEST_POKEMON_LIMIT

  try {
    const data = await getPokemons(REQUEST_POKEMON_LIMIT, offset)
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

  const [searchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page'))
  const size = useResize()

  // TODO: Arreglar la altura del contenedor cuando h > screen
  return (
    <main className='h-full w-full py-4 flex-col flex gap-4 justify-between'>
      <div className='flex flex-col gap-3'>
        <Form className='flex justify-center gap-2 px-2'>
          <Input
            type='text'
            placeholder='Choose your pokemon...'
            className='w-full max-w-72'
            name='search'
          />
          <Button
            type='submit'
            className='bg-[#ffcb00] text-[#064587] font-semibold'
          >
            Search
          </Button>
        </Form>
        {size[0] <= 800 && <PaginationMobileApp totalPokemons={data.count} />}
        <div className='p-2 grid grid-cols-2 sx:grid-cols-3 sm:grid-cols-4 place-items-center md:grid-cols-5 xl:grid-cols-8 xxl:grid-cols-10 gap-4'>
          {pokemons.map((pokemon: Pokemon, index: number) => {
            let multiplier = (currentPage - 1) * REQUEST_POKEMON_LIMIT
            let pokeIndex = index + 1 + multiplier

            return (
              <CardApp
                key={pokemon.name}
                pokemon={pokemon}
                pokeIndex={pokeIndex}
              />
            )
          })}
        </div>
      </div>

      {size[0] <= 800 ? (
        <PaginationMobileApp totalPokemons={data.count} />
      ) : (
        <PaginationApp totalPokemons={data.count} />
      )}
    </main>
  )
}
