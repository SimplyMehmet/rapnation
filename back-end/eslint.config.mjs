import eslint from "@eslint/js"
import tslint from "typescript-eslint";

export default tslint.config({
    files: ["src/**/*.ts"],
    languageOptions: {
        parserOptions: {
            project: ["./tsconfig.json"],
            tsconfigRootDir: import.meta.dirname,
        }
    },
    extends: [
        eslint.configs.recommended,
        ...tslint.configs.strictTypeChecked,
        ...tslint.configs.stylisticTypeChecked,
    ],
    rules: {
        "@typescript-eslint/semi": "warn"
    }
})