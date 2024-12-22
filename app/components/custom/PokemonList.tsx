import CardApp from '~/components/custom/CardApp'
import { PaginationApp } from '~/components/custom/PaginationApp'
import { Pokemon, Root } from '~/types'

type PokemonListProps = {
  data: Root
}

const PokemonList = ({ data }: PokemonListProps) => {
  const pokemons = data.results

  return (
    <>
      <div className='p-6 grid grid-cols-10 gap-8'>
        {pokemons.map((pokemon: Pokemon) => (
          <CardApp key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
      <PaginationApp totalPokemons={data.count} />
    </>
  )
}

export default PokemonList
