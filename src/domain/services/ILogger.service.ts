export interface ILoggerService {
  logInfo(info: string): void;
  logWarn(warn: string): void;
  logError(error: string): void;
  logHttp(http: string): void;
  logDebug(debug: string): void;
}
