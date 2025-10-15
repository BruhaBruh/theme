import type { Result } from '@bruhabruh/type-safe';
import { Err, Ok } from '@bruhabruh/type-safe';
import fs from 'node:fs';
import path from 'node:path';

export const writeToFile = (
  pathToFile: string,
  data: string,
): Result<true, string> => {
  try {
    const directory = path.dirname(pathToFile);
    fs.mkdirSync(directory, { recursive: true });
    fs.writeFileSync(pathToFile, data, {
      encoding: 'utf-8',
    });
  } catch (e) {
    if (e instanceof TypeError) {
      return Err('invalid path');
    }
    return Err('fail create directory or file');
  }

  return Ok(true);
};
