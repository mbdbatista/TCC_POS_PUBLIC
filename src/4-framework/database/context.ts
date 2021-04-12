import mongoose from 'mongoose'
import { Migrate } from './migrations/migrate'
export class Context { 
  static async init() {
    
    const options = { 
      host: process.env.MONGO_HOST,
      name: process.env.MONGO_DATABASE,
      username: process.env.MONGO_USERNAME,
      password: process.env.MONGO_PASSWORD     
    }
    try {
      const url = `mongodb+srv://${options.username}:${options.password}@${options.host}/${options.name}`
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useFindAndModify: false
      }) 
      await Migrate.executeMigration()
    } catch (error) {
      console.log(`Falha ao inicializar o banco de dados::${error}`)
    }       
  }
}