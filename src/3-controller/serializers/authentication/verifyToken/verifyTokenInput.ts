import { IsNotEmpty } from 'class-validator'
import { BaseInput } from '../../base/baseInput'

export class VerifyTokenInput extends BaseInput {
  @IsNotEmpty()
  token!: string

  constructor(obj: Partial<VerifyTokenInput>) {
    super()
    Object.assign(this, obj)
  }
}