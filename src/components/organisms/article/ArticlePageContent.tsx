'use client'

import { useEffect, useState, useCallback } from 'react'
import { ArticleHero } from './ArticleHero'
import { ArticleList } from './ArticleList'
import { getPublishedArticles, DisplayArticle } from '@/lib/api/articles'
import { Typography, Button } from '@/components'

interface ArticlePageContentProps {
    fallbackArticles?: DisplayArticle[]
    itemsPerPage?: number
}

/**
 * ArticlePageContent - Client wrapper untuk articles page
 * Handles: data fetching, loading state, error state
 */
export function ArticlePageContent({
    fallbackArticles = [],
    itemsPerPage = 6
}: ArticlePageContentProps) {
    const [articles, setArticles] = useState<DisplayArticle[]>(fallbackArticles)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchArticles = useCallback(async () => {
        setIsLoading(true)
        setError(null)

        try {
            const data = await getPublishedArticles()

            // Sort by date (newest first)
            const sortedArticles = [...data].sort(
                (a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime()
            )

            setArticles(sortedArticles)
        } catch (err) {
            console.error('Failed to fetch articles:', err)

            // User-friendly error messages
            let errorMessage = 'Gagal memuat artikel. Silakan coba lagi.'

            if (err instanceof Error) {
                // Check for common API errors
                if (err.message.includes('401')) {
                    errorMessage = 'Menampilkan artikel dari cache lokal.'
                } else if (err.message.includes('timeout')) {
                    errorMessage = 'Koneksi timeout. Silakan coba lagi.'
                } else if (err.message.includes('fetch')) {
                    errorMessage = 'Tidak dapat terhubung ke server.'
                } else {
                    errorMessage = err.message
                }
            }

            setError(errorMessage)

            // Use fallback if available
            if (fallbackArticles.length > 0) {
                setArticles(fallbackArticles)
            }
        } finally {
            setIsLoading(false)
        }
    }, [fallbackArticles])

    useEffect(() => {
        fetchArticles()
    }, [fetchArticles])

    // Loading State
    if (isLoading) {
        return (
            <div className="w-full">
                {/* Hero Skeleton */}
                <section className="w-full bg-gradient-to-b from-[var(--color-primary-100)] to-[var(--color-primary-300)] py-10 px-6 sm:py-12 md:py-14 lg:py-16">
                    <div className="mx-auto max-w-full sm:max-w-md md:max-w-2xl lg:max-w-4xl 2xl:max-w-6xl">
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-8 animate-pulse">
                            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6 items-center">
                                <div className="order-2 lg:order-1 space-y-4">
                                    <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                                    <div className="h-10 bg-gray-200 rounded-full w-32"></div>
                                </div>
                                <div className="order-1 lg:order-2 flex justify-center">
                                    <div className="w-full max-w-[280px] h-[180px] bg-gray-200 rounded-xl"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* List Skeleton */}
                <section className="w-full bg-white py-10 px-6 sm:py-12 lg:py-20">
                    <div className="mx-auto max-w-full sm:max-w-md md:max-w-2xl lg:max-w-4xl 2xl:max-w-5xl">
                        <div className="space-y-8">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex flex-col lg:flex-row gap-6 animate-pulse">
                                    <div className="flex-1 space-y-3">
                                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                                        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                    </div>
                                    <div className="w-full lg:w-[240px] h-48 lg:h-[180px] bg-gray-200 rounded-xl"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        )
    }

    // Error State
    if (error && articles.length === 0) {
        return (
            <section className="w-full bg-gradient-to-b from-[var(--color-primary-100)] to-[var(--color-primary-300)] py-20 px-6">
                <div className="mx-auto max-w-md text-center">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        {/* Error Icon */}
                        <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>

                        <Typography
                            as="h2"
                            size="xl"
                            weight="bold"
                            color="neutral-950"
                            className="mb-2"
                        >
                            Oops! Terjadi Kesalahan
                        </Typography>

                        <Typography
                            as="p"
                            size="base"
                            color="neutral-600"
                            className="mb-6"
                        >
                            {error}
                        </Typography>

                        <Button
                            size="md"
                            shape="solid"
                            color="accent-600"
                            onClick={fetchArticles}
                            className="px-6 py-2.5 text-gray-900 font-semibold rounded-full"
                        >
                            Coba Lagi
                        </Button>
                    </div>
                </div>
            </section>
        )
    }

    // Show error banner if using fallback data
    const showErrorBanner = error && articles.length > 0

    return (
        <>
            {showErrorBanner && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                                Gagal memuat artikel terbaru. Menampilkan data sebelumnya.
                                <button
                                    onClick={fetchArticles}
                                    className="ml-2 font-medium underline hover:text-yellow-800"
                                >
                                    Coba lagi
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Hero Carousel with Latest 5 Articles */}
            <ArticleHero articles={articles} />

            {/* Article List with Pagination */}
            <ArticleList articles={articles} itemsPerPage={itemsPerPage} />
        </>
    )
}
