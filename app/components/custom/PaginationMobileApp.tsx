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
import { Link, useLoaderData, useSearchParams } from '@remix-run/react'
import { getVisiblePages } from '~/utils'

import { MdKeyboardDoubleArrowRight } from 'react-icons/md'
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md'

type PaginationAppProps = {
  totalPokemons: number
}

export function PaginationMobileApp({ totalPokemons }: PaginationAppProps) {
  const [searchParams] = useSearchParams()
  const totalPages = Math.ceil(totalPokemons / REQUEST_POKEMON_LIMIT)

  const currentPage = Number(searchParams.get('page')) || 1
  const prePage = Math.max(1, currentPage - 1)
  const nextPage = Math.min(currentPage + 1, totalPages)

  const visiblePages = getVisiblePages(currentPage, totalPages)

  return (
    <Pagination>
      <PaginationContent>
        <Link
          to={`?page=1`}
          className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
        >
          <MdKeyboardDoubleArrowLeft className='size-5' />
        </Link>

        <PaginationItem>
          <PaginationPrevious
            to={`?page=${prePage}`}
            className={
              currentPage === 1 ? 'pointer-events-none opacity-50' : ''
            }
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink to={``} className='pointer-events-none'>
            {currentPage}/{totalPages}
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

        <Link
          to={`?page=${totalPages}`}
          className={
            currentPage === totalPages ? 'pointer-events-none opacity-50' : ''
          }
        >
          <MdKeyboardDoubleArrowRight className='size-5' />
        </Link>
      </PaginationContent>
    </Pagination>
  )
}
