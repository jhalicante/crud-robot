import { IResponseHandlerData, IResponseHandlerParams } from '../../interfaces/src/response-handler.interface';

export const ResponseHandlerService = (params: IResponseHandlerParams) => {
  const res: IResponseHandlerData = {
    timeRequested: new Date().toUTCString(),
    callId: Date.now(),
    ...params,
  };

  return res;
};
