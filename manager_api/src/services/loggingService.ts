class ProjectLogger {
  logger: Console;

  constructor(logger?: Console) {
    if (logger)
      this.logger = logger
    else 
      this.logger = console;
  }

  logInfo(msg: string) {
    this.logger.info(`INFO: ${msg}`);
  }

  logError(err: string) {
    this.logger.error(`Error: ${JSON.stringify(err)}`);
  }

  logWarning(warn: string) {
    this.logger.warn(`WARN: ${warn}`);
  }
}

export { ProjectLogger };