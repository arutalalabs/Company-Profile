import { apiGet } from './client'
import { generateSlug } from '@/utils/slug'

import type { Article, ContentBlock, DisplayArticle, HeaderBlockData } from '@/types/article'

export const generateArticleSlug = generateSlug

// ============================================
// API Response Types (internal to API layer)
// ============================================

export interface ArticlesResponse {
    success: boolean
    message: string
    data: Article[]
}

export interface ArticleDetailResponse {
    success: boolean
    message: string
    data: Article
}

// ============================================
// API Functions
// ============================================

/**
 * Fetch semua artikel dari API
 */
export async function getAllArticles(): Promise<ArticlesResponse> {
    return apiGet<ArticlesResponse>('/v2/article/')
}

/**
 * Fetch detail artikel by ID
 */
export async function getArticleById(id: string): Promise<ArticleDetailResponse> {
    return apiGet<ArticleDetailResponse>(`/v2/article/${id}`)
}

/**
 * Transform artikel dari API ke format display
 * Note: created_date only available in detail endpoint, use created_at from list endpoint
 */
export function transformArticleForDisplay(article: Article): DisplayArticle {
    return {
        id: article.article_id,
        title: article.article_title,
        description: article.article_cover_description || article.article_content_text?.slice(0, 350) || '',
        image: article.article_cover_url || '/src/article/python.png',
        // Prioritize created_at (available in list) over created_date (detail only)
        created_date: article.created_at ||
            article.created_date ||
            new Date().toISOString(),
        slug: article.article_slug || generateArticleSlug(article.article_title)
    }
}



/**
 * Fetch published articles dan transform ke DisplayArticle
 */
export async function getPublishedArticles(): Promise<DisplayArticle[]> {
    const response = await getAllArticles()

    const publishedArticles = response.data.filter(
        article => article.article_status === 'PUBLISHED'
    )

    return publishedArticles.map(transformArticleForDisplay)
}

/**
 * Fetch artikel by slug (untuk list page)
 */
export async function getArticleBySlug(slug: string): Promise<DisplayArticle | null> {
    const response = await getAllArticles()

    const article = response.data.find(art => {
        const articleSlug = art.article_slug || generateArticleSlug(art.article_title)
        return articleSlug === slug && art.article_status === 'PUBLISHED'
    })

    if (!article) return null

    return transformArticleForDisplay(article)
}

/**
 * Fetch full article by slug (untuk detail page dengan content blocks)
 * First finds article ID from list, then fetches full detail
 */
export async function getArticleBySlugWithContent(slug: string): Promise<Article | null> {
    // First, get all articles to find the matching one by slug
    const response = await getAllArticles()

    const matchedArticle = response.data.find(art => {
        const articleSlug = art.article_slug || generateArticleSlug(art.article_title)
        return articleSlug === slug
    })

    if (!matchedArticle) return null

    // Now fetch full article detail using the ID
    try {
        const detailResponse = await getArticleById(matchedArticle.article_id)
        return detailResponse.data
    } catch (error) {
        console.error('Error fetching article detail:', error)
        // Fallback to list data if detail fails
        return matchedArticle
    }
}

/**
 * Extract headers from content blocks for Table of Contents
 */
export function extractHeaders(blocks: ContentBlock[]): { id: string; text: string; level: number }[] {
    return blocks
        .filter((block): block is { id: string; type: 'header'; data: HeaderBlockData } =>
            block.type === 'header'
        )
        .map(block => ({
            id: block.id,
            text: block.data.text,
            level: block.data.level
        }))
}
