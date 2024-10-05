/* eslint-disable */

module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'plugin:import/errors',
        'plugin:import/warnings',
    ],
    plugins: ['@typescript-eslint', 'import'],
    rules: {
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
        // Add any other custom rules here
    },
};
