import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({ baseDirectory: import.meta.dirname })

export default [
    ...compat.extends('next/core-web-vitals', 'next/typescript'),
    ...compat.extends('prettier'),
    {
        ignores: ['.next/**', 'node_modules/**', 'out/**', 'build/**'],
    },
]
