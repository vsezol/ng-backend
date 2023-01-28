import { executeCommand } from './execute-command.function';

export const getCurrentPackageVersion = (): string =>
  executeCommand(`npm pkg get version | tr -d '"'`);
