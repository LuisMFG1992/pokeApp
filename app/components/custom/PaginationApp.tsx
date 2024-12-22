import { REQUEST_POKEMON_LIMIT } from '~/constant'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination'

type PaginationAppProps = {
  totalPokemons: number
}

export function PaginationApp({ totalPokemons }: PaginationAppProps) {
  const totalPages = Math.floor(totalPokemons / REQUEST_POKEMON_LIMIT)

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious to='#' />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            to='#'
            isActive
            className='bg-[#ffcb00] text-[#064587]'
          >
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink to='#'>2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink to='#'>3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink to='#'>{totalPages}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext to='#' />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
