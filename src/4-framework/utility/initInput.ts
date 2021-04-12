import { NextFunction, Request } from "express"
import { BaseInput } from "../../3-controller/serializers/base/baseInput"
import { Newable } from "./newableType"
import { NormalizeRequest } from "./normalizeRequest"

export function InitInput<T extends BaseInput>(type: Newable<T>, req: Request) {
  const data = NormalizeRequest(req)
  const input = new type(data)
  if (input.isValid()) {
    return input
  }

  throw input.errors
}