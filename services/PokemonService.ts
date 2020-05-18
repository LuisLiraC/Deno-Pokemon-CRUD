import { IPokemon } from '../interface/IPokemon.ts'
import { MongoLib } from '../lib/MongoLib.ts'

export class PokemonService {
  private collection: string
  private db: MongoLib

  constructor() {
    this.collection = 'pokemon'
    this.db = new MongoLib()
  }

  async List(): Promise<Array<IPokemon> | []> {
    const pokemonList = await this.db.getAll(this.collection)
    return pokemonList || []
  }

  async Get(id: string): Promise<IPokemon | {}> {
    const pokemon = await this.db.get(this.collection, id)
    return pokemon || {}
  }

  async Create(pokemon: IPokemon): Promise<{}> {
    const createdPokemon = await this.db.create(this.collection, pokemon)
    return createdPokemon || {}
  }

  async Update(id: string, data: IPokemon): Promise<{}> {
    const updatedPokemon = await this.db.update(this.collection, id, data)
    return updatedPokemon || {}
  }

  async Delete(id: string): Promise<{}> {
    const deletedPokemon = await this.db.delete(this.collection, id)
    return deletedPokemon
  }
}