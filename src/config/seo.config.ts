const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://www.arutalalab.com'

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
    defaultTitle: 'ArutalaLab - IT Education, Resources & Software Services',
    description:
        'ArutalaLab menghadirkan pendidikan IT berkualitas, penyediaan resources IT profesional, dan layanan software services untuk mendukung transformasi digital Indonesia.',

    canonical: SITE_URL,

    openGraph: {
        type: 'website',
        locale: 'id_ID',
        url: SITE_URL,
        siteName: 'ArutalaLab',
        images: [
            {
                url: `${SITE_URL}/logo.png`,
                width: 1200,
                height: 630,
                alt: 'ArutalaLab - IT Education, Resources & Software Services',
                type: 'image/png'
            }
        ]
    },

    additionalMetaTags: [
        {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1'
        },
        {
            name: 'keywords',
            content:
                'IT education, pelatihan IT, bootcamp, software services, resources IT, outsource, headhunting, ArutalaLab'
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
