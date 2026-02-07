'use client'

import { ListBlockData } from '@/lib/api/articles'

interface ListBlockProps {
    data: ListBlockData
}

/**
 * ListBlock - Renders ordered or unordered lists
 */
export function ListBlock({ data }: ListBlockProps) {
    const { style, items } = data

    const Tag = style === 'ordered' ? 'ol' : 'ul'
    const listStyle = style === 'ordered' ? 'list-decimal' : 'list-disc'

    return (
        <Tag className={`${listStyle} ml-6 mb-6 space-y-2`}>
            {items.map((item, index) => (
                <li
                    key={index}
                    className="text-base sm:text-lg text-[var(--color-neutral-700)] leading-relaxed pl-2"
                    dangerouslySetInnerHTML={{ __html: item }}
                />
            ))}
        </Tag>
    )
}
