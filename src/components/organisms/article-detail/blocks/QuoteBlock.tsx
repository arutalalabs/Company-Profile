'use client'

import { QuoteBlockData } from '@/types/article'

interface QuoteBlockProps {
    data: QuoteBlockData
}

function sanitizeHtml(input: string) {
    if (!input) return ''
    const parser = new DOMParser()
    const doc = parser.parseFromString(input, 'text/html')

    const allowedTags = new Set(['A', 'STRONG', 'EM', 'B', 'I', 'U', 'SPAN'])

    function isValidHref(href: string | null) {
        if (!href) return false
        try {
            new URL(href, location.href)
            return true
        } catch {
            return false
        }
    }

    function sanitizeNode(node: Node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as HTMLElement
            if (!allowedTags.has(el.tagName)) {
                const parent = el.parentNode
                while (el.firstChild) parent?.insertBefore(el.firstChild, el)
                parent?.removeChild(el)
                return
            }

            if (el.tagName === 'A') {
                const href = el.getAttribute('href')
                if (!isValidHref(href)) {
                    el.removeAttribute('href')
                } else {
                    el.setAttribute('target', '_blank')
                    el.setAttribute('rel', 'noopener noreferrer')
                }
                Array.from(el.attributes).forEach(attr => {
                    if (!['href', 'target', 'rel'].includes(attr.name)) el.removeAttribute(attr.name)
                })
            } else {
                Array.from(el.attributes).forEach(attr => el.removeAttribute(attr.name))
            }
        }

        Array.from(node.childNodes).forEach(sanitizeNode)
    }

    Array.from(doc.body.childNodes).forEach(sanitizeNode)
    return doc.body.innerHTML
}

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
                <footer
                    className="mt-4 text-sm text-[var(--color-neutral-600)] font-medium"
                    dangerouslySetInnerHTML={{ __html: `— ${sanitizeHtml(caption)}` }}
                />
            )}
        </blockquote>
    )
}
