import { ValidationError, Validator } from "class-validator";
import { UserModel } from "../authentication/verifyToken/verifyTokenOutput";

export class BaseInput extends Validator {
  errors: ValidationError[] = []
  user?: UserModel
  isValid(): boolean {
    const result = this.validateSync(this)
    this.errors = result
    return this.errors.length === 0
  }
}
