/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://yourwebsite.com',
    generateRobotsTxt: true,
    sitemapSize: 7000,

    // Exclude pages
    exclude: ['/admin/*', '/api/*', '/dashboard/*'],

    // Generate sitemap untuk dynamic routes dari Supabase
    additionalPaths: async (config) => {
        const { createClient } = require('@supabase/supabase-js')

        // Init Supabase client
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        )

        // Fetch all published articles
        const { data: articles } = await supabase
            .from('articles')
            .select('slug, published_at, updated_at')
            .eq('published', true)

        if (!articles) return []

        // Generate sitemap entries
        return articles.map((article) => ({
            loc: `/blog/${article.slug}`,
            lastmod: article.updated_at || article.published_at,
            priority: 0.7,
            changefreq: 'weekly'
        }))
    },

    // robots.txt configuration
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin', '/api', '/dashboard']
            },
            {
                userAgent: 'Googlebot',
                allow: '/'
            }
        ]
    }
}
