import {
  ProjectConfiguration,
  ProjectGraphProjectNode,
  readCachedProjectGraph,
} from '@nrwl/devkit';
import { readFileSync, writeFileSync } from 'fs';
import { version } from '../package.json';
import { executeCommand } from './execute-command.function';
import { getArgumentValue } from './get-argument-value.function';

try {
  publish();
} catch (error) {
  console.error(error);
}

function publish(): void {
  const packageName: string | undefined = getArgumentValue(`--package`);

  if (packageName === undefined) {
    throw new Error('PUBLISH: --package argument is required');
  }

  const projectGraph = readCachedProjectGraph();

  const project: ProjectGraphProjectNode<ProjectConfiguration> | undefined =
    projectGraph.nodes?.[packageName];

  if (project === undefined) {
    throw new Error(
      `Could not find project "${packageName}" in the workspace. Is the project.json configured correctly?`
    );
  }

  const outputPath: string | undefined =
    project.data?.targets?.build?.options?.outputPath;

  if (outputPath === undefined) {
    throw new Error(
      `PUBLISH: Could not find "build.options.outputPath" of project "${packageName}". Is project.json configured  correctly?`
    );
  }

  process.chdir(outputPath);

  try {
    const json = JSON.parse(readFileSync(`package.json`).toString());
    json.version = version;

    const updatedJson = JSON.stringify(json, null, 2);

    writeFileSync(`package.json`, updatedJson);
  } catch (e) {
    throw new Error(
      `Error reading package.json file from library build output.`
    );
  }

  executeCommand(`npm publish --access public`);
}
