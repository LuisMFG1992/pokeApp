export type Pokemon = {
  name: string
  url: string
}

export type Root = {
  count: number
  next: string
  previous: any
  results: Pokemon[]
}
