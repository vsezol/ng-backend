import { executeCommand } from './execute-command.function';

export function gitReleasePush(version: string): void {
  executeCommand(`git push --set-upstream origin HEAD:release/${version}`);
  executeCommand(`git push --tags`);
}
