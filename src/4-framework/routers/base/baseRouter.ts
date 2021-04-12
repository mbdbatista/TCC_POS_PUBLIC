import { Router } from 'express'
export abstract class BaseRouter {
  protected readonly router: Router
  constructor() {    
    this.router = Router()    
    this.setupRoutes()
  }

  abstract setupRoutes(): void;
}