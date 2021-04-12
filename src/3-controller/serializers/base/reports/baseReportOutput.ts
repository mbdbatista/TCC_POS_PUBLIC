export interface BaseReportOutput {
  data: ReportModel[]
}

export interface ReportModel {
  title: string
  value: any
}