import { Application } from "https://deno.land/x/oak/mod.ts"
import router from './routes/pokemon.ts'

const app = new Application()
const PORT = 3001

app.use(router.routes())
app.use(router.allowedMethods())

await app.listen({ port: PORT })
console.log(`http://localhost:${PORT}/pokemon`)
