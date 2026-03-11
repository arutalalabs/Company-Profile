import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.arutalalab.com'

// # *
// User-agent: *
// Allow: /
// Disallow: /admin
// Disallow: /api
// Disallow: /dashboard

// # Googlebot
// User-agent: Googlebot
// Allow: /

// # Host
// Host: https://www.arutalalab.com/

// # Sitemaps
// Sitemap: https://www.arutalalab.com/sitemap.xml


export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin/', '/api/', '/dashboard/'],
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
    }
}
