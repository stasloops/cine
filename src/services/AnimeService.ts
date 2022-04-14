import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (limit) => ({
        url: '/posts',
        params: {
            _limit: limit
        }
      })
    }),
  }),
})

export const { useGetPokemonByNameQuery } = pokemonApi