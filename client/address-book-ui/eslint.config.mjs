import pluginJs from '@eslint/js';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginPromise from 'eslint-plugin-promise';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
    { files: ['**/*.{js,mjs,cjs,ts}'] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        plugins: {
            import: eslintPluginImport,
            unicorn: eslintPluginUnicorn,
            promise: eslintPluginPromise,
        },
        rules: {
            'no-console': 'warn',
            '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }],
            'import/order': [
                'warn',
                {
                    groups: [
                        ['external', 'builtin'],
                        ['internal', 'parent', 'sibling', 'index'],
                    ],
                    'newlines-between': 'always',
                    alphabetize: { order: 'asc', caseInsensitive: true },
                },
            ],
            eqeqeq: ['error', 'always'],
            'unicorn/prefer-ternary': 'warn',
            'prefer-const': 'error',
            'no-duplicate-imports': 'error',
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '_' }],
            complexity: ['warn', { max: 15 }],
            'no-unreachable': 'warn',
            'max-len': ['error', { code: 120 }],
            '@typescript-eslint/naming-convention': [
                'warn',
                {
                    selector: 'variable',
                    format: ['camelCase'],
                    leadingUnderscore: 'allow',
                },
                {
                    selector: 'function',
                    format: ['camelCase'],
                },
            ],
            'promise/catch-or-return': 'warn', // Ensure that promises are either returned or caught
        },
    },
];
