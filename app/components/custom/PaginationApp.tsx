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

  const createPaginationLink = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('page', String(page))
    return `?${newSearchParams.toString()}`
  }
  createPaginationLink(1)

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            to={createPaginationLink(prePage)}
            className={
              currentPage === 1 ? 'pointer-events-none opacity-50' : ''
            }
          />
        </PaginationItem>

        <PaginationItem className='border bg-white shadow-sm rounded-md'>
          <PaginationLink
            to={createPaginationLink(1)}
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
              to={createPaginationLink(page)}
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
            to={createPaginationLink(totalPages)}
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
            to={createPaginationLink(nextPage)}
            className={
              currentPage === totalPages ? 'pointer-events-none opacity-50' : ''
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
