import { init, MongoClient } from "https://deno.land/x/mongo@v0.6.0/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

await init()

export class MongoLib {
  private client: MongoClient
  private db: any
  private coll: any
  private dbName: any = config().DB_NAME
  private mongoUri: any = config().MONGO_URI

  constructor() {
    this.client = new MongoClient()
    this.db = this.client.database(this.dbName)
  }

  async connect() {
    try {
      await this.client.connectWithUri(this.mongoUri)
    } catch (error) {
      console.log(error)
    }
  }

  async getAll(collection: string, query?: object) {
    try {
      await this.connect()
      this.coll = this.db.collection(collection)
      const result = await this.coll.find(query)
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async get(collection: string, id: string) {
    try {
      await this.connect()
      this.coll = this.db.collection(collection)
      const result = await this.coll.findOne({ _id: { $oid: id } })
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async create(collection: string, data: any) {
    try {
      await this.connect()
      this.coll = this.db.collection(collection)
      const result = await this.coll.insertOne(data)
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async update(collection: string, id: string, data: any) {
    try {
      await this.connect()
      this.coll = this.db.collection(collection)
      const result = await this.coll.updateOne({ _id: { $oid: id } }, { $set: data })
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async delete(collection: string, id: string) {
    try {
      await this.connect()
      this.coll = this.db.collection(collection)
      const result = await this.coll.deleteOne({ _id: { $oid: id } })
      return result
    } catch (error) {
      console.log(error)
    }
  }
}