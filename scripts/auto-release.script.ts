import { executeCommand } from './execute-command.function';
import { gitReleasePush } from './git-release-push';
import { switchToReleaseBranch } from './switch-to-release-branch.function';

(async () => {
  switchToReleaseBranch('auto');

  executeCommand('npm run release');

  const { version } = await import('../package.json');

  gitReleasePush(version);
})();
