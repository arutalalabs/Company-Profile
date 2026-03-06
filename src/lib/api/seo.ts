import type { Metadata } from 'next'
import { apiFetch } from './client'

// ============================================
// Types
// ============================================

export interface SeoData {
    seo_id: string
    meta_title: string
    meta_description: string
    is_active: boolean
}

export interface SeoApiResponse {
    success: boolean
    message: string
    data: SeoData[]
}

export interface BuildMetadataConfig {
    /** True for root layout: generates title.default + title.template */
    isLayout?: boolean
    fallbackTitle: string
    fallbackDescription: string
    /** Absolute URL for this page, used in OpenGraph */
    pageUrl: string
}

// ============================================
// API Function
// ============================================

export async function getSeoData(pageId: string): Promise<SeoData | null> {
    try {
        const response = await apiFetch<SeoApiResponse>(
            `/v2/pages/${pageId}/seo/`,
            { revalidate: 60 }
        )
        if (!response.success || !Array.isArray(response.data)) return null
        return response.data.find((item) => item.is_active) ?? null
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

    return {
        title: config.isLayout
            ? { default: title, template: '%s | ArutalaLab' }
            : title,
        description,
        keywords: ['IT Education', 'Resources', 'Software Services'],
        authors: [{ name: 'ArutalaLab' }],
        creator: 'ArutalaLab',
        openGraph: {
            type: 'website',
            locale: 'id_ID',
            url: config.pageUrl,
            title,
            description,
            siteName: 'ArutalaLab',
            images: [{ url: '/logo.png', width: 1200, height: 630 }],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: { index: true, follow: true },
        },
    }
}