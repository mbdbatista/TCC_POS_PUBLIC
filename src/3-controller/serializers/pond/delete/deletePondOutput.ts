
import { Pond } from "../../../../1-domain/entities/pond";
import { BaseOutput } from "../../base/baseOutput";

type DeletePondModel = {
  success: boolean
}
export type DeletePondOutput = BaseOutput<DeletePondModel>