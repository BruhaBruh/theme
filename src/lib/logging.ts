import chalk from "chalk";

function write(message: string[], stream: NodeJS.WritableStream = process.stdout): void {
	if (process.stdout.isTTY) {
		process.stdout.clearLine(0);
		process.stdout.cursorTo(0);
	}
	stream.write(`${message.join(" ")}${process.stdout.isTTY ? "" : "\n"}`);
}

export function clearScreen(): void {
	if (process.stdout.isTTY) {
		process.stdout.write("\x1Bc");
	}
}

export function logInfo(...message: string[]): void {
	write([chalk.bgBlue("INFO"), ...message], process.stdout);
}

export function logError(...message: string[]): void {
	return write([chalk.bgRed("ERROR"), ...message, "\n"], process.stderr);
}
