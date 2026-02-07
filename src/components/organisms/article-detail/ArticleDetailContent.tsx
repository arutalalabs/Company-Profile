'use client'

import { Article, ContentBlock } from '@/lib/api/articles'
import { ArticleDetailHero } from './ArticleDetailHero'
import { BlockRenderer } from './BlockRenderer'
import { TableOfContents } from './TableOfContents'
import { CTA } from '@/components/molecules/cta'

interface ArticleDetailContentProps {
    article: Article
}

/**
 * ArticleDetailContent - Main content wrapper for article detail page
 * Renders hero, content blocks with TOC sidebar, and CTA
 */
export function ArticleDetailContent({ article }: ArticleDetailContentProps) {
    const blocks = article.article_content_blocks || []

    // Get first paragraph as subtitle
    const firstParagraph = blocks.find(b => b.type === 'paragraph')
    const subtitle = firstParagraph?.type === 'paragraph' ? firstParagraph.data.text : undefined

    // Find index of first image block
    const firstImageIndex = blocks.findIndex(b => b.type === 'image')

    // Start content from first image (skip title/subtitle blocks before it)
    const contentBlocks = firstImageIndex >= 0 ? blocks.slice(firstImageIndex) : blocks

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <ArticleDetailHero
                title={article.article_title}
                subtitle={subtitle}
                coverUrl={article.article_cover_url}
                publishDate={article.created_date || article.created_at}
            />

            {/* Content Section */}
            <section className="w-full bg-white pb-10 sm:pb-12 lg:pb-16">
                <div className="mx-auto max-w-full sm:max-w-md md:max-w-xl lg:max-w-6xl 2xl:max-w-7xl px-6 sm:px-6 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 lg:gap-12">
                        {/* Main Content */}
                        <article className="order-2 lg:order-1">
                            {/* Debug info - remove after fixing */}
                            {contentBlocks.length === 0 && (
                                <div className="p-4 bg-yellow-100 rounded-lg mb-4">
                                    <p className="text-sm text-yellow-800">Debug: No content blocks found</p>
                                    <pre className="text-xs mt-2 overflow-auto">
                                        {JSON.stringify(article.article_content_blocks, null, 2)}
                                    </pre>
                                </div>
                            )}

                            {contentBlocks.map((block, index) => (
                                <BlockRenderer key={block.id || index} block={block as ContentBlock} />
                            ))}
                        </article>

                        {/* Sidebar - TOC */}
                        <aside className="order-1 lg:order-2">
                            <TableOfContents blocks={contentBlocks as ContentBlock[]} />
                        </aside>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <CTA />
        </main>
    )
}

