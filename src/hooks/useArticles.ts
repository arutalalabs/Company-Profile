import { useState, useEffect, useMemo } from 'react'
import { getPublishedArticles } from '@/lib/api/articles'
import type { DisplayArticle } from '@/types/article'

interface UseArticlesReturn {
    articles: DisplayArticle[]
    loading: boolean
    error: string | null
}

/**
 * Custom hook untuk fetch dan sort published articles.
 *
 * @param limit - Jumlah artikel terbaru yang ditampilkan (0 = semua)
 */
export function useArticles(limit = 0): UseArticlesReturn {
    const [articles, setArticles] = useState<DisplayArticle[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchArticles() {
            try {
                setLoading(true)
                const data = await getPublishedArticles()
                setArticles(data)
                setError(null)
            } catch (err) {
                console.error('Failed to fetch articles:', err)
                setError(err instanceof Error ? err.message : 'Gagal memuat artikel')
            } finally {
                setLoading(false)
            }
        }

        fetchArticles()
    }, [])

    // Sort by latest publish date & apply limit
    const latestArticles = useMemo(() => {
        const sorted = [...articles].sort(
            (a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime()
        )
        return limit > 0 ? sorted.slice(0, limit) : sorted
    }, [articles, limit])

    return { articles: latestArticles, loading, error }
}
