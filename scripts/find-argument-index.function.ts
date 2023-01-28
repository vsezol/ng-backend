export const findArgumentIndex = (name: string): number =>
  process.argv.findIndex(
    (arg: string) => arg === name || arg.split(`=`)[0] === name
  );
