import { apiGet } from './client'

// ============================================
// Content Block Types (Editor.js format)
// ============================================

export interface ParagraphBlockData {
    text: string
}

export interface HeaderBlockData {
    text: string
    level: 1 | 2 | 3 | 4 | 5 | 6
}

export interface ImageBlockData {
    file: { url: string }
    caption?: string
    stretched?: boolean
    withBorder?: boolean
    withBackground?: boolean
}

export interface ListBlockData {
    style: 'ordered' | 'unordered'
    items: string[]
}

export interface CodeBlockData {
    code: string
    language?: string
}

export interface QuoteBlockData {
    text: string
    caption?: string
    alignment?: 'left' | 'center' | 'right'
}

// Union type for content blocks
export type ContentBlock =
    | { id: string; type: 'paragraph'; data: ParagraphBlockData }
    | { id: string; type: 'header'; data: HeaderBlockData }
    | { id: string; type: 'image'; data: ImageBlockData }
    | { id: string; type: 'list'; data: ListBlockData }
    | { id: string; type: 'code'; data: CodeBlockData }
    | { id: string; type: 'quote'; data: QuoteBlockData }

// ============================================
// Article Types
// ============================================

export interface Article {
    article_id: string
    article_title: string
    article_content?: string
    article_content_blocks: ContentBlock[]
    article_cover_url: string
    article_status: 'PUBLISHED' | 'DRAFT' | string
    article_content_text?: string
    created_date?: string // ISO 8601 format from API
    article_slug?: string
    created_at?: string
    updated_at?: string
}

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

// Interface untuk display di komponen list (sesuai dengan format existing)
export interface DisplayArticle {
    id: string
    title: string
    description: string
    image: string
    created_date: string
    slug: string
}

// ============================================
// API Functions
// ============================================

/**
 * Fetch semua artikel dari API
 */
export async function getAllArticles(): Promise<ArticlesResponse> {
    return apiGet<ArticlesResponse>('/article/')
}

/**
 * Fetch detail artikel by ID
 */
export async function getArticleById(id: string): Promise<ArticleDetailResponse> {
    return apiGet<ArticleDetailResponse>(`/article/${id}`)
}

/**
 * Transform artikel dari API ke format display
 * Note: created_date only available in detail endpoint, use created_at from list endpoint
 */
export function transformArticleForDisplay(article: Article): DisplayArticle {
    return {
        id: article.article_id,
        title: article.article_title,
        description: article.article_content_text ||
            (article.article_content ? article.article_content.substring(0, 200) + '...' : ''),
        image: article.article_cover_url || '/src/article/python.png',
        // Prioritize created_at (available in list) over created_date (detail only)
        created_date: article.created_at ||
            article.created_date ||
            new Date().toISOString(),
        slug: article.article_slug || generateArticleSlug(article.article_title)
    }
}

/**
 * Generate slug dari article title
 */
export function generateArticleSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
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
