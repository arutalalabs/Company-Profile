/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.arutalalab.com',
    generateRobotsTxt: true,
    sitemapSize: 7000,

    // Exclude pages
    exclude: ['/admin/*', '/api/*', '/dashboard/*'],

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
