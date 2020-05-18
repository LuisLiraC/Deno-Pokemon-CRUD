import { IUser } from '../interface/IUser.ts'
import { MongoLib } from '../lib/MongoLib.ts'
import { hashPwd, comparePwd } from '../utils/auth.ts'
import { sign } from '../utils/bwt.ts'

export class UserService {
  private collection: string
  private db = new MongoLib()

  constructor() {
    this.collection = 'users'
    this.db = new MongoLib()
  }

  async Login(user: IUser) {
    const [dbUser]: [IUser] = await this.db.getAll(this.collection, { email: user.email })

    if (!dbUser) {
      throw new Error('Invalid credentials')
    }

    const result = comparePwd(user.password, dbUser.password)

    if (!result) {
      throw new Error('Invalid credentials')
    }

    const token = await this.GetToken(user.email)
    return token
  }

  async Create(user: IUser): Promise<string> {

    if (!user.email.match(/[\w\._]{5,30}\+?[\w]{0,10}@[\w\.\-]{3,}\.\w{2,5}/)) {
      throw new Error('Invalid email')
    }

    const hashedPwd = hashPwd(user.password)
    user.password = hashedPwd
    await this.db.create(this.collection, user)

    const token = await this.GetToken(user.email)
    return token
  }

  private async GetToken(email: string) {
    const token = sign(email)
    return token
  }
}