// eslint.config.js
import js from '@eslint/js'
import tseslint from 'typescript-eslint'

export default [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.ts'],
        languageOptions: {
            parserOptions: {
                project: './tsconfig.json',
            },
        },
        rules: {
            // Optional custom rules
            '@typescript-eslint/no-unused-vars': 'warn',
            'no-console':'warn'
        },
    },
]
