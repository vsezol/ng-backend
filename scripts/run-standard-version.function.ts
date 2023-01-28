import { executeCommand } from './execute-command.function';

export const runStandardVersion = (version: string): void => {
  executeCommand(`
    npm run release -- \
    --release-as ${version}
  `);
};
