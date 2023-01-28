import { ReleaseMode } from './release-mode.type';

export function bumpVersion(version: string, mode: ReleaseMode): string {
  const [major, minor, patch] = version.split(/[.]/).map(Number);

  switch (mode) {
    case `major`:
      return `${major + 1}.0.0`;
    case `minor`:
      return `${major}.${minor + 1}.0`;
    case `patch`:
      return `${major}.${minor}.${patch + 1}`;
    default:
      return version;
  }
}
