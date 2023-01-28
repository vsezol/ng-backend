import { version } from '../package.json';
import { bumpVersion } from './bump-version.function';
import { getArgumentValue } from './get-argument-value.function';
import { gitReleasePush } from './git-release-push';
import { ReleaseMode } from './release-mode.type';
import { runStandardVersion } from './run-standard-version.function';
import { switchToReleaseBranch } from './switch-to-release-branch.function';

const releaseMode: ReleaseMode =
  getArgumentValue<ReleaseMode>(`--release-as`) ?? 'minor';

const newVersion = bumpVersion(version, releaseMode);

console.log(JSON.stringify({ releaseMode, newVersion }, null, 4));

switchToReleaseBranch(newVersion);

runStandardVersion(newVersion);

gitReleasePush(newVersion);
