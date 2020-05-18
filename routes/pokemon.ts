import { Router } from "https://deno.land/x/oak/mod.ts"
import { getPokemonList, addPokemon, updatePokemon, getPokemon, deletePokemon } from '../services/PokemonService.ts'

const router = new Router()

router
  .get('/pokemon', getPokemonList)
  .get('/pokemon/:id', getPokemon)
  .post('/pokemon', addPokemon)
  .put('/pokemon/:id', updatePokemon)
  .delete('/pokemon/:id', deletePokemon)



export default router