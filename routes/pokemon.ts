import { Router, Application } from "https://deno.land/x/oak/mod.ts"
import { PokemonService } from '../services/PokemonService.ts'
import { IPokemon } from '../interface/IPokemon.ts'
import { validateToken } from '../utils/bwt.ts'

const router = new Router()

function pokemonRouter(app: Application) {
  app.use(router.routes())
  const pokemonService = new PokemonService()

  router.get('/api/pokemon',
    validateToken,
    async ({ response }: { response: any }) => {
      const PokemonList = await pokemonService.List()
      response.body = PokemonList
      response.status = 200
    })

  router.get('/api/pokemon/:id',
    validateToken,
    async ({ response, params }: { response: any, params: any }) => {
      const FoundPokemon = await pokemonService.Get(params.id)
      response.body = FoundPokemon
      response.status = 200
    })

  router.post('/api/pokemon',
    validateToken,
    async ({ request, response }: { request: any, response: any }) => {
      const body = await request.body()
      const pokemon: IPokemon = body.value
      const message = await pokemonService.Create(pokemon)
      response.body = { message }
      response.status = 201
    })

  router.put('/api/pokemon/:id',
    validateToken,
    async ({ request, response, params }: { request: any, response: any, params: any }) => {
      const body = await request.body()
      const newPokemonData: IPokemon = body.value
      const message = await pokemonService.Update(params.id, newPokemonData)
      response.body = { message }
      response.status = 200
    })

  router.delete('/api/pokemon/:id',
    validateToken,
    async ({ response, params }: { response: any, params: any }) => {
      const message = await pokemonService.Delete(params.id)
      response.body = { message }
      response.status = 200
    })
}


export default pokemonRouter