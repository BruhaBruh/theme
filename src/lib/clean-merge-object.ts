import type { UnknownRecord } from "@bruhabruh/type-safe";
import { merge } from "ts-deepmerge";
import { cleanObject } from "./clean-object";

export function cleanMergeObject<T extends UnknownRecord>(...objects: T[]): T {
	const merged = merge(...objects);
	return cleanObject(merged) as T;
}
