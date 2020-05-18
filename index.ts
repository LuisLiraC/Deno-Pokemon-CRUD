import { Application } from "https://deno.land/x/oak/mod.ts"
import pokemonRouter from './routes/pokemon.ts'
import authRouter from './routes/auth.ts'

const app = new Application()
const PORT = 3001

authRouter(app)
pokemonRouter(app)

await app.listen({ port: PORT })
console.log(`http://localhost:${PORT}/pokemon`)
