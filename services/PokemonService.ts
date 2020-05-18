import { PokemonList } from '../data/PokemonData.ts'
import { IPokemon } from '../interface/IPokemon.ts'

export const getPokemonList = ({ response }: { response: any }) => {
  response.body = PokemonList
  response.status = 200
}

export const getPokemon = ({ response, params }: { response: any, params: any }) => {
  const foundPokemon: IPokemon = PokemonList.filter(p => p.id == params.id)[0]
  response.body = foundPokemon
  response.status = 200
}

export const addPokemon = async ({ request, response }: { request: any, response: any }) => {
  const body = await request.body()
  const pokemon: IPokemon = body.value
  PokemonList.push(pokemon)
  response.body = { pokemonAdded: 'Pokemon added' }
  response.status = 201
}

export const updatePokemon = async ({ request, response, params }: { request: any, response: any, params: any }) => {
  const body = await request.body()
  const newPokemonData: IPokemon = body.value
  const foundPokemon: IPokemon = PokemonList.filter(p => p.id == params.id)[0]

  foundPokemon.name = newPokemonData.name
  foundPokemon.types = newPokemonData.types

  response.body = { pokemonUpdated: 'Pokemon updated' }
  response.status = 200
}

export const deletePokemon = ({ response, params }: { response: any, params: any }) => {
  const index =  PokemonList.findIndex(p => p.id == params.id)
  PokemonList.splice(index, 1)

  response.body = { pokemonDeleted: 'Pokemon deleted' }
  response.status = 200
}