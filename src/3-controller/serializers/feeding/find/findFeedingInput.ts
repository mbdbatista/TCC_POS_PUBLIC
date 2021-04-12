import { BaseInput } from "../../base/baseInput";

export class FindFeedingInput extends BaseInput {
  constructor(obj: Partial<FindFeedingInput>) {
    super()
    Object.assign(this, obj)
  }
}