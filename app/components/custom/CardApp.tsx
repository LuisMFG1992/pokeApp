import { Form } from '@remix-run/react'
import { Pokemon } from '~/types'
import {
  CapitalizeFirstLetter,
  getPokemonIdByUrl,
  getPokemonImageFromUrl,
} from '~/utils'

type pokemonProps = {
  pokemon: Pokemon
}

const CardApp = ({ pokemon }: pokemonProps) => {
  const id = getPokemonIdByUrl(pokemon.url)

  return (
    <Form
      action={`/pokemon/${id}`}
      key={pokemon.name}
      className='shadow-md p-2 w-40 flex flex-col items-center rounded-xl relative hover:scale-110 hover:brightness-90 transition-all ease-out'
    >
      <button type='submit'>
        <div className='absolute left-2 top-2 bg-[#ffcb00] rounded-full px-2 text-[0.7rem] text-[#064587] font-bold'>
          {id}
        </div>
        <img
          src={getPokemonImageFromUrl(pokemon.url)}
          alt={pokemon.name + 'image'}
        />
        <p>{CapitalizeFirstLetter(pokemon.name)}</p>
      </button>
    </Form>
  )
}

export default CardApp
