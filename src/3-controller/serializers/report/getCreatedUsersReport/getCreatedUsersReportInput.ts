import { BaseInput } from "../../base/baseInput";

export class GetCreatedUsersReportInput extends BaseInput {
  year?: number

  constructor(obj: Partial<GetCreatedUsersReportInput>) {
    super()
    Object.assign(this, obj)
  }
}