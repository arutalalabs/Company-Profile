import type { MetadataRoute } from 'next'
import { getAllArticles, generateArticleSlug } from '@/lib/api/articles'
import { getAllCourse, generateCourseSlug } from '@/lib/api/courses'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.arutalalab.com'

/** Revalidate sitemap every hour */
export const revalidate = 3600

// <!-- <?xml version="1.0" encoding="UTF-8"?>
// <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
// <sitemap><loc>https://www.arutalalab.com/sitemap-0.xml</loc></sitemap>
// </sitemapindex> -->

// <?xml version="1.0" encoding="UTF-8"?>
// <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
// <url><loc>https://www.arutalalab.com/articles/blockchain-introduction</loc><lastmod>2026-03-10T04:33:06.449Z</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>
// <url><loc>https://www.arutalalab.com/articles</loc><lastmod>2026-03-10T04:33:06.451Z</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>
// <url><loc>https://www.arutalalab.com/courses/back-end-golang-using-docker</loc><lastmod>2026-03-10T04:33:06.451Z</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>
// <url><loc>https://www.arutalalab.com/courses/coding-express</loc><lastmod>2026-03-10T04:33:06.451Z</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>
// <url><loc>https://www.arutalalab.com/courses</loc><lastmod>2026-03-10T04:33:06.451Z</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>
// <url><loc>https://www.arutalalab.com/it-education</loc><lastmod>2026-03-10T04:33:06.451Z</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>
// <url><loc>https://www.arutalalab.com/kontak</loc><lastmod>2026-03-10T04:33:06.451Z</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>
// <url><loc>https://www.arutalalab.com/mitra</loc><lastmod>2026-03-10T04:33:06.451Z</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>
// <url><loc>https://www.arutalalab.com</loc><lastmod>2026-03-10T04:33:06.451Z</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>
// <url><loc>https://www.arutalalab.com/profile</loc><lastmod>2026-03-10T04:33:06.451Z</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>
// <url><loc>https://www.arutalalab.com/resources</loc><lastmod>2026-03-10T04:33:06.451Z</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>
// <url><loc>https://www.arutalalab.com/software-services</loc><lastmod>2026-03-10T04:33:06.451Z</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>
// </urlset>

const staticRoutes: MetadataRoute.Sitemap = [
    {
        url: SITE_URL,
        changeFrequency: 'monthly',
        priority: 1,
    },
    {
        url: `${SITE_URL}/articles`,
        changeFrequency: 'weekly',
        priority: 0.8,
    },
    {
        url: `${SITE_URL}/courses`,
        changeFrequency: 'monthly',
        priority: 0.8,
    },
    {
        url: `${SITE_URL}/it-education`,
        changeFrequency: 'monthly',
        priority: 0.7,
    },
    {
        url: `${SITE_URL}/resources`,
        changeFrequency: 'monthly',
        priority: 0.7,
    },
    {
        url: `${SITE_URL}/software-services`,
        changeFrequency: 'monthly',
        priority: 0.7,
    },
    {
        url: `${SITE_URL}/profile`,
        changeFrequency: 'monthly',
        priority: 0.6,
    },
    {
        url: `${SITE_URL}/mitra`,
        changeFrequency: 'monthly',
        priority: 0.6,
    },
    {
        url: `${SITE_URL}/kontak`,
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
            url: `${SITE_URL}/articles/${article.article_slug || generateArticleSlug(article.article_title)}`,
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
            url: `${SITE_URL}/courses/${generateCourseSlug(course.course_title)}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }))
    } catch (error) {
        console.error('sitemap: failed to fetch courses', error)
    }

    return [...staticRoutes, ...articleRoutes, ...courseRoutes]
}
