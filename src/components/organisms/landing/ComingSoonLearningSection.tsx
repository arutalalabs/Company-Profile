'use client'
import { Typography, Button, Icon, Image } from '@/components'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { getUpcomingCourses, UpcomingCourse, generateCourseSlug } from '@/lib/api/courses'

export default function ComingSoonLearningSection() {
    const router = useRouter()
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [showPosterModal, setShowPosterModal] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [courses, setCourses] = useState<UpcomingCourse[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Fetch upcoming courses from API
    useEffect(() => {
        async function fetchCourses() {
            try {
                setLoading(true)
                const response = await getUpcomingCourses()
                setCourses(response.data)
                setError(null)
            } catch (err) {
                console.error('Error fetching upcoming courses:', err)
                setError(err instanceof Error ? err.message : 'Gagal memuat data pelatihan')

                // Fallback data jika API gagal
                setCourses([
                    {
                        course_id: 'fallback-1',
                        course_title: 'Software Quality Assurance',
                        course_description: 'Peserta memahami fundamental software testing dan menerapkannya dalam pengujian software, baik skala kecil, menengah maupun skala besar',
                        course_category_name: 'Bootcamp',
                        nearest_batch: {
                            name: 'SQA Batch 1',
                            posterUrl: '/src/poster/sqaintensif.png',
                            start_date: '2026-02-01',
                            registration_end: '2026-01-31'
                        }
                    }
                ])
            } finally {
                setLoading(false)
            }
        }

        fetchCourses()
    }, [])

    const handlePosterClick = () => {
        setShowPosterModal(true)
    }

    const closePosterModal = () => {
        setShowPosterModal(false)
    }

    // Fixed categories untuk konsistensi UI
    const categories = ['Bootcamp', 'Offline/Online Class', 'Webinar', 'Workshop']

    // Filter courses by selected category
    const selectedCategory = categories[selectedIndex] || categories[0]
    const filteredCourses = courses.filter(course => course.course_category_name === selectedCategory)
    const currentCourse = filteredCourses[0]

    // Current poster from API
    const currentPoster = currentCourse?.nearest_batch?.posterUrl
    const hasPoster = currentPoster && currentPoster.length > 0

    // Show loading state
    if (loading) {
        return (
            <section className="w-full py-12 px-4 sm:px-6 lg:px-8 lg:py-20">
                <div className="max-w-7xl mx-auto rounded-2xl bg-gradient-to-b from-[var(--color-primary-100)] to-[var(--color-primary-300)] p-12 text-center">
                    <Typography as="p" size="lg" color="neutral-950">
                        Memuat pelatihan mendatang...
                    </Typography>
                </div>
            </section>
        )
    }

    // Show error only in console
    if (error) {
        console.warn('Upcoming Courses API Error:', error)
    }

    // Don't render if no courses
    if (courses.length === 0) {
        return null
    }

    return (
        <>
            <section id="coming-soon-learning" className="w-full py-12 px-4 sm:px-6 lg:px-8 lg:py-20">
                <div className="max-w-md md:max-w-2xl lg:max-w-5xl 2xl:max-w-7xl mx-auto rounded-2xl bg-gradient-to-b from-[var(--color-primary-100)] to-[var(--color-primary-300)] relative overflow-hidden lg:h-auto">
                    {/* Container untuk layout 60-40 */}
                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 relative z-10">
                        {/* Konten Detail Pelatihan - 60% */}
                        <div className="w-full lg:w-[60%] space-y-6 lg:space-y-8 p-6 md:p-8 lg:p-12 lg:">
                            {/* Section Title & Description */}
                            <div className="space-y-4">
                                <Typography
                                    as="h2"
                                    size="xl"
                                    weight="semibold"
                                    color="neutral-950"
                                    className="text-2xl md:text-2xl 2xl:text-3xl"
                                >
                                    Pelatihan Mendatang
                                </Typography>
                                <Typography
                                    as="p"
                                    size="base"
                                    weight="normal"
                                    color="neutral-950"
                                    className="text-sm md:text-base leading-relaxed"
                                >
                                    Bergabunglah dengan program pelatihan terbaru kami dan tingkatkan skill teknis Anda bersama mentor berpengalaman.
                                </Typography>
                            </div>

                            {/* Field Training Menu */}
                            <div className="">
                                {/* Mobile: Dropdown */}
                                <div className="sm:hidden relative">
                                    <button
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="w-auto bg-[var(--color-accent-600)] text-[var(--color-neutral-950)] rounded-full px-4 py-2.5 text-sm gap-4 font-medium flex items-center justify-between"
                                    >
                                        <span>{selectedCategory}</span>
                                        <svg
                                            className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {isDropdownOpen && (
                                        <>
                                            {/* Backdrop */}
                                            <div
                                                className="fixed inset-0 z-10"
                                                onClick={() => setIsDropdownOpen(false)}
                                            />

                                            {/* Dropdown Menu */}
                                            <div className="absolute top-full left-0 right-0 mt-2 bg-[var(--color-primary-900)] rounded-2xl shadow-lg z-20 overflow-hidden">
                                                {categories.map((category, index) => (
                                                    <button
                                                        key={category}
                                                        onClick={() => {
                                                            setSelectedIndex(index);
                                                            setIsDropdownOpen(false);
                                                        }}
                                                        className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${selectedIndex === index
                                                            ? 'bg-[var(--color-accent-600)] text-[var(--color-neutral-950)]'
                                                            : 'text-[var(--color-neutral-50)] hover:bg-[var(--color-accent-600)] hover:text-[var(--color-neutral-950)]'
                                                            }`}
                                                    >
                                                        {category}
                                                    </button>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Desktop: Button Group */}
                                <div className="bg-[var(--color-primary-900)] rounded-full p-1 hidden sm:flex">
                                    {categories.map((category, index) => (
                                        <Button
                                            key={category}
                                            size="md"
                                            shape="solid"
                                            color="neutral-50"
                                            className={`flex-auto h-auto text-xs sm:text-sm font-medium transition-all duration-200 border-0 lg:text-medium px-0 py-0 lg:px-1 lg:py-3 ${selectedIndex === index
                                                ? 'bg-[var(--color-accent-600)] text-[var(--color-neutral-950)] hover:bg-[var(--color-accent-700)]'
                                                : 'bg-transparent text-[var(--color-neutral-50)] hover:bg-[var(--color-accent-600)] hover:text-[var(--color-neutral-950)]'
                                                }`}
                                            onClick={() => setSelectedIndex(index)}
                                        >
                                            {category}
                                        </Button>
                                    ))}
                                </div>

                                {/* Mobile Poster - Ditampilkan di atas */}
                                <div className="w-full mt-8 mb-8 lg:hidden sm:px-2 md:px-10">
                                    {currentCourse && hasPoster ? (
                                        <div
                                            className="relative cursor-pointer group max-w-md max-h-md mx-auto"
                                            onClick={handlePosterClick}
                                        >
                                            <Image
                                                src={currentPoster!}
                                                alt={`${currentCourse.course_title} Poster`}
                                                fullWidth={true}
                                                aspectRatio="auto"
                                                shape="rounded"
                                                fit="cover"
                                                className="w-full h-full rounded-2xl transition-all duration-300 object-cover"
                                            />
                                            {/* Overlay on hover untuk mobile */}
                                            <div className="absolute inset-0 bg-black/5 opacity-0 group-active:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="max-w-md mx-auto aspect-[3/4] rounded-2xl bg-gradient-to-br from-[var(--color-primary-800)]/50 to-[var(--color-primary-900)]/50 border border-[var(--color-primary-700)]/30 backdrop-blur-sm flex flex-col items-center justify-center p-6 space-y-4 relative overflow-hidden group">
                                            {/* Decorative Background Elements */}
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-accent-600)]/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>

                                            {/* Icon Container with Pulse Effect */}
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-[var(--color-accent-600)]/20 rounded-full blur-xl animate-pulse"></div>
                                                <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[var(--color-primary-700)] to-[var(--color-primary-800)] border border-[var(--color-primary-600)] flex items-center justify-center shadow-lg">
                                                    <svg className="w-8 h-8 text-[var(--color-accent-400)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                                {/* Floating Badge */}
                                                <div className="absolute -top-1 -right-1 bg-[var(--color-accent-600)] text-[var(--color-neutral-950)] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg transform rotate-12">
                                                    SOON
                                                </div>
                                            </div>

                                            <div className="text-center space-y-2 relative z-10">
                                                <Typography
                                                    as="h4"
                                                    size="lg"
                                                    weight="bold"
                                                    color="neutral-50"
                                                    className="text-center tracking-tight"
                                                >
                                                    {currentCourse?.course_title || selectedCategory}
                                                </Typography>
                                                <Typography
                                                    as="p"
                                                    size="sm"
                                                    weight="normal"
                                                    color="neutral-50"
                                                    className="text-center max-w-[200px] mx-auto leading-relaxed opacity-70"
                                                >
                                                    {currentCourse ? 'Poster sedang dipersiapkan.' : 'Jadwal belum tersedia.'}
                                                </Typography>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Training Details */}
                            <div className="space-y-4 lg:space-y-6 lg:mt-10">
                                {currentCourse ? (
                                    <>
                                        <Typography
                                            as="h3"
                                            size="lg"
                                            weight="medium"
                                            color="neutral-950"
                                            className="text-md text-medium sm:text-semibold md:text-2xl lg:text-2xl"
                                        >
                                            {currentCourse.course_title}
                                        </Typography>
                                        <Typography
                                            as="p"
                                            size="base"
                                            weight="normal"
                                            color="neutral-950"
                                            className="text-sm md:text-base leading-relaxed line-clamp-3"
                                        >
                                            {currentCourse.course_description}
                                        </Typography>
                                    </>
                                ) : (
                                    <>
                                        <Typography
                                            as="h3"
                                            size="lg"
                                            weight="medium"
                                            color="neutral-950"
                                            className="text-md text-medium sm:text-semibold md:text-2xl lg:text-2xl"
                                        >
                                            Jadwal Segera Hadir
                                        </Typography>
                                        <Typography
                                            as="p"
                                            size="base"
                                            weight="normal"
                                            color="neutral-600"
                                            className="text-sm md:text-base leading-relaxed pl-0"
                                        >
                                            Saat ini kami sedang menyusun program {selectedCategory} terbaik untuk Anda. Nantikan update jadwal selanjutnya!
                                        </Typography>
                                    </>
                                )}
                            </div>

                            {/* Training Button */}
                            {currentCourse && (
                                <div className="">
                                    <button
                                        className="group flex items-center gap-2 text-[var(--color-accent-600)] hover:text-[var(--color-accent-700)] transition-colors duration-200 cursor-pointer"
                                        onClick={() => router.push(`/courses/${generateCourseSlug(currentCourse.course_title)}`)}
                                    >
                                        <Typography
                                            as="span"
                                            size="sm"
                                            weight="semibold"
                                            color="accent-600"
                                            className="text-sm md:text-base group-hover:text-[var(--color-accent-700)]"
                                        >
                                            Lihat Detail
                                        </Typography>
                                        <Icon
                                            icon="arrow-right"
                                            type="image"
                                            src="/src/common/rightarrow.svg"
                                            size="sm"
                                            color="accent-600"
                                            alt="Arrow"
                                            className="transition-transform group-hover:translate-x-1 w-4 h-4 md:w-5 md:h-4 "
                                        />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Poster Area - Absolute Positioned Full Right */}
                    <div className="h-full absolute top-0 right-0 bottom-0 w-[30%%] hidden lg:block z-20">
                        {currentCourse && hasPoster ? (
                            <div
                                className="relative w-full h-full cursor-pointer group"
                                onClick={handlePosterClick}
                            >
                                <Image
                                    src={currentPoster!}
                                    alt={`${currentCourse.course_title} Poster`}
                                    fullWidth={true}
                                    aspectRatio="auto"
                                    shape="rounded"
                                    fit="contain"
                                    className="w-full h-full rounded-2xl transition-all duration-300 group-hover:scale-95"
                                />
                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                                    <div className="bg-[var(--color-primary-900)] backdrop-blur-sm rounded-full py-2 px-4">
                                        <Typography
                                            as="span"
                                            size="sm"
                                            weight="medium"
                                            color="neutral-50"
                                            className="text-xs"
                                        >
                                            Klik untuk memperbesar
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full lg:w-100 h-full rounded-2xl bg-gradient-to-br from-[var(--color-primary-900)]/70 to-[var(--color-primary-900)]/90 border border-[var(--color-primary-700)] backdrop-blur-sm flex flex-col items-center justify-center p-8 space-y-6 relative overflow-hidden group">
                                {/* Icon Container with Pulse Effect */}
                                <div className="relative">
                                    <div className="absolute inset-0 bg-[var(--color-accent-600)]/20 rounded-full blur-xl animate-pulse"></div>
                                    <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[var(--color-primary-700)] to-[var(--color-primary-800)] border border-[var(--color-primary-600)] flex items-center justify-center shadow-xl">
                                        <svg className="w-10 h-10 text-[var(--color-accent-400)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    {/* Floating Badge */}
                                    <div className="absolute -top-2 -right-2 bg-[var(--color-accent-600)] text-[var(--color-neutral-950)] text-[10px] font-bold px-2 py-1 rounded-full shadow-lg transform rotate-12">
                                        SOON
                                    </div>
                                </div>

                                <div className="text-center space-y-2 relative z-10">
                                    <Typography
                                        as="h4"
                                        size="lg"
                                        weight="bold"
                                        color="neutral-50"
                                        align='center'
                                        className="text-center tracking-tight"
                                    >
                                        {currentCourse?.course_title || selectedCategory}
                                    </Typography>
                                    <Typography
                                        as="p"
                                        size="sm"
                                        weight="normal"
                                        color="neutral-50"
                                        align="center"
                                        className="max-w-[200px] mx-auto leading-relaxed opacity-60"
                                    >
                                        {currentCourse ? 'Poster sedang dipersiapkan tim kami.' : 'Jadwal pelatihan belum tersedia.'}
                                    </Typography>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section >

            {/* Poster Modal */}
            {
                showPosterModal && currentCourse && hasPoster && (
                    <div
                        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                        onClick={closePosterModal}
                    >
                        <div className="relative lg:max-w-lg lg:max-h-[79vh] w-full">
                            <button
                                onClick={closePosterModal}
                                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                            >
                                <Typography
                                    as="span"
                                    size="lg"
                                    weight="normal"
                                    color="neutral-50"
                                >
                                    ✕ Tutup
                                </Typography>
                            </button>
                            <Image
                                src={currentPoster!}
                                alt={`${currentCourse.course_title} Poster`}
                                fullWidth={true}
                                aspectRatio="auto"
                                shape="rounded"
                                fit="contain"
                                className="w-full h-full rounded-2xl"
                            />
                        </div>
                    </div>
                )
            }
        </>
    )
}
