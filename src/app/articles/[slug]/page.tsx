import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticleDetailContent } from '@/components/organisms/article-detail'
import { getArticleBySlugWithContent, getAllArticles, generateArticleSlug } from '@/lib/api/articles'
import { getSeoData, buildMetadata, SITE_URL } from '@/lib/api/seo'
import ScrollTracker from '@/components/atoms/ScrollTracker'

interface ArticleDetailPageProps {
    params: Promise<{
        slug: string
    }>
}

/** ISR: revalidate setiap 1 jam */
export const revalidate = 3600

export async function generateMetadata({ params }: ArticleDetailPageProps): Promise<Metadata> {
    const { slug } = await params
    const article = await getArticleBySlugWithContent(slug)
    const seo = article ? await getSeoData(article.article_id) : null
    return buildMetadata(seo, {
        fallbackTitle: article?.article_title ?? 'Artikel',
        fallbackDescription:
            article?.article_cover_description ??
            article?.article_content_text?.slice(0, 160) ??
            'Baca artikel terbaru seputar dunia IT dari ArutalaLab.',
        pageUrl: `${SITE_URL}/articles/${slug}`,
    })
}

export async function generateStaticParams() {
    try {
        const response = await getAllArticles()
        return response.data
            .filter(article => article.article_status === 'PUBLISHED')
            .map(article => ({
                slug: article.article_slug || generateArticleSlug(article.article_title)
            }))
    } catch {
        return []
    }
}

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
    const { slug } = await params

    const article = await getArticleBySlugWithContent(slug)

    if (!article) {
        notFound()
    }

    return (
        <>
            <ScrollTracker />
            <ArticleDetailContent article={article} />
        </>
    )
}
