'use client'
import { Typography, Button, Image } from '@/components'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'

interface Article {
    id?: string | number
    title: string
    description: string
    image: string
    slug: string
}

interface ArticleHeroProps {
    articles: Article[]
}

/**
 * ArticleHero - Hero carousel section for article page with featured articles
 * Shows max 5 latest articles with slide animation and dot pagination
 */
export function ArticleHero({ articles }: ArticleHeroProps) {
    const router = useRouter()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    // Limit to max 5 articles
    const displayArticles = articles.slice(0, 5)
    const currentArticle = displayArticles[currentIndex] || displayArticles[0]
    const articlesCount = displayArticles.length

    // Clear interval helper
    const clearAutoSlide = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
    }

    // Start auto-slide with animation
    const startAutoSlide = () => {
        clearAutoSlide()
        if (articlesCount > 1) {
            intervalRef.current = setInterval(() => {
                setIsAnimating(true)
                setCurrentIndex((prev) => (prev + 1) % articlesCount)
                setTimeout(() => setIsAnimating(false), 500)
            }, 5000)
        }
    }

    // Auto-slide effect
    useEffect(() => {
        startAutoSlide()
        return () => clearAutoSlide()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [articlesCount])

    // Navigation handlers
    const goToNext = () => {
        if (isAnimating) return
        setIsAnimating(true)
        setCurrentIndex((prev) => (prev + 1) % displayArticles.length)
        startAutoSlide()
        setTimeout(() => setIsAnimating(false), 500)
    }

    const goToPrevious = () => {
        if (isAnimating) return
        setIsAnimating(true)
        setCurrentIndex((prev) => (prev - 1 + displayArticles.length) % displayArticles.length)
        startAutoSlide()
        setTimeout(() => setIsAnimating(false), 500)
    }

    const goToSlide = (index: number) => {
        if (isAnimating || index === currentIndex) return
        setIsAnimating(true)
        setCurrentIndex(index)
        startAutoSlide()
        setTimeout(() => setIsAnimating(false), 500)
    }


    return (
        <section className="w-full bg-gradient-to-b from-[var(--color-primary-100)] to-[var(--color-primary-300)] py-10 px-6 sm:py-12 md:py-14 lg:py-16">
            <div className="mx-auto max-w-full sm:max-w-md md:max-w-2xl lg:max-w-4xl 2xl:max-w-6xl">
                {/* White Content Box */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Carousel Container */}
                    <div className="relative">
                        <div
                            className="transition-all duration-500 ease-in-out"
                            style={{
                                opacity: isAnimating ? 0 : 1,
                                transform: isAnimating ? 'translateX(20px)' : 'translateX(0)'
                            }}
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6 lg:gap-0 2xl:gap-0 items-center p-8 lg:p-0">
                                {/* Left Content */}
                                <div className="order-2 lg:order-1 space-y-4 sm:space-y-5 lg:space-y-1">
                                    {/* Title - Fixed 2 lines with ellipsis */}
                                    <Typography
                                        as="h1"
                                        size="2xl"
                                        weight="bold"
                                        color="neutral-950"
                                        className="text-2xl sm:text-3xl md:text-3xl lg:text-2xl 2xl:text-3xl leading-tight lg:ml-8 line-clamp-4 lg:line-clamp-2"
                                    >
                                        {currentArticle.title}
                                    </Typography>

                                    {/* Description */}
                                    <Typography
                                        as="p"
                                        size="base"
                                        color="neutral-950"
                                        className="text-sm sm:text-base md:text-base lg:text-sm 2xl:text-base leading-relaxed lg:ml-8 lg:my-4 line-clamp-3 lg:line-clamp-2"
                                    >
                                        {currentArticle.description}
                                    </Typography>

                                    {/* CTA Button */}
                                    <div className="lg:ml-8">
                                        <Button
                                            size="md"
                                            shape="solid"
                                            color="accent-600"
                                            onClick={() => router.push(`/articles/${currentArticle.slug}`)}
                                            className="px-6 py-2.5 sm:px-8 sm:py-3 lg:px-6 lg:py-2.5 text-gray-900 font-semibold rounded-full text-sm sm:text-base lg:text-sm shadow-lg hover:shadow-xl transition-all"
                                        >
                                            Selengkapnya
                                        </Button>
                                    </div>
                                </div>

                                {/* Right Image */}
                                <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                                    <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[300px] 2xl:max-w-[360px] rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                                        <Image
                                            src={currentArticle.image}
                                            alt={currentArticle.title}
                                            fullWidth={true}
                                            aspectRatio="landscape"
                                            shape="rounded"
                                            fit="cover"
                                            className="w-full h-full rounded-2xl cursor-pointer scale-105 hover:scale-107 transition-transform duration-500"
                                            onClick={() => router.push(`/articles/${currentArticle.slug}`)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Controls - Outside white box */}
                <div className="flex items-center justify-center mt-6">
                    {/* Previous Button */}
                    <button
                        onClick={goToPrevious}
                        disabled={isAnimating}
                        className="bg-transparent hover:opacity-80 p-2 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Previous slide"
                    >
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-accent-600)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Dot Indicators */}
                    <div className="flex justify-center gap-2">
                        {displayArticles.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                disabled={isAnimating}
                                className={`transition-all duration-300 rounded-full ${index === currentIndex
                                    ? 'w-8 h-2 bg-[var(--color-accent-600)]'
                                    : 'w-2 h-2 bg-[var(--color-accent-400)] hover:bg-gray-100'
                                    } disabled:cursor-not-allowed`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={goToNext}
                        disabled={isAnimating}
                        className="bg-transparent hover:opacity-80 p-2 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Next slide"
                    >
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-accent-600)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    )
}
