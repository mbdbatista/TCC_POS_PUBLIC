import 'reflect-metadata'
import './repositories'
import './services'
import express, { Express } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { UserRouter, AuthenticationRouter, ProfileRouter, FishRouter, PondRouter, FishBreedingRouter } from './routers'
import { ErrorMiddleware } from './middlewares/error.middleware'
import { UserModel } from '../3-controller/serializers/authentication/verifyToken/verifyTokenOutput'
import { Context } from './database/context'
import ReportRouter from './routers/report/reportRouter'
import { FeedingJob } from './jobs/feedingJob'

declare global { 
  namespace Express {
    interface Request {
      user?: UserModel
    }
  }
}

class App { 
  private readonly express: Express

  constructor() {
    dotenv.config()
    this.express = express()
    this.middlewares()
    this.routers()
    this.database()
    this.jobs()
    this.express.use(ErrorMiddleware)
    this.init()
  }

  private middlewares() { 
    this.express.use(express.json())
    this.express.use(cors())
  }

  private routers() { 
    new UserRouter(this.express)
    new AuthenticationRouter(this.express)
    new ProfileRouter(this.express)
    new FishRouter(this.express)
    new PondRouter(this.express)
    new FishBreedingRouter(this.express)
    new ReportRouter(this.express)
  }

  private database() { 
    Context.init()
  }

  private jobs() {
    FeedingJob()
  }

  private init() {
    const PORT = process.env.PORT || 8000
    this.express.listen(PORT)
  }
}

export default new App()