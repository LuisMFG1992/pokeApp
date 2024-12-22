import type { MetaFunction } from '@remix-run/node'
import { Button } from '~/components/ui/button'

export const meta: MetaFunction = () => {
  return [
    { title: 'PokeApp' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export default function Index() {
  return (
    <main className='h-screen w-screen justify-center'>
      <div className='flex justify-center'>
        <img src='/logo+text.png' alt='logoApp' />
      </div>
    </main>
  )
}
