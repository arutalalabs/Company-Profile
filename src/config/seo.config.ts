const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://arutalalab.vercel.app'

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
    titleTemplate: '%s | ArutalaLab',
    defaultTitle: 'ArutalaLab - IT Education, Resource & Software Services',
    description:
        'ArutalaLab menghadirkan pendidikan IT berkualitas, penyediaan resource IT profesional, dan layanan software services untuk mendukung transformasi digital Indonesia.',

    canonical: SITE_URL,

    openGraph: {
        type: 'website',
        locale: 'id_ID',
        url: SITE_URL,
        siteName: 'ArutalaLab',
        images: [
            {
                url: `${SITE_URL}/og-image.jpg`,
                width: 1200,
                height: 630,
                alt: 'ArutalaLab - IT Education, Resource & Software Services',
                type: 'image/jpeg'
            }
        ]
    },

    twitter: {
        handle: '@arutalalab',
        site: '@arutalalab',
        cardType: 'summary_large_image'
    },

    additionalMetaTags: [
        {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1'
        },
        {
            name: 'keywords',
            content:
                'IT education, pelatihan IT, bootcamp, software services, resource IT, outsource, headhunting, ArutalaLab'
        },
        {
            name: 'author',
            content: 'ArutalaLab'
        },
        {
            property: 'dc:creator',
            content: 'ArutalaLab'
        },
        {
            name: 'application-name',
            content: 'ArutalaLab'
        }
    ],

    additionalLinkTags: [
        {
            rel: 'icon',
            href: '/favicon.ico'
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
