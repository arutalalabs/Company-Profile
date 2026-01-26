import { createClient } from '@supabase/supabase-js'

// Supabase client singleton
export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// ============ Types ============

export interface Article {
    id: string
    title: string
    slug: string
    content: string
    excerpt: string
    featured_image: string | null
    seo_title?: string
    seo_description?: string
    published: boolean
    published_at: string
    created_at: string
    updated_at: string
    author: string
}

// ============ API Functions ============

/**
 * Fetch semua artikel yang published
 * Untuk landing page atau blog list
 */
export async function getAllArticles(): Promise<Article[]> {
    const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false })

    if (error) {
        console.error('Error fetching articles:', error)
        throw error
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return data || []
}

/**
 * Fetch artikel by slug
 * Untuk detail page
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
    const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single()

    if (error) {
        if (error.code === 'PGRST116') {
            // Not found
            return null
        }
        console.error('Error fetching article:', error)
        throw error
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return data
}

/**
 * Fetch artikel terbaru (untuk homepage)
 */
export async function getLatestArticles(limit = 3): Promise<Article[]> {
    const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false })
        .limit(limit)

    if (error) {
        console.error('Error fetching latest articles:', error)
        throw error
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return data || []
}
