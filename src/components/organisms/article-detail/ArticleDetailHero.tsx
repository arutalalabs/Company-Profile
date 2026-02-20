'use client'

import { useRouter } from 'next/navigation'
import { Typography, Image } from '@/components'

interface ArticleDetailHeroProps {
    title: string
    subtitle?: string
    coverUrl?: string
    publishDate?: string
    author?: string
    showCover?: boolean
}

/**
 * ArticleDetailHero - Hero section with cover image and title
 */
export function ArticleDetailHero({
    title,
    subtitle,
    coverUrl,
    publishDate,
    author,
    showCover = true
}: ArticleDetailHeroProps) {
    const router = useRouter()

    // Format date
    const formatDate = (dateString?: string) => {
        if (!dateString) return ''

        const months = [
            'Januari',
            'Februari',
            'Maret',
            'April',
            'Mei',
            'Juni',
            'Juli',
            'Agustus',
            'September',
            'Oktober',
            'November',
            'Desember'
        ]

        const date = new Date(dateString)
        if (Number.isNaN(date.getTime())) return dateString

        const day = date.getUTCDate()
        const month = months[date.getUTCMonth()]
        const year = date.getUTCFullYear()

        return `${day} ${month} ${year}`
    }

    return (
        <section className="w-full bg-white">
            <div className="relative z-5 pt-8 sm:pt-10 lg:pt-16">
                <div className="mx-auto max-w-full sm:max-w-md md:max-w-xl lg:max-w-6xl 2xl:max-w-7xl px-6 sm:px-6 md:px-8">
                    {/* Breadcrumb */}
                    <button
                        onClick={() => router.push('/articles')}
                        className="flex items-center gap-2 text-[var(--color-accent-600)] hover:text-[var(--color-accent-700)] transition-colors mb-6 cursor-pointer"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="font-medium">Kembali ke Artikel</span>
                    </button>

                    {/* Author */}
                    {author && (
                        <Typography
                            as="p"
                            size="lg"
                            weight="medium"
                            color="neutral-950"
                        >
                            {author}
                        </Typography>
                    )}

                    {/* Date */}
                    {publishDate && (
                        <Typography
                            as="p"
                            size="lg"
                            weight="medium"
                            color="neutral-50"
                            className="mb-3 text-[var(--color-neutral-400)]"
                        >
                            {formatDate(publishDate)}
                        </Typography>
                    )}

                    {/* Title */}
                    <Typography
                        as="h1"
                        size="2xl"
                        weight="bold"
                        color="neutral-950"
                        className="text-xl sm:text-2xl md:text-3xl lg:text-3xl 2xl:text-4xl mb-4 leading-tight"
                    >
                        {title}
                    </Typography>

                    

                    {/* Subtitle */}
                    {subtitle && (
                        <div
                            className="text-base sm:text-sm md:text-lg text-[var(--color-neutral-950)] opacity-90 mb-8 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: subtitle }}
                        />
                    )}

                    {/* Cover Image */}
                    {/* {showCover && coverUrl && (
                        <div className="relative w-64 h-64 sm:h-80 md:h-96 lg:w-[800px] lg:h-[100px] mb-8">
                            <Image
                                src={coverUrl}
                                alt={title}
                                fit="cover"
                                shape="rounded"
                                className="w-auto h-auto max-h-2xl mx-auto rounded-2xl"
                            />
                        </div>
                    )} */}
                </div>
            </div>
        </section>
    )
}
