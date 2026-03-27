'use client'

import { LinkBlockData } from '@/types/article'
import NextImage from 'next/image'

interface LinkBlockProps {
    data: LinkBlockData
}

function parseUrl(rawUrl: string): URL | null {
    const trimmed = rawUrl.trim()
    if (!trimmed) return null

    if (trimmed.startsWith('/')) {
        try {
            return new URL(trimmed, 'https://dummy.local')
        } catch {
            return null
        }
    }

    const withProtocol = /^[a-zA-Z][a-zA-Z\d+.-]*:/.test(trimmed)
        ? trimmed
        : `https://${trimmed}`

    try {
        const parsed = new URL(withProtocol)
        if (parsed.protocol === 'javascript:') return null
        return parsed
    } catch {
        return null
    }
}

/**
 * LinkBlock - Renders Editor.js linkTool/link as a clickable preview card
 */
export function LinkBlock({ data }: LinkBlockProps) {
    const parsed = parseUrl(data.link || '')

    if (!parsed) {
        return null
    }

    const isInternal = parsed.hostname === 'dummy.local'
    const href = isInternal
        ? `${parsed.pathname}${parsed.search}${parsed.hash}`
        : parsed.toString()

    const domainLabel = isInternal ? 'Internal Link' : parsed.hostname
    const title = data.meta?.title?.trim() || href
    const description = data.meta?.description?.trim() || ''
    const imageUrl = data.meta?.image?.url

    return (
        <div className="my-6">
            <a
                href={href}
                target={isInternal ? undefined : '_blank'}
                rel={isInternal ? undefined : 'noopener noreferrer'}
                className="group block overflow-hidden rounded-2xl border border-[var(--color-neutral-200)] bg-white transition-colors hover:border-[var(--color-accent-500)]"
            >
                {imageUrl && (
                    <div className="relative h-44 w-full">
                        <NextImage
                            src={imageUrl}
                            alt={title}
                            fill
                            sizes="(min-width: 1024px) 760px, 100vw"
                            className="object-cover"
                        />
                    </div>
                )}

                <div className="p-4 sm:p-5">
                    <p className="mb-1 text-xs uppercase tracking-wide text-[var(--color-neutral-500)]">
                        {domainLabel}
                    </p>
                    <p className="text-base font-semibold leading-snug text-[var(--color-neutral-900)] transition-colors group-hover:text-[var(--color-accent-700)]">
                        {title}
                    </p>
                    {description && (
                        <p className="mt-2 text-sm leading-relaxed text-[var(--color-neutral-600)]">
                            {description}
                        </p>
                    )}
                    <p className="mt-3 break-all text-sm text-[var(--color-neutral-500)]">
                        {href}
                    </p>
                </div>
            </a>
        </div>
    )
}
