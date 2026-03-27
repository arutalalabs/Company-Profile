'use client'

import { QuoteBlockData } from '@/types/article'

interface QuoteBlockProps {
    data: QuoteBlockData
}

/**
 * QuoteBlock - Renders blockquotes with optional caption
 */
export function QuoteBlock({ data }: QuoteBlockProps) {
    const { text, caption, alignment = 'left' } = data

    const alignmentClass = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right'
    }[alignment]

    return (
        <blockquote
            className={`
                my-8 border-l-4 border-[var(--color-accent-500)] 
                bg-[var(--color-accent-50)] p-6 rounded-r-xl
                ${alignmentClass}
            `}
        >
            <p
                className="text-lg sm:text-xl text-[var(--color-neutral-800)] italic leading-relaxed [&_a]:font-medium [&_a]:text-[var(--color-accent-700)] [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-[var(--color-accent-500)] [&_a]:transition-colors [&_a:hover]:text-[var(--color-accent-800)] [&_a:focus-visible]:text-[var(--color-accent-800)]"
                dangerouslySetInnerHTML={{ __html: text }}
            />
            {caption && (
                <footer className="mt-4 text-sm text-[var(--color-neutral-600)] font-medium">
                    — {caption}
                </footer>
            )}
        </blockquote>
    )
}
