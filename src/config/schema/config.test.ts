import { configSchema } from "./config";

describe("config schema", () => {
	it("default", () => {
		const result = configSchema.safeParse({ output: "./.generated/theme.css" });
		expect(result.success).toBeTruthy();
		expect(result.data).toStrictEqual({
			prefix: "",
			content: "./themes/*.theme.yaml",
			absolute: false,
			output: "./.generated/theme.css",
		});
	});
});
