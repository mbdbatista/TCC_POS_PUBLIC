import { BaseInput } from '../../base/baseInput'
import { IsNotEmpty, IsArray } from 'class-validator'
export class InputCreateProfile extends BaseInput { 
  @IsNotEmpty()
  name!: string
  @IsArray()
  @IsNotEmpty()
  actions!: [
    {
      route: string,
      access: number
    }
  ]

  constructor(obj: Partial<InputCreateProfile>) {
    super()
    Object.assign(this, obj)
  }
}