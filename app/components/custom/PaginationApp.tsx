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
import { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData, useSearchParams } from '@remix-run/react'
import { getVisiblePages } from '~/utils'

type PaginationAppProps = {
  totalPokemons: number
}

export function PaginationApp({ totalPokemons }: PaginationAppProps) {
  const [searchParams] = useSearchParams()
  const totalPages = Math.ceil(totalPokemons / REQUEST_POKEMON_LIMIT)

  const currentPage = Number(searchParams.get('page')) || 1
  const prePage = Math.max(1, currentPage - 1)
  const nextPage = Math.min(currentPage + 1, totalPages)

  const visiblePages = getVisiblePages(currentPage, totalPages)

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            to={`?page=${prePage}`}
            className={
              currentPage === 1 ? 'pointer-events-none opacity-50' : ''
            }
          />
        </PaginationItem>

        <PaginationItem className='border bg-white shadow-sm rounded-md'>
          <PaginationLink
            to={`?page=1`}
            className={currentPage === 1 ? 'bg-[#ffcb00] text-[#064587]' : ''}
          >
            1
          </PaginationLink>
        </PaginationItem>

        {visiblePages[0] > 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {visiblePages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              to={`?page=${page}`}
              className={
                currentPage === page
                  ? 'bg-[#ffcb00] text-[#064587] hover:bg-[#ffcb00] hover:text-[#064587] '
                  : ''
              }
              isActive
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink
            to={`?page=${totalPages}`}
            className={
              currentPage === totalPages
                ? 'bg-[#ffcb00] text-[#064587]'
                : 'border bg-white shadow-sm rounded-md'
            }
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            to={`?page=${nextPage}`}
            className={
              currentPage === totalPages ? 'pointer-events-none opacity-50' : ''
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
