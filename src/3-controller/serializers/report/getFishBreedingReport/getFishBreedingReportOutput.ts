import { ReportModel } from "../../base/reports/baseReportOutput";

export type GetFishBreedingReportOutput = {
  fishBreedingStarted: ReportModel[]
  fishBreedingFinished: ReportModel[]
}