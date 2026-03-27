'use client'

import { ParagraphBlockData } from '@/types/article'

interface ParagraphBlockProps {
    data: ParagraphBlockData
}

/**
 * ParagraphBlock - Renders paragraph text with HTML support
 * Note: Using dangerouslySetInnerHTML for Editor.js formatted text
 */
export function ParagraphBlock({ data }: ParagraphBlockProps) {
    const { text } = data

    return (
        <p
            className="text-base sm:text-lg text-[var(--color-neutral-700)] leading-relaxed mb-4 [&_a]:font-medium [&_a]:text-[var(--color-accent-700)] [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-[var(--color-accent-500)] [&_a]:transition-colors [&_a:hover]:text-[var(--color-accent-800)] [&_a:focus-visible]:text-[var(--color-accent-800)]"
            dangerouslySetInnerHTML={{ __html: text }}
        />
    )
}
