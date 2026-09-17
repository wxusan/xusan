export default [
  { ignores: ['dist/**', '.prerender/**', 'node_modules/**'] },
  {
    files: ['**/*.{js,jsx,mjs}'],
    languageOptions: {
      ecmaVersion: 'latest', sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: Object.fromEntries(['window', 'document', 'navigator', 'localStorage', 'Image', 'Path2D', 'ResizeObserver', 'IntersectionObserver', 'console', 'setTimeout', 'clearTimeout', 'URL'].map(name => [name, 'readonly'])),
    },
    rules: {
      'no-undef': 'error', 'no-unreachable': 'error', 'no-dupe-keys': 'error',
      'no-duplicate-case': 'error', 'no-constant-condition': 'error', 'no-debugger': 'error',
      'no-func-assign': 'error', 'no-import-assign': 'error', 'no-unsafe-finally': 'error',
      'valid-typeof': 'error', 'constructor-super': 'error',
      // JSX component names are not counted as references by ESLint's core parser.
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^_', caughtErrors: 'none' }],
    },
  },
];
