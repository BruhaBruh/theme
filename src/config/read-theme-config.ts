import type { Result } from "@bruhabruh/type-safe";
import type { ThemeConfig } from "./schema/theme-config";
import fs from "node:fs";
import { Err, Ok } from "@bruhabruh/type-safe";
import YAML from "yaml";
import z from "zod";
import { themeConfigSchema } from "./schema/theme-config";

export function readThemeConfig(path: string): Result<ThemeConfig, any> {
	const rawData = fs.readFileSync(path, { encoding: "utf-8" });

	const data = YAML.parse(rawData);

	const result = themeConfigSchema.safeParse(data);
	if (result.success) {
		return Ok(result.data);
	}

	return Err(z.flattenError(result.error));
}
