import { IsArray, IsNotEmpty } from "class-validator"
import { BaseInput } from "../../base/baseInput"

export class InputUpdateProfile extends BaseInput {
  @IsNotEmpty()
  id!: string
  @IsNotEmpty()
  name!: string
  @IsArray()
  actions!: [
    {
      route: string,
      access: number
    }
  ]
  @IsNotEmpty()
  active!: boolean

  constructor(obj: Partial<InputUpdateProfile>){
    super()
    Object.assign(this, obj)
  }
}