import { CommonExecOptions, execSync } from 'child_process';

const DEFAULT_OPTIONS: CommonExecOptions = {
  stdio: `inherit`,
  encoding: `utf8`,
};

export const executeCommand = (
  command: string,
  options?: CommonExecOptions
): string =>
  execSync(command, options ?? DEFAULT_OPTIONS)
    ?.toString()
    .trim();
