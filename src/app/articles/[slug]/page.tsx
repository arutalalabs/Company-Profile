import { notFound } from 'next/navigation'
import { ArticleDetailContent } from '@/components/organisms/article-detail'
import { getArticleBySlugWithContent, getAllArticles, generateArticleSlug } from '@/lib/api/articles'

interface ArticleDetailPageProps {
    params: Promise<{
        slug: string
    }>
}

/** ISR: revalidate setiap 1 jam */
export const revalidate = 3600

/**
 * Generate static params untuk semua artikel yang sudah published
 * Ini memungkinkan Next.js pre-render halaman saat build time
 */
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

/**
 * Article Detail Page (Server Component)
 * 
 * Pre-rendered at build time with ISR for updated content.
 * No client-side JS needed for initial render → faster LCP.
 */
export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
    const { slug } = await params

    const article = await getArticleBySlugWithContent(slug)

    if (!article) {
        notFound()
    }

    return <ArticleDetailContent article={article} />
}
