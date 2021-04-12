import { BaseInput } from "../../base/baseInput";

export class CreateFeedingInput extends BaseInput {
  constructor(obj: Partial<CreateFeedingInput>) {
    super()
    Object.assign(this, obj)
  }
}