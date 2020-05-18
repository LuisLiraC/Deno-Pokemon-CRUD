import { Router, Application } from "https://deno.land/x/oak/mod.ts"
import { IUser } from '../interface/IUser.ts'
import { UserService } from "../services/UserService.ts"

const router = new Router()

function authRouter(app: Application) {
  app.use(router.routes())
  const userService = new UserService()

  router.post('/api/sign-in', async ({ request, response }: { request: any, response: any }) => {
    try {
      const body = await request.body()
      const user: IUser = body.value
      const token = await userService.Login(user)
  
      response.body = { token }
      response.status = 200
    } catch (error) {
      response.body = { error: error.message }
      response.status = 401
    }

  })

  router.post('/api/sign-up', async ({ request, response }: { request: any, response: any }) => {
    try {      
      const body = await request.body()

      const user: IUser = body.value
      const token = await userService.Create(user)
  
      response.body = { message: 'User created', token }
      response.status = 201
    } catch (error) {
      response.body = {error: error.message}
      response.status = 400
    }
  })
}

export default authRouter