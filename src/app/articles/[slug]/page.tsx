'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Typography, Button } from '@/components'
import { ArticleDetailContent } from '@/components/organisms/article-detail'
import { getArticleBySlugWithContent, type Article } from '@/lib/api/articles'

interface ArticleDetailPageProps {
    params: Promise<{
        slug: string
    }>
}

/**
 * Article Detail Page
 * 
 * Dynamic page that displays article content based on URL slug
 */
export default function ArticleDetailPage({ params }: ArticleDetailPageProps) {
    const router = useRouter()
    const [article, setArticle] = useState<Article | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [slug, setSlug] = useState<string>('')

    // Unwrap params
    useEffect(() => {
        params.then(resolvedParams => {
            setSlug(resolvedParams.slug)
        })
    }, [params])

    // Fetch article data
    useEffect(() => {
        if (!slug) return

        async function fetchArticle() {
            try {
                setLoading(true)
                setError(null)
                const data = await getArticleBySlugWithContent(slug)

                if (data) {
                    setArticle(data)
                } else {
                    setError('Artikel tidak ditemukan')
                }
            } catch (err) {
                console.error('Error fetching article:', err)

                // User-friendly error messages
                let errorMessage = 'Terjadi kesalahan saat memuat artikel'
                if (err instanceof Error) {
                    if (err.message.includes('401')) {
                        errorMessage = 'Tidak dapat mengakses artikel. Silakan coba lagi nanti.'
                    } else if (err.message.includes('timeout')) {
                        errorMessage = 'Koneksi timeout. Silakan coba lagi.'
                    }
                }

                setError(errorMessage)
            } finally {
                setLoading(false)
            }
        }

        fetchArticle()
    }, [slug])

    // Loading state
    if (loading) {
        return (
            <main className="min-h-screen bg-white">
                <div className="min-h-[60vh] flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-[var(--color-primary-900)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <Typography as="p" size="base" color="neutral-600">
                            Memuat artikel...
                        </Typography>
                    </div>
                </div>
            </main>
        )
    }

    // Error state
    if (error || !article) {
        return (
            <main className="min-h-screen bg-white">
                <div className="min-h-[60vh] flex items-center justify-center">
                    <div className="text-center max-w-md px-4">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <Typography as="h2" size="xl" weight="bold" color="neutral-950" className="mb-2">
                            {error || 'Artikel tidak ditemukan'}
                        </Typography>
                        <Typography as="p" size="base" color="neutral-600" className="mb-6">
                            Maaf, artikel yang Anda cari tidak tersedia atau sudah dihapus.
                        </Typography>
                        <Button
                            size="md"
                            shape="solid"
                            color="primary-900"
                            onClick={() => router.push('/articles')}
                        >
                            Lihat Semua Artikel
                        </Button>
                    </div>
                </div>
            </main>
        )
    }

    return <ArticleDetailContent article={article} />
}
