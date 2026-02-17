import type { Result } from "@bruhabruh/type-safe";
import type { Config } from "./schema/config";
import { Err, Ok } from "@bruhabruh/type-safe";
import z from "zod";
import { configSchema } from "./schema/config";

export function validateConfig(data: unknown): Result<Config, any> {
	const result = configSchema.safeParse(data);
	if (result.success) {
		return Ok(result.data);
	}

	return Err(z.flattenError(result.error));
}
