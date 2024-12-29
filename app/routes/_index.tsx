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
import { useState, useEffect } from 'react'
import CardApp from '~/components/custom/CardApp'
import { PaginationApp } from '~/components/custom/PaginationApp'
import { PaginationMobileApp } from '~/components/custom/PaginationMobileApp'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { REQUEST_POKEMON_LIMIT } from '~/constant'
import useResize from '~/hooks/useResize'
import { getPokemons } from '~/services'
import { MainRequest, Pokemon, Pokemons } from '~/types'
import { getFilteredPokemonsByName } from '~/utils'

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
  const search = url.searchParams.get('search')

  if (!page) {
    url.searchParams.set('page', '1')
    return redirect(url.toString())
  }

  const offset = page * REQUEST_POKEMON_LIMIT - REQUEST_POKEMON_LIMIT

  try {
    const fullPokemonList = await getPokemons(100000, 0)
    const limitedPokemonList = await getPokemons(REQUEST_POKEMON_LIMIT, offset)
    return new Response(
      JSON.stringify({
        data: limitedPokemonList,
        fullPokemonList: fullPokemonList,
        search: search,
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {}
  return null
}

export default function Index() {
  const fullData: MainRequest = useLoaderData()
  const { data, fullPokemonList, search } = fullData

  const size = useResize()
  const [searchParams] = useSearchParams()

  const [pokemonCount, setPokemonCount] = useState<number>(0)
  const [pokemons, setPokemons] = useState<Pokemon[]>(data.results)

  const currentPage = Number(searchParams.get('page'))
  const searchText = searchParams.get('search')

  useEffect(() => {
    setPokemonCount(data.count)
  }, [data])

  useEffect(() => {
    if (searchText) {
      const filtered = getFilteredPokemonsByName(fullPokemonList, searchText)
      setPokemonCount(filtered.results.length)
      setPokemons(
        filtered.results.splice(
          (currentPage - 1) * REQUEST_POKEMON_LIMIT,
          currentPage * REQUEST_POKEMON_LIMIT
        )
      )
    } else {
      setPokemons(data.results)
    }
  }, [searchText, fullPokemonList, currentPage])

  return (
    <main className='h-full w-full py-4 flex-col flex gap-4 justify-between'>
      <Form className='flex justify-center gap-2 px-2'>
        <Input
          type='text'
          placeholder='Search by name...'
          className='w-full max-w-72'
          name='search'
          defaultValue={search || ''}
        />
        <Button
          type='submit'
          className='bg-[#ffcb00] text-[#064587] font-semibold hover:bg-[#ffcb00] hover:text-[#064587] hover:brightness-95'
        >
          Search
        </Button>
      </Form>

      {size[0] <= 500 && <PaginationMobileApp totalPokemons={pokemonCount} />}

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

      {size[0] <= 500 ? (
        <PaginationMobileApp totalPokemons={pokemonCount} />
      ) : (
        <PaginationApp totalPokemons={pokemonCount} />
      )}
    </main>
  )
}
