import { PokemonList } from '../data/PokemonData.ts'
import { IPokemon } from '../interface/IPokemon.ts'

export class PokemonService {

  List(): Array<IPokemon> {
    return PokemonList
  }

  Get(id: number): IPokemon {
    const foundPokemon: IPokemon = PokemonList.filter(p => p.id === id)[0]
    return foundPokemon
  }

  Create(pokemon: IPokemon): string {
    PokemonList.push(pokemon)
    return 'Pokemon added successfully'
  }

  Update(id: number, data: IPokemon): string {
    const foundPokemon: IPokemon = PokemonList.filter(p => p.id == id)[0]
    foundPokemon.name = data.name
    foundPokemon.types = data.types
    return 'Pokemon updated successfully'
  }

  Delete(id: number): string {
    const index =  PokemonList.findIndex(p => p.id == id)
    PokemonList.splice(index, 1)
    return 'Pokemon deleted successfully'
  }
}