import type { Metadata } from 'next'
import { apiFetch } from './client'

export const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://www.arutalalab.com'

// ============================================
// Types
// ============================================

export interface SeoData {
    seo_id: string
    meta_title: string
    meta_description: string
    reference_image?: string
    keyword?: string[]
    type?: 'ARTICLE' | 'PAGE' | 'WEBSITE' | string
}

export interface SeoApiResponse {
    success: boolean
    message: string
    data: {
        page_id: string
        page_title: string
        page_slug: string
        seos: SeoData  // object, bukan array
    }
}

export interface BuildMetadataConfig {
    isLayout?: boolean
    fallbackTitle: string
    fallbackDescription: string
    pageUrl: string
}

// ============================================
// API Function
// ============================================

export async function getSeoData(pagePath: string): Promise<SeoData | null> {
    try {
        const response = await apiFetch<SeoApiResponse>(
            `/v2/pages/public/seo-active/${pagePath}`,
            { revalidate: 60 }
        )
        if (!response.success || !response.data?.seos) return null
        return response.data.seos
    } catch {
        return null
    }
}

// ============================================
// Metadata Builder
// ============================================

export function buildMetadata(
    seo: SeoData | null,
    config: BuildMetadataConfig
): Metadata {
    const title = seo?.meta_title || config.fallbackTitle
    const description = seo?.meta_description || config.fallbackDescription
    const image = seo?.reference_image || '/src/common/logo.png'
    const keywords = seo?.keyword?.length
        ? seo.keyword
        : ['IT Education', 'Resources', 'Software Services']
    const openGraphType = seo?.type === 'ARTICLE' ? 'article' : 'website'

    return {
        metadataBase: new URL('/', config.pageUrl),
        title: config.isLayout
            ? { default: title, template: '%s | ArutalaLab' }
            : title,
        description,
        keywords,
        authors: [{ name: 'ArutalaLab' }],
        creator: 'ArutalaLab',
        alternates: {
            canonical: config.pageUrl,
        },
        openGraph: {
            type: openGraphType,
            locale: 'id_ID',
            url: config.pageUrl,
            title,
            description,
            siteName: 'ArutalaLab',
            images: [{ url: image, width: 1200, height: 630 }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
            creator: '@arutalalab',
            site: '@arutalalab',
        },
        robots: {
            index: true,
            follow: true,
            googleBot: { index: true, follow: true },
        },
    }
}