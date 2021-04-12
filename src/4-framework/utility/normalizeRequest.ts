import { Request } from 'express'

export const NormalizeRequest = (req: Request): {} => {
  let queryStringParams = {}
  if (req.query) {
    queryStringParams = req.query || {}
  }

  let pathParams = {}
  if (req.params) {
    pathParams = req.params || {}
  }

  let bodyParams = {}
  if (req.body) {
    bodyParams = req.body || {}
  }
  
  let user = {}
  if (req.user) {
    user = req.user
  }

  return {
    ...queryStringParams,
    ...pathParams,
    ...bodyParams,
    user
  }
}