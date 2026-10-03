import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { FlatCompat } from '@eslint/eslintrc'

const rootDirectory = dirname(fileURLToPath(import.meta.url))
const compat = new FlatCompat({
  baseDirectory: rootDirectory,
  resolvePluginsRelativeTo: join(rootDirectory, 'node_modules', 'eslint-config-next'),
})

const eslintConfig = [
  { ignores: ['.next/**', 'out/**', 'build/**', 'next-env.d.ts'] },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
]

export default eslintConfig
