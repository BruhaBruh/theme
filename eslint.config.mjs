import antfu from "@antfu/eslint-config";

// @ts-check
export default antfu({
	type: "app",
	formatters: true,
	stylistic: {
		indent: "tab",
		quotes: "double",
		semi: true,
		overrides: {
			"style/max-statements-per-line": "off",
		},
	},
	typescript: {
		overrides: {
			// "ts/consistent-type-definitions": ["error", "type"],
			"node/prefer-global/process": "off",
			// "node/prefer-global/buffer": "off",
			// "style/indent-binary-ops": "off",
		},
	},
});
