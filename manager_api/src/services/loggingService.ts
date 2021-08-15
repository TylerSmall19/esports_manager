class ProjectLogger {
  logger: Console;

  constructor(logger?: Console) {
    if (logger)
      this.logger = logger
    else 
      this.logger = console;
  }

  logInfo(msg: any, system : string = 'unspecified') {
    this.logger.info(`INFO: SYSTEM: ${system} `, msg);
  }

  logError(err: any, system : string = 'unspecified') {
    this.logger.error(`Error: SYSTEM: ${system}`, err);
  }

  logWarning(warn: any, system : string = 'unspecified') {
    this.logger.warn(`WARN: SYSTEM: ${system}`, warn);
  }
}

export { ProjectLogger };