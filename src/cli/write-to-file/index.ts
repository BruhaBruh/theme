import fs from 'node:fs';
import path from 'node:path';

export const writeToFile = (pathToFile: string, data: string) => {
  const directory = path.dirname(pathToFile);
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(pathToFile, data, {
    encoding: 'utf-8',
  });
};
