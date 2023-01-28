import { executeCommand } from './execute-command.function';

export function switchToReleaseBranch(name: string): void {
  executeCommand(`git checkout main`);
  executeCommand(`git pull`);
  executeCommand(`git checkout -B release/${name}`);
}
