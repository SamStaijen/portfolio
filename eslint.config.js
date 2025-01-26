import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    ignores: ['node_modules', 'dist'], // Files or directories to ignore
  },
  {
    files: ['**/*.ts', '**/*.tsx'], // Apply rules to TypeScript files
    languageOptions: {
      parser: tsParser, // Use the TypeScript parser
      ecmaVersion: 'latest', // Latest ECMAScript version
      sourceType: 'module', // For ES Modules
    },
    plugins: {
      '@typescript-eslint': tsPlugin, // Load the TypeScript plugin
    },
    extends: [
      'eslint:recommended', // Use ESLint's recommended rules
      'plugin:@typescript-eslint/recommended', // Use TypeScript rules
      'prettier', // Integrates Prettier for code formatting
    ],
    rules: {
      ...tsPlugin.configs.recommended.rules, // Use recommended rules
      '@typescript-eslint/ban-ts-comment': 'warn', // Example: Customize a specific rule
      '@typescript-eslint/no-unused-vars': 'error', // Example: Error on unused vars
    },
  },
];
