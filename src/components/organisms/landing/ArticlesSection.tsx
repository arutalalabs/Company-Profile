'use client'
import { Typography, Button, Icon, Image } from '@/components'
import { useRouter } from 'next/navigation'

interface Article {
    id: number
    title: string
    description: string
    image: string
    publishDate: string
    slug: string
}

export default function ArticlesSection() {
    const router = useRouter()

    // Data articles
    const articles: Article[] = [
        {
            id: 1,
            title: "Python Adalah Pemrograman yang Banyak Diminati Saat ini? ",
            description: "Temukan roadmap lengkap untuk menjadi Fullstack Web Developer. Panduan berbasis kebutuhan industri yang membantu Anda memahami keterampilan, tools, dan alur belajar yang tepat.",
            image: "/src/article/python.png",
            publishDate: "2026-01-15",
            slug: "python-adalah-pemrograman-banyak-diminati"
        },
        {
            id: 2,
            title: "Apakah Microservices dapat Menyelesaikan Masalah Aplikasi Anda?",
            description: "Temukan roadmap lengkap untuk menjadi Fullstack Web Developer. Panduan berbasis kebutuhan industri yang membantu Anda memahami keterampilan, tools, dan alur belajar yang tepat.",
            image: "/src/article/microservice.png",
            publishDate: "2026-01-12",
            slug: "apakah-microservices-dapat-menyelesaikan-masalah-aplikasi-anda"
        },
        {
            id: 3,
            title: "Jalur Belajar Sebagai Fullstack Web Developer",
            description: "Temukan roadmap lengkap untuk menjadi Fullstack Web Developer. Panduan berbasis kebutuhan industri yang membantu Anda memahami keterampilan, tools, dan alur belajar yang tepat.",
            image: "/src/article/fullstack.png",
            publishDate: "2026-01-18",
            slug: "jalur-belajar-fullstack-web-developer"
        },
        {
            id: 4,
            title: "Best Practices Testing untuk Aplikasi Mobile",
            description: "Strategi dan teknik testing khusus untuk aplikasi mobile, termasuk cross-platform testing, performance testing, usability testing, dan security testing untuk iOS dan Android.",
            image: "/src/article/article-4.webp",
            publishDate: "2026-01-10",
            slug: "best-practices-mobile-testing"
        }
    ]

    // Get 3 latest articles berdasarkan publish date
    const getLatestArticlesData = () => {
        return articles
            .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
            .slice(0, 3)
    }

    const latestArticles = getLatestArticlesData()

    // Format tanggal untuk display
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        }
        return new Date(dateString).toLocaleDateString('id-ID', options)
    }

    return (
        <section className="bg-[#ffffff] w-full py-12 px-4 sm:px-6 lg:px-8 lg:py-20">
            <div className="max-w-7xl mx-auto">
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
                    {latestArticles.map((article) => (
                        <div
                            key={article.id}
                            className="bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="flex flex-col gap-16 lg:flex-row h-auto lg:h-[195px]">
                                {/* Left Content */}
                                <div className="flex-1 flex flex-col justify-between">
                                    {/* Date */}
                                    <div className="mb-4">
                                        <Typography
                                            as="p"
                                            size="sm"
                                            weight="medium"
                                            color="accent-600"
                                            className="text-xs sm:text-sm"
                                        >
                                            {formatDate(article.publishDate)}
                                        </Typography>
                                    </div>

                                    {/* Title - Max 2 lines */}
                                    <div className="mb-4 flex-shrink-0">
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

                                    {/* Description - Max 3 lines */}
                                    <div className="mb-6 flex-1">
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
                                    <div className="flex-shrink-0 mb-4">
                                        <button 
                                            className="group flex items-center gap-2 text-[var(--color-accent-600)] hover:text-[var(--color-accent-700)] transition-colors duration-200 cursor-pointer"
                                            onClick={() => router.push(`/article/${article.slug}`)}
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
                                                src="/src/rightarrow.svg"
                                                size="sm"
                                                color="accent-600"
                                                alt="Arrow Right"
                                                className="transition-transform group-hover:translate-x-1 w-4 h-4 sm:w-5 sm:h-5"
                                            />
                                        </button>
                                    </div>
                                </div>

                                {/* Right Image */}
                                <div className="w-full lg:w-[268px] h-48 sm:h-64 lg:h-[195px] flex-shrink-0">
                                    <Image
                                        src={article.image}
                                        alt={article.title}
                                        fullWidth={true}
                                        aspectRatio="auto"
                                        shape="rounded"
                                        fit="cover"
                                        className="w-full h-full rounded-3xl"
                                        onClick={() => router.push(`/article/${article.slug}`)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
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

            {/* CSS untuk line-clamp jika belum ada */}
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
            `}</style>
        </section>
    )
}
