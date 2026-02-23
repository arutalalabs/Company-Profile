'use client'
import { Typography, Button, Icon, Image } from '@/components'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface Article {
    id: string | number
    title: string
    description: string
    image: string
    created_date: string
    slug: string
}

interface ArticleListProps {
    articles: Article[]
    itemsPerPage?: number
}

/**
 * ArticleList - List of articles with pagination
 */
export function ArticleList({ articles, itemsPerPage = 6 }: ArticleListProps) {
    const router = useRouter()
    const [currentPage, setCurrentPage] = useState(1)

    // Calculate pagination
    const totalPages = Math.ceil(articles.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentArticles = articles.slice(startIndex, endIndex)

    // Format date (handle ISO 8601 format)
    const formatDate = (dateString: string) => {
        if (!dateString) return ''

        const date = new Date(dateString)
        // Check if date is valid
        if (isNaN(date.getTime())) return ''

        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
        return date.toLocaleDateString('id-ID', options)
    }

    // Pagination handlers
    const goToPage = (page: number) => {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const goToPrevPage = () => {
        if (currentPage > 1) goToPage(currentPage - 1)
    }

    const goToNextPage = () => {
        if (currentPage < totalPages) goToPage(currentPage + 1)
    }

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages = []
        const maxPagesToShow = 5

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= maxPagesToShow; i++) {
                    pages.push(i)
                }
            } else if (currentPage >= totalPages - 2) {
                for (let i = totalPages - maxPagesToShow + 1; i <= totalPages; i++) {
                    pages.push(i)
                }
            } else {
                for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                    pages.push(i)
                }
            }
        }

        return pages
    }

    return (
        <section className="w-full bg-white py-10 px-6 sm:py-12 lg:py-20">
            <div className="mx-auto max-w-full sm:max-w-md md:max-w-2xl lg:max-w-4xl 2xl:max-w-5xl">
                {/* Articles Grid */}
                <div className="space-y-6 sm:space-y-7 lg:space-y-18">
                    {currentArticles.map((article) => (
                        <div
                            key={article.id}
                            className="bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="flex flex-col lg:flex-row gap-5 lg:gap-22 2xl:gap-24">
                                {/* Image - Top on mobile/tablet, Right on desktop */}
                                <div className="w-full lg:w-[240px] 2xl:w-[280px] h-48 sm:h-56 lg:h-[180px] 2xl:h-[180px] flex-shrink-0 order-1 lg:order-2">
                                    <Image
                                        src={article.image}
                                        alt={article.title}
                                        fullWidth={true}
                                        aspectRatio="auto"
                                        shape="rounded"
                                        fit="cover"
                                        className="w-full h-full rounded-2xl cursor-pointer hover:opacity-90 transition-opacity"
                                        onClick={() => router.push(`/articles/${article.slug}`)}
                                    />
                                </div>

                                {/* Content - Below image on mobile/tablet, Left on desktop */}
                                <div className="flex-1 flex flex-col justify-between gap-3 sm:gap-4 order-2 lg:order-1">
                                    {/* Date */}
                                    <Typography
                                        as="p"
                                        size="sm"
                                        weight="medium"
                                        color="accent-600"
                                        className="text-xs sm:text-sm"
                                    >
                                        {formatDate(article.created_date)}
                                    </Typography>

                                    {/* Title */}
                                    <h3
                                        className="text-lg sm:text-xl lg:text-lg 2xl:text-xl font-semibold text-[var(--color-neutral-950)] line-clamp-2 leading-tight hover:text-[var(--color-accent-600)] transition-colors cursor-pointer"
                                        onClick={() => router.push(`/articles/${article.slug}`)}
                                    >
                                        {article.title}
                                    </h3>

                                    {/* Description */}
                                    <Typography
                                        as="p"
                                        size="base"
                                        weight="normal"
                                        color="neutral-600"
                                        className="text-sm sm:text-base lg:text-sm 2xl:text-base line-clamp-3 leading-relaxed"
                                    >
                                        {article.description}
                                    </Typography>

                                    {/* Read More Button */}
                                    <button
                                        className="group flex items-center gap-2 text-[var(--color-accent-600)] hover:text-[var(--color-accent-700)] transition-colors duration-200 cursor-pointer self-start"
                                        onClick={() => router.push(`/articles/${article.slug}`)}
                                    >
                                        <Typography
                                            as="span"
                                            size="sm"
                                            weight="semibold"
                                            color="accent-600"
                                            className="text-sm sm:text-base group-hover:text-[var(--color-accent-700)]"
                                        >
                                            Baca Selengkapnya
                                        </Typography>
                                        <Icon
                                            icon="arrow-right"
                                            type="image"
                                            src="/src/article/rightarrow.svg"
                                            size="sm"
                                            color="accent-600"
                                            alt="Arrow Right"
                                            className="transition-transform group-hover:translate-x-1 w-4 h-4 sm:w-5 sm:h-5"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 sm:gap-3 mt-10 lg:mt-12">
                        {/* Previous Button */}
                        <button
                            onClick={goToPrevPage}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium transition-all ${currentPage === 1
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-[var(--color-accent-600)] text-gray-900 hover:bg-[var(--color-accent-700)] shadow-md hover:shadow-lg'
                                }`}
                        >
                            Prev
                        </button>

                        {/* Page Numbers */}
                        <div className="flex gap-1 sm:gap-2">
                            {getPageNumbers().map((pageNum) => (
                                <button
                                    key={pageNum}
                                    onClick={() => goToPage(pageNum)}
                                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg text-sm sm:text-base font-medium transition-all ${currentPage === pageNum
                                        ? 'bg-[var(--color-accent-600)] text-gray-900 shadow-lg scale-110'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {pageNum}
                                </button>
                            ))}
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium transition-all ${currentPage === totalPages
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-[var(--color-accent-600)] text-gray-900 hover:bg-[var(--color-accent-700)] shadow-md hover:shadow-lg'
                                }`}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}
