import { IUser } from '../interface/IUser.ts'
import { MongoLib } from '../lib/MongoLib.ts'
import { hashPwd, comparePwd } from '../utils/auth.ts'

export class UserService {
  private collection: string
  private db = new MongoLib()

  constructor() {
    this.collection = 'users'
    this.db = new MongoLib()
  }

  async Login(user: IUser) {
    const [dbUser]: [IUser] = await this.db.getAll(this.collection, { email: user.email })
    const result = comparePwd(user.password, dbUser.password)
    return result
  }

  async Create(user: IUser): Promise<string> {

    if (!user.email.match(/[\w\._]{5,30}\+?[\w]{0,10}@[\w\.\-]{3,}\.\w{2,5}/)) {
      throw new Error('Invalid email')
    }

    const hashedPwd = hashPwd(user.password)
    user.password = hashedPwd
    await this.db.create(this.collection, user)

    return 'User created'
  }
}