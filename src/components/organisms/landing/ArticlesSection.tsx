'use client'
import { Typography, Button, Icon, Image } from '@/components'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { getPublishedArticles, DisplayArticle } from '@/lib/api/articles'

interface Article {
    id: string | number
    title: string
    description: string
    image: string
    created_date: string
    slug: string
}

export default function ArticlesSection() {
    const router = useRouter()
    const [articles, setArticles] = useState<Article[]>([])
    const [isLoading, setIsLoading] = useState(true)

    // Static data articles (fallback)
    /* 
    const staticArticles: Article[] = [
        {
            id: 1,
            title: "Python Adalah Pemrograman yang Banyak Diminati Saat ini? ",
            description: "Temukan roadmap lengkap untuk menjadi Fullstack Web Developer. Panduan berbasis kebutuhan industri yang membantu Anda memahami keterampilan, tools, dan alur belajar yang tepat.",
            image: "/src/article/python.png",
            created_date: "2026-01-15",
            slug: "python-adalah-pemrograman-banyak-diminati"
        },
        {
            id: 2,
            title: "Apakah Microservices dapat Menyelesaikan Masalah Aplikasi Anda?",
            description: "Temukan roadmap lengkap untuk menjadi Fullstack Web Developer. Panduan berbasis kebutuhan industri yang membantu Anda memahami keterampilan, tools, dan alur belajar yang tepat.",
            image: "/src/article/microservice.png",
            created_date: "2026-01-12",
            slug: "apakah-microservices-dapat-menyelesaikan-masalah-aplikasi-anda"
        },
        {
            id: 3,
            title: "Jalur Belajar Sebagai Fullstack Web Developer",
            description: "Temukan roadmap lengkap untuk menjadi Fullstack Web Developer. Panduan berbasis kebutuhan industri yang membantu Anda memahami keterampilan, tools, dan alur belajar yang tepat.",
            image: "/src/article/fullstack.png",
            created_date: "2026-01-18",
            slug: "jalur-belajar-fullstack-web-developer"
        },
        {
            id: 4,
            title: "Best Practices Testing untuk Aplikasi Mobile",
            description: "Strategi dan teknik testing khusus untuk aplikasi mobile, termasuk cross-platform testing, performance testing, usability testing, dan security testing untuk iOS dan Android.",
            image: "/src/article/python.png",
            created_date: "2026-01-10",
            slug: "best-practices-mobile-testing"
        }
    ]
    */

    // Fetch articles from API
    useEffect(() => {
        async function fetchArticles() {
            try {
                setIsLoading(true)
                const data = await getPublishedArticles()
                // Transform DisplayArticle to Article format
                const transformedArticles: Article[] = data.map((article: DisplayArticle) => ({
                    id: article.id,
                    title: article.title,
                    description: article.description,
                    image: article.image,
                    created_date: article.created_date,
                    slug: article.slug
                }))
                setArticles(transformedArticles)
            } catch (error) {
                console.error('Failed to fetch articles:', error)
                // Uncomment below to use static data as fallback
                // setArticles(staticArticles)
            } finally {
                setIsLoading(false)
            }
        }

        fetchArticles()
    }, [])

    // Get 3 latest articles berdasarkan publish date
    const getLatestArticlesData = () => {
        return [...articles]
            .sort((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime())
            .slice(0, 3)
    }

    const latestArticles = getLatestArticlesData()

    // Format tanggal untuk display (handle ISO 8601 format)
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

    return (
        <section className="bg-[#ffffff] w-full py-12 px-4 sm:px-6 md:py-18 lg:px-8 lg:py-20">
            <div className="max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-5xl 2xl:max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="mb-12">
                    <Typography
                        as="h2"
                        size="xl"
                        weight="semibold"
                        color="neutral-950"
                        className="text-2xl md:text-3xl lg:text-3xl text-center sm:text-left"
                    >
                        Article ArutalaLab
                    </Typography>
                </div>

                {/* Articles Grid */}
                <div className="space-y-6 lg:space-y-8">
                    {isLoading ? (
                        // Loading skeleton
                        Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="animate-pulse">
                                <div className="flex flex-col gap-6 lg:gap-8 lg:flex-row h-auto">
                                    <div className="flex-1 flex flex-col justify-between gap-4">
                                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                                        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                        <div className="space-y-2">
                                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                                        </div>
                                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                                    </div>
                                    <div className="w-full lg:w-[268px] h-48 sm:h-64 lg:h-[195px] bg-gray-200 rounded-3xl flex-shrink-0"></div>
                                </div>
                            </div>
                        ))
                    ) : latestArticles.length === 0 ? (
                        // Empty state
                        <div className="text-center py-12">
                            <Typography as="p" size="base" color="neutral-600">
                                Belum ada artikel yang tersedia.
                            </Typography>
                        </div>
                    ) : (
                        // Articles list
                        latestArticles.map((article) => (
                            <div
                                key={article.id}
                                className="bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="flex flex-col gap-6 lg:gap-8 lg:flex-row h-auto">
                                    {/* Left Content */}
                                    <div className="flex-1 flex flex-col justify-between gap-4">
                                        {/* Date */}
                                        <div>
                                            <Typography
                                                as="p"
                                                size="sm"
                                                weight="medium"
                                                color="accent-600"
                                                className="text-xs sm:text-sm"
                                            >
                                                {formatDate(article.created_date)}
                                            </Typography>
                                        </div>

                                        {/* Title */}
                                        <div>
                                            <Typography
                                                as="h3"
                                                size="lg"
                                                weight="semibold"
                                                color="neutral-950"
                                                className="text-lg sm:text-xl lg:text-xl line-clamp-2 leading-tight"
                                            >
                                                {article.title}
                                            </Typography>
                                        </div>

                                        {/* Description */}
                                        <div className="flex-1">
                                            <Typography
                                                as="p"
                                                size="base"
                                                weight="normal"
                                                color="neutral-600"
                                                className="text-sm sm:text-base line-clamp-3 leading-relaxed"
                                            >
                                                {article.description}
                                            </Typography>
                                        </div>

                                        {/* Read More Button */}
                                        <div>
                                            <button
                                                className="group flex items-center gap-2 text-[var(--color-accent-600)] hover:text-[var(--color-accent-700)] transition-colors duration-200 cursor-pointer"
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

                                    {/* Right Image */}
                                    <div className="w-full lg:w-[268px] h-48 sm:h-64 lg:h-auto flex-shrink-0">
                                        <Image
                                            src={article.image}
                                            alt={article.title}
                                            fullWidth={true}
                                            aspectRatio="auto"
                                            shape="rounded"
                                            fit="cover"
                                            className="w-full h-full lg:h-[195px] rounded-3xl"
                                            onClick={() => router.push(`/articles/${article.slug}`)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* View All Articles Button */}
                <div className="flex justify-center mt-12 lg:mt-16">
                    <Button
                        size="sm"
                        shape="outline"
                        color="accent-600"
                        className="px-6 py-3 sm:px-8 sm:py-3 lg:px-10 lg:py-4 text-black text-sm sm:text-base font-medium rounded-full border-2 hover:bg-[var(--color-accent-50)] transition-all duration-200"
                        onClick={() => router.push('/articles')}
                    >
                        Lihat Semua Artikel
                    </Button>
                </div>
            </div>

            {/* CSS untuk line-clamp jika belum ada
            <style jsx>{`
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                
                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style> */}
        </section>
    )
}
