export class APIResponse {
  constructor(
    public timeRequested: string,
    public callId: number,
    public success: boolean,
    public httpCode: number,
    public message?: string,
    public data?: any,
    public errorDetails?: any,
  ) {}
}
