import React, { useEffect, useState } from 'react'
import { Form } from '@remix-run/react'
import { Pokemon } from '~/types'
import {
  CapitalizeFirstLetter,
  getPokemonIdByUrl,
  getPokemonImageFromUrl,
} from '~/utils'
import { Skeleton } from '../ui/skeleton'

type pokemonProps = {
  pokemon: Pokemon
  pokeIndex: number
}

const CardApp = ({ pokemon, pokeIndex }: pokemonProps) => {
  const [imageUrl, setImageUrl] = useState('/unknown.png')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadImage = async () => {
      const url = await getPokemonImageFromUrl(pokemon.url)
      setImageUrl(url)
      setIsLoading(false)
    }

    loadImage()
  }, [pokemon.url])

  const id = getPokemonIdByUrl(pokemon.url)

  return (
    <>
      {isLoading ? (
        <Skeleton className='h-[165px] w-[150px] rounded-lg' />
      ) : (
        <Form action={`/pokemon/${id}`} key={pokemon.name}>
          <button type='submit'>
            <div className='shadow-md p-2 w-36 flex flex-col items-center rounded-xl relative hover:scale-110 hover:brightness-90 transition-all ease-out'>
              <img
                src={imageUrl}
                alt={`${pokemon.name} image`}
                className='size-32'
              />
              <p className='overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1]'>
                {CapitalizeFirstLetter(pokemon.name)}
              </p>
            </div>
          </button>
        </Form>
      )}
    </>
  )
}

export default CardApp
