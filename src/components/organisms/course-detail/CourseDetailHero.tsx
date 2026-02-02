'use client'
import { Typography, Button, Tag } from '@/components'
import { useRouter } from 'next/navigation'

interface CourseDetailHeroProps {
    title: string
    description: string
    course_field_name: string
    category: string
    posterUrl?: string
    startDate?: string
    endDate?: string
    onRegisterClick?: () => void
    onDemoClick?: () => void
}

/**
 * CourseDetailHero - Hero section for course detail page
 * 
 * Displays course title, description, category badge, and poster image
 * with registration and demo buttons
 */
export function CourseDetailHero({
    title,
    description,
    course_field_name,
    category,
    posterUrl,
    startDate,
    endDate,
    onRegisterClick,
    onDemoClick
}: CourseDetailHeroProps) {
    const router = useRouter()

    // Format date helper
    const formatDate = (dateString?: string) => {
        if (!dateString) return ''
        const date = new Date(dateString)
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
    }

    // Scroll to content below
    const scrollToContent = () => {
        window.scrollTo({
            top: window.innerHeight - 100,
            behavior: 'smooth'
        })
    }

    return (
        <section className="w-full bg-gradient-to-b from-[var(--color-primary-100)] to-[var(--color-primary-300)] relative overflow-hidden">

            {/* Geometric Shapes */}
            <div className="absolute top-12 left-4 w-8 h-8 sm:top-16 sm:left-6 sm:w-10 sm:h-10 lg:top-20 lg:left-10 lg:w-16 lg:h-16 bg-[var(--color-accent-600)]/20 sm:bg-[var(--color-accent-600)]/30 lg:bg-[var(--color-accent-600)]/100 rounded-full animate-[float_3s_ease-in-out_infinite]"></div>
            <div className="absolute top-20 right-4 w-6 h-6 sm:top-28 sm:right-8 sm:w-8 sm:h-8 lg:top-40 lg:right-20 lg:w-12 lg:h-12 bg-[var(--color-accent-600)]/20 sm:bg-[var(--color-accent-600)]/30 lg:bg-[var(--color-accent-600)]/100 rounded-full animate-[float_4s_ease-in-out_infinite_0.5s]"></div>
            
            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes wave {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px) scale(1); }
                    50% { transform: translateY(-10px) scale(1.05); }
                }
            `}</style>

            <div className="relative z-10 py-10 lg:py-16">
                <div className="mx-auto max-w-xs sm:max-w-md md:max-w-xl lg:max-w-5xl 2xl:max-w-7xl px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-center">
                        {/* Left Content */}
                        <div className="order-2 lg:order-1">
                            {/* Category Badge */}
                            <Tag 
                                variant="outline" 
                                size="sm"
                                color='primary-900'
                                className='mb-4 mr-2 text-black rounded-lg text-white !bg-[var(--color-primary-900)]'
                            >
                                {category}
                            </Tag>

                            <Tag 
                                variant="outline" 
                                size="sm"
                                color='primary-900'
                                className='mb-4 text-black rounded-lg'
                            >
                                {course_field_name}
                            </Tag>

                            {/* Title */}
                            <Typography
                                as="h1"
                                size="2xl"
                                weight="bold"
                                color="neutral-950"
                                className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl mb-4 leading-tight"
                            >
                                {title}
                            </Typography>

                            {/* Description */}
                            <Typography
                                as="p"
                                size="base"
                                color="neutral-950"
                                className="text-sm sm:text-base lg:text-base 2xl:text-lg opacity-90 mb-6 leading-relaxed"
                            >
                                {description}
                            </Typography>

                            {/* Course Duration and Action Buttons */}
                            <div className="w-auto sm:w-xl xl:w-2xl bg-white rounded-2xl py-4 px-6 shadow-lg flex flex-col items-center sm:items-start sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4">
                                {/* Date Info */}
                                {(startDate || endDate) && (
                                    <div className="flex flex-col sm:mr-8 lg:mr-32 xl:mr-32">
                                        {startDate && (
                                            <p className="text-sm text-gray-900 mb-1">
                                                <span className="font-semibold">Start</span> {formatDate(startDate)}
                                            </p>
                                        )}
                                        {endDate && (
                                            <p className="text-sm text-gray-900">
                                                <span className="font-semibold">Ends</span> {formatDate(endDate)}
                                            </p>
                                        )}
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                                    <Button
                                        size="md"
                                        onClick={onRegisterClick || (() => {})}
                                        className="bg-[#FFA500] hover:bg-[#FF8C00] text-white border-0 px-6 py-2.5 rounded-full text-sm font-medium shadow-none"
                                    >
                                        Daftar Sekarang
                                    </Button>
                                    <Button
                                        size="md"
                                        onClick={onDemoClick || scrollToContent}
                                        className="bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-300 px-6 py-2.5 rounded-full text-sm font-medium shadow-none"
                                    >
                                        Lihat Detail
                                    </Button>
                                </div>
                            </div>

                            
                        </div>

                        {/* Right Content - Poster Image */}
                        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                            <div className="w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[380px] 2xl:max-w-[420px] rounded-2xl overflow-hidden shadow-2xl">
                                {posterUrl ? (
                                    <img
                                        src={posterUrl}
                                        alt={title}
                                        className="w-full h-auto object-cover"
                                    />
                                ) : (
                                    <div className="w-full aspect-[3/4] bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                                        <div className="text-center p-6">
                                            <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                                                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                </svg>
                                            </div>
                                            <Typography
                                                as="p"
                                                size="lg"
                                                weight="bold"
                                                color="neutral-50"
                                            >
                                                {title}
                                            </Typography>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
