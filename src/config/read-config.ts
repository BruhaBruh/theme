import type { Result } from "@bruhabruh/type-safe";
import fs from "node:fs";
import { Err, Ok } from "@bruhabruh/type-safe";
import YAML from "yaml";

export function readConfig(path: string): Result<unknown, string> {
	try {
		const rawData = fs.readFileSync(path, { encoding: "utf-8" });

		return Ok(YAML.parse(rawData));
	}
	catch {
		return Err(`Fail read file at ${path}`);
	}
}
