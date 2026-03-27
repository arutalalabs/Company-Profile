'use client'

import { ListBlockData, ListItem } from '@/types/article'

interface ListBlockProps {
    data: ListBlockData
}

function getItemContent(item: string | ListItem): string {
    if (typeof item === 'string') return item
    return item.content
}

function getItemChildren(item: string | ListItem): (string | ListItem)[] {
    if (typeof item === 'string') return []
    return item.items || []
}

function RenderItems({ items, style }: { items: (string | ListItem)[], style: 'ordered' | 'unordered' }) {
    const Tag = style === 'ordered' ? 'ol' : 'ul'
    const listStyle = style === 'ordered' ? 'list-decimal' : 'list-disc'

    return (
        <Tag className={`${listStyle} ml-6 space-y-2`}>
            {items.map((item, index) => (
                <li
                    key={index}
                    className="text-base sm:text-lg text-[var(--color-neutral-700)] leading-relaxed pl-2"
                >
                    <span
                        className="[&_a]:font-medium [&_a]:text-[var(--color-accent-700)] [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-[var(--color-accent-500)] [&_a]:transition-colors [&_a:hover]:text-[var(--color-accent-800)] [&_a:focus-visible]:text-[var(--color-accent-800)]"
                        dangerouslySetInnerHTML={{ __html: getItemContent(item) }}
                    />
                    {getItemChildren(item).length > 0 && (
                        <RenderItems items={getItemChildren(item)} style={style} />
                    )}
                </li>
            ))}
        </Tag>
    )
}

/**
 * ListBlock - Renders ordered or unordered lists (supports nested Editor.js list format)
 */
export function ListBlock({ data }: ListBlockProps) {
    const { style, items } = data

    return (
        <div className="mb-6">
            <RenderItems items={items} style={style} />
        </div>
    )
}
