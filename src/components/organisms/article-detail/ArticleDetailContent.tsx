'use client'

import { Article, ContentBlock } from '@/lib/api/articles'
import { ArticleDetailHero } from './ArticleDetailHero'
import { BlockRenderer } from './BlockRenderer'
import { TableOfContents } from './TableOfContents'
import { Image } from '@/components'
import { CTA } from '@/components/molecules/cta'

interface ArticleDetailContentProps {
    article: Article
}

export function ArticleDetailContent({ article }: ArticleDetailContentProps) {
    const blocks = article.article_content_blocks || []

    const normalizeText = (value?: string) =>
        (value || '')
            .replace(/<[^>]*>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
            .toLowerCase()

    // Get first paragraph as subtitle fallback
    const firstParagraph = blocks.find(b => b.type === 'paragraph')
    const subtitle = article.article_cover_description || (firstParagraph?.type === 'paragraph' ? firstParagraph.data.text : undefined)

    // Optional: if first image is same as hero cover, remove it from body content
    const getImageUrl = (block: any): string | undefined => {
        if (block?.type !== 'image') return undefined
        return (
            block?.data?.url ||
            block?.data?.file?.url ||
            block?.data?.image?.url
        )
    }

    const normalizedTitle = normalizeText(article.article_title)
    const normalizedSubtitle = normalizeText(subtitle)

    // Remove duplicated hero content from the top of article body
    let processedBlocks = [...blocks]

    if (
        processedBlocks[0]?.type === 'header' &&
        normalizeText(processedBlocks[0].data.text) === normalizedTitle
    ) {
        processedBlocks = processedBlocks.slice(1)
    }

    if (
        normalizedSubtitle &&
        processedBlocks[0]?.type === 'paragraph' &&
        normalizeText(processedBlocks[0].data.text) === normalizedSubtitle
    ) {
        processedBlocks = processedBlocks.slice(1)
    }

    const firstImageIndex = processedBlocks.findIndex(b => b.type === 'image')
    const firstImageBlock = firstImageIndex >= 0 ? processedBlocks[firstImageIndex] : undefined
    const firstImageUrl = getImageUrl(firstImageBlock)
    const heroCoverUrl = article.article_cover_url

    // Do not slice from first image anymore; keep full flow
    // Remove only duplicated hero image (if same URL as cover)
    const contentBlocks =
        firstImageIndex >= 0 && heroCoverUrl && firstImageUrl === heroCoverUrl
            ? processedBlocks.filter((_, idx) => idx !== firstImageIndex)
            : processedBlocks

    return (
        <main className="min-h-screen bg-white">
            <ArticleDetailHero
                title={article.article_title}
                subtitle={subtitle}
                coverUrl={article.article_cover_url}
                author={article.author}
                publishDate={article.created_date || article.created_at}
                showCover={false}
            />

            <section className="w-full bg-white pb-10 sm:pb-12 lg:pb-16">
                <div className="mx-auto max-w-full sm:max-w-md md:max-w-xl lg:max-w-6xl 2xl:max-w-7xl px-6 sm:px-6 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 lg:gap-12 items-start">
                        <article className="order-2 lg:order-1">
                            {article.article_cover_url && (
                                <div className="mb-8 w-full max-h-[440px] mx-auto">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <Image
                                        src={article.article_cover_url}
                                        alt={article.article_title}
                                        shape="rounded"
                                        className="block w-full h-[220px] sm:h-[280px] lg:h-[360px] 2xl:h-[440px] rounded-2xl object-cover"
                                        loading="lazy"
                                    />
                                </div>
                            )}

                            {contentBlocks.map((block, index) => (
                                <BlockRenderer key={block.id || index} block={block as ContentBlock} />
                            ))}
                        </article>

                        <aside className="order-1 lg:order-2 lg:sticky lg:top-24 lg:self-start">
                            <TableOfContents blocks={contentBlocks as ContentBlock[]} />
                        </aside>
                    </div>
                </div>
            </section>

            <CTA />
        </main>
    )
}