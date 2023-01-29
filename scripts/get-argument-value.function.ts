import { findArgumentIndex } from './find-argument-index.function';
import { hasArgument } from './has-argument.function';

export function getArgumentValue<T extends string>(
  name: string
): T | undefined {
  if (!hasArgument(name)) {
    return undefined;
  }

  const index: number = findArgumentIndex(name);

  return <T | undefined>(
    (parseArgumentValue(getValueByEquality(process.argv[index])) ??
      parseArgumentValue(getValueBySpace(process.argv[index + 1])))
  );
}

function getValueBySpace(argument: string | undefined): string | undefined {
  return argument?.startsWith('-') ? undefined : parseArgumentValue(argument);
}

function getValueByEquality(argument: string | undefined): string | undefined {
  return argument?.split('=')?.[1] ?? undefined;
}

function parseArgumentValue(value: string | undefined): string | undefined {
  return value === 'undefined' || value === 'null' ? undefined : value;
}
