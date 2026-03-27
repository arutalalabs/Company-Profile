import type { MetadataRoute } from 'next'
import { getAllArticles, generateArticleSlug } from '@/lib/api/articles'
import { getAllCourse, generateCourseSlug } from '@/lib/api/courses'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.arutalalab.com'

/** Revalidate sitemap every hour */
export const revalidate = 3600

const staticRoutes: MetadataRoute.Sitemap = [
    {
        url: SITE_URL,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 1,
    },
    {
        url: `${SITE_URL}articles`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    },
    {
        url: `${SITE_URL}courses`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
    },
    {
        url: `${SITE_URL}it-education`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
    },
    {
        url: `${SITE_URL}resources`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
    },
    {
        url: `${SITE_URL}software-services`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
    },
    {
        url: `${SITE_URL}profile`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
    },
    {
        url: `${SITE_URL}mitra`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
    },
    {
        url: `${SITE_URL}kontak`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.5,
    },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    let articleRoutes: MetadataRoute.Sitemap = []
    try {
        const articlesResponse = await getAllArticles()
        const publishedArticles = articlesResponse.data.filter(
            (article) => article.article_status === 'PUBLISHED'
        )
        articleRoutes = publishedArticles.map((article) => ({
            url: `${SITE_URL}articles/${article.article_slug || generateArticleSlug(article.article_title)}`,
            lastModified: article.updated_at ?? article.created_at ?? new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }))
    } catch (error) {
        console.error('sitemap: failed to fetch articles', error)
    }

    let courseRoutes: MetadataRoute.Sitemap = []
    try {
        const coursesResponse = await getAllCourse()
        courseRoutes = coursesResponse.data.map((course) => ({
            url: `${SITE_URL}courses/${generateCourseSlug(course.course_title)}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }))
    } catch (error) {
        console.error('sitemap: failed to fetch courses', error)
    }

    return [...staticRoutes, ...articleRoutes, ...courseRoutes]
}
