'use client'
import { Typography, Button, Icon, Image, formatDateIndonesia } from '@/components'
import { useRouter } from 'next/navigation'
import { useArticles } from '@/hooks/useArticles'
import { ROUTES } from '@/constants/routes'

export default function ArticlesSection() {
    const router = useRouter()
    const { articles: latestArticles, loading: isLoading } = useArticles(3)

    return (
        <section className="bg-white w-full py-12 px-4 sm:px-6 md:py-18 lg:px-8 lg:py-20">
            <div className="max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-5xl 2xl:max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="mb-12">
                    <Typography
                        as="h2"
                        size="xl"
                        weight="semibold"
                        color="neutral-950"
                        className="text-xl md:text-2xl lg:text-2xl 2xl:text-3xl text-center sm:text-left"
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
                                                {formatDateIndonesia(article.created_date)}
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
                                                onClick={() => router.push(`${ROUTES.ARTICLES}/${article.slug}`)}
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
                                            onClick={() => router.push(`${ROUTES.ARTICLES}/${article.slug}`)}
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
                        className="px-6 py-3 sm:px-8 sm:py-3 !lg:px-7 !lg:py-3 !2xl:px-10 !2xl:py-4 text-black text-sm sm:text-base font-medium rounded-full border-2 hover:bg-[var(--color-accent-50)] transition-all duration-200"
                        onClick={() => router.push(ROUTES.ARTICLES)}
                    >
                        Lihat Semua Artikel
                    </Button>
                </div>
            </div>
        </section>
    )
}
