// types/article.ts — Domain types for articles

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
    author: string
    article_content_blocks: ContentBlock[]
    article_cover_url: string
    article_status: 'PUBLISHED' | 'DRAFT' | string
    article_content_text?: string
    article_cover_description?: string
    created_date?: string // ISO 8601 format from API
    article_slug?: string
    created_at?: string
    updated_at?: string
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
