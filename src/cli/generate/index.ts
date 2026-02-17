import type { Command } from "commander";
import { Option } from "commander";
import { configExecutor } from "@/config/config-executor";
import { readConfig } from "@/config/read-config";
import { clearScreen, logError, logInfo } from "@/lib/logging";

interface Options {
	config: string;
}

function readConfigProcess(config: string): unknown {
	logInfo("Read config...");
	const configResult = readConfig(config);
	if (configResult.isErr()) {
		const error = configResult.unwrapErr();
		logError(
			"Fail read config: ",
			"\n\t",
			typeof error === "string" ? error : JSON.stringify(error),
		);
		return process.exit(0);
	}
	return configResult.unwrap();
}

export function applyGenerateCommand(cli: Command): void {
	cli
		.command("generate")
		.description("generate")
		.addOption(
			new Option("-c, --config <path>", "path to config file").default(
				"theme.config.yaml",
			),
		)
		.action((options: Options) => {
			const config = readConfigProcess(options.config);

			const executor = configExecutor(config, {
				logError,
				logInfo,
				clearScreen,
			});

			executor.execute();
		});
}
