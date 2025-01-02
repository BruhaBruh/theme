import chalk from 'chalk';

const write = (
  message: string[],
  stream: NodeJS.WritableStream = process.stdout,
) => {
  if (process.stdout.isTTY) {
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
  }
  stream.write(`${message.join(' ')}${process.stdout.isTTY ? '' : '\n'}`);
};

export const clearScreen = () => {
  if (process.stdout.isTTY) {
    process.stdout.write('\x1Bc');
  }
};

export const logInfo = (...message: string[]) => {
  write([chalk.bgBlue('INFO'), ...message], process.stdout);
};

export const logError = (...message: string[]) =>
  write([chalk.bgRed('ERROR'), ...message, '\n'], process.stderr);
