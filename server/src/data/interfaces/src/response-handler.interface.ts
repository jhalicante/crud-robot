export interface IResponseHandlerData {
  timeRequested: string;
  callId: number;
  success: boolean;
  httpCode?: number;
  message?: string;
  data?: any;
  errorDetails?: any;
}

export interface IResponseHandlerParams {
  success: boolean;
  httpCode?: number;
  message?: string;
  field?: string;
  data?: any;
  errorDetails?: any;
}
