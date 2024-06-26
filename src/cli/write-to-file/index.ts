import fs from 'node:fs';
import path from 'node:path';

export const writeToFile = (pathToFile: string, data: string) => {
  const folder = path.dirname(pathToFile);
  fs.mkdirSync(folder, { recursive: true });
  fs.writeFileSync(path.resolve(pathToFile), data, {
    encoding: 'utf-8',
  });
};
