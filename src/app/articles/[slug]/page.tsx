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

    return <ArticleDetailContent article={article} />
}
