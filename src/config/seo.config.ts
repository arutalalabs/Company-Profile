const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourwebsite.com'

interface SEOConfig {
    titleTemplate?: string
    defaultTitle?: string
    description?: string
    canonical?: string
    openGraph?: {
        type: string
        locale: string
        url: string
        siteName: string
        images: {
            url: string
            width: number
            height: number
            alt: string
            type: string
        }[]
    }
    twitter?: {
        handle: string
        site: string
        cardType: string
    }
    additionalMetaTags?: {
        name?: string
        property?: string
        content: string
    }[]
    additionalLinkTags?: {
        rel: string
        href: string
        sizes?: string
    }[]
}

export const defaultSEO: SEOConfig = {
    // Title template untuk semua page
    titleTemplate: '%s | Nama Perusahaan',
    defaultTitle: 'Landing Page Perusahaan - CMS & SEO Analytics',
    description:
        'Platform landing page modern dengan CMS dan SEO Analytics. Kelola konten dengan mudah dan pantau performa SEO Anda.',

    // Canonical URL
    canonical: SITE_URL,

    // Open Graph (Facebook, LinkedIn, WhatsApp)
    openGraph: {
        type: 'website',
        locale: 'id_ID',
        url: SITE_URL,
        siteName: 'Nama Perusahaan',
        images: [
            {
                url: `${SITE_URL}/og-image.jpg`,
                width: 1200,
                height: 630,
                alt: 'Nama Perusahaan - Landing Page',
                type: 'image/jpeg'
            }
        ]
    },

    // Twitter Card
    twitter: {
        handle: '@yourcompany',
        site: '@yourcompany',
        cardType: 'summary_large_image'
    },

    // Additional Meta Tags
    additionalMetaTags: [
        {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1'
        },
        {
            name: 'keywords',
            content: 'landing page, cms, seo, analytics, supabase, next.js, bun'
        },
        {
            name: 'author',
            content: 'Tim Anda'
        },
        {
            property: 'dc:creator',
            content: 'Tim Anda'
        },
        {
            name: 'application-name',
            content: 'Nama Perusahaan'
        }
    ],

    // Additional Link Tags
    additionalLinkTags: [
        {
            rel: 'icon',
            href: '/favicon. ico'
        },
        {
            rel: 'apple-touch-icon',
            href: '/apple-icon.png',
            sizes: '180x180'
        },
        {
            rel: 'manifest',
            href: '/manifest.json'
        }
    ]
}
