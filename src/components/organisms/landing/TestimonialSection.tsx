'use client'
import { Typography, Button, Icon, Image } from '@/components'
import { useState, useEffect } from 'react'
import { getTestimoniesByCategory, TestimoniCategory } from '@/lib/api/testimonies'

export default function TestimonialSection() {
    const [currentTestimonial, setCurrentTestimonial] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right')
    const [animationPhase, setAnimationPhase] = useState<'idle' | 'slide-out' | 'reposition' | 'slide-in'>('idle')
    const [testimonials, setTestimonials] = useState<Array<{
        id: number
        text: string
        name: string
        company: string
        position: string
        image: string
    }>>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Fetch testimonials from API by category
    useEffect(() => {
        async function fetchTestimonials() {
            try {
                setLoading(true)
                const response = await getTestimoniesByCategory('siswa')

                // Transform API data to component format
                const transformedData = response.data.map((item: TestimoniCategory, index: number) => ({
                    id: index + 1,
                    text: item.testimoni_content,
                    name: item.author_name,
                    company: item.author_company_name,
                    position: item.author_job_title,
                    image: item.author_profile_url
                }))

                setTestimonials(transformedData)
                setError(null)
            } catch (err) {
                console.error('Error fetching testimonials:', err)
                setError(err instanceof Error ? err.message : 'Gagal memuat testimoni')

                // Fallback data jika API gagal
                setTestimonials([
                    {
                        id: 1,
                        text: "ArutalaLab memberikan pengalaman belajar yang luar biasa. Program bootcamp mereka sangat terstruktur dan mentor-mentornya berpengalaman.",
                        name: "Sarah Wijaya",
                        company: "TechnoID Solutions",
                        position: "Software Quality Assurance",
                        image: "/src/mentor/Aldy-Akbarrizky-Senior-Software-Developer-PT.-Padepokan-Tujuh-Sembilan.webp"
                    }
                ])
            } finally {
                setLoading(false)
            }
        }

        fetchTestimonials()
    }, [])

    // Smooth two-phase slide animation
    const changeTestimonial = (newIndex: number, direction: 'left' | 'right') => {
        if (isAnimating) return
        setIsAnimating(true)
        setSlideDirection(direction)
        // Phase 1: slide out current content
        setAnimationPhase('slide-out')
        setTimeout(() => {
            // Swap content while off-screen, reposition to entry side instantly
            setCurrentTestimonial(newIndex)
            setAnimationPhase('reposition')
            // Allow browser to apply the repositioned state before animating in
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    // Phase 2: slide in new content
                    setAnimationPhase('slide-in')
                    setTimeout(() => {
                        setAnimationPhase('idle')
                        setIsAnimating(false)
                    }, 500)
                })
            })
        }, 500)
    }

    // Functions untuk testimonial navigation
    const nextTestimonial = () => {
        changeTestimonial((currentTestimonial + 1) % testimonials.length, 'right')
    }

    const prevTestimonial = () => {
        changeTestimonial((currentTestimonial - 1 + testimonials.length) % testimonials.length, 'left')
    }

    // Auto-slide every 5 seconds
    useEffect(() => {
        if (testimonials.length <= 1) return
        const interval = setInterval(() => {
            changeTestimonial((currentTestimonial + 1) % testimonials.length, 'right')
        }, 5000)
        return () => clearInterval(interval)
    }, [currentTestimonial, testimonials.length, isAnimating])

    // Show loading state
    if (loading) {
        return (
            <section className="bg-[#ffffff] w-full py-12 px-4 sm:px-6 lg:px-8 lg:py-20">
                <div className="max-w-7xl mx-auto text-center">
                    <Typography as="p" size="lg" color="neutral-600">
                        Memuat testimoni...
                    </Typography>
                </div>
            </section>
        )
    }

    // Show error only in console, still show fallback data
    if (error) {
        console.warn('Testimonial API Error:', error)
    }

    // Don't render if no testimonials
    if (testimonials.length === 0) {
        return null
    }

    return (
        <section className="bg-[#ffffff] w-full py-12 px-4 sm:px-6 lg:px-8 lg:py-20">
            <div className="max-w-xs md:max-w-2xl lg:max-w-5xl 2xl:max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
                    <div className="flex-1">
                        <Typography
                            as="h2"
                            size="xl"
                            weight="semibold"
                            color="neutral-950"
                            className="text-2xl md:text-3xl lg:text-3xl"
                        >
                            Testimoni Peserta
                        </Typography>
                    </div>

                    {/* Navigation Buttons - Desktop Only */}
                    <div className="hidden lg:flex gap-2 sm:gap-3">
                        <Button
                            size="sm"
                            shape="outline"
                            color="accent-600"
                            onClick={prevTestimonial}
                            className="w-10 h-10 sm:w-12 sm:h-12 p-0 rounded-full border-2 hover:bg-[var(--color-accent-50)] transition-all duration-200"
                        >
                            <Icon
                                icon="arrow-left"
                                type="image"
                                src="/src/common/leftarrow.svg"
                                size="sm"
                                color="accent-600"
                                alt="Previous"
                                className="w-4 h-4 sm:w-5 sm:h-5"
                            />
                        </Button>
                        <Button
                            size="sm"
                            shape="outline"
                            color="accent-600"
                            onClick={nextTestimonial}
                            className="w-10 h-10 sm:w-12 sm:h-12 p-0 rounded-full border-2 hover:bg-[var(--color-accent-50)] transition-all duration-200"
                        >
                            <Icon
                                icon="arrow-right"
                                type="image"
                                src="/src/common/rightarrow.svg"
                                size="sm"
                                color="accent-600"
                                alt="Next"
                                className="w-4 h-4 sm:w-5 sm:h-5"
                            />
                        </Button>
                    </div>
                </div>

                {/* Testimonial Card with Slide Animation */}
                <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden">
                    <div
                        className={`flex flex-col lg:flex-row min-h-[320px] sm:min-h-[350px] lg:min-h-[400px] ${animationPhase === 'reposition'
                            ? ''
                            : 'transition-all duration-500 ease-in-out'
                            } ${animationPhase === 'slide-out'
                                ? slideDirection === 'right'
                                    ? 'opacity-0 -translate-x-16'
                                    : 'opacity-0 translate-x-16'
                                : animationPhase === 'reposition'
                                    ? slideDirection === 'right'
                                        ? 'opacity-0 translate-x-16'
                                        : 'opacity-0 -translate-x-16'
                                    : animationPhase === 'slide-in'
                                        ? 'opacity-100 translate-x-0'
                                        : 'opacity-100 translate-x-0'
                            }`}
                    >

                        {/* Mobile: Image First */}
                        <div className="w-full h-100 sm:h-80 lg:hidden overflow-hidden">
                            <Image
                                src={testimonials[currentTestimonial].image}
                                alt={testimonials[currentTestimonial].name}
                                fullWidth={true}
                                aspectRatio="auto"
                                shape="square"
                                fit="cover"
                                className="w-full h-full object-cover object-center"
                            />
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">

                            {/* Mobile: Author Info First (after image) */}
                            <div className="lg:hidden mb-6">
                                <div className="space-y-1">
                                    <Typography
                                        as="h4"
                                        size="lg"
                                        weight="semibold"
                                        color="neutral-950"
                                        className="text-lg sm:text-xl"
                                    >
                                        {testimonials[currentTestimonial].name}
                                    </Typography>
                                    <Typography
                                        as="p"
                                        size="base"
                                        weight="medium"
                                        color="neutral-950"
                                        className="text-sm sm:text-base"
                                    >
                                        {testimonials[currentTestimonial].position} di {testimonials[currentTestimonial].company}
                                    </Typography>
                                </div>

                                {/* Divider Line - Mobile */}
                                <div className="w-full h-0.5 bg-[var(--color-primary-600)] mt-4"></div>
                            </div>

                            {/* Testimonial Text */}
                            <div className="mb-6 lg:mb-8">
                                <Typography
                                    as="p"
                                    size="sm"
                                    weight="normal"
                                    color="neutral-950"
                                    leading="relaxed"
                                    className="text-sm sm:text-lg lg:text-base italic"
                                >
                                    "{testimonials[currentTestimonial].text}"
                                </Typography>
                            </div>

                            {/* Desktop: Divider Line */}
                            <div className="hidden lg:block w-full h-0.5 bg-[var(--color-primary-600)] mb-6 lg:mb-8"></div>

                            {/* Desktop: Author Info */}
                            <div className="hidden lg:block space-y-1">
                                <Typography
                                    as="h4"
                                    size="lg"
                                    weight="semibold"
                                    color="neutral-950"
                                    className="text-lg sm:text-xl"
                                >
                                    {testimonials[currentTestimonial].name}
                                </Typography>
                                <Typography
                                    as="p"
                                    size="base"
                                    weight="medium"
                                    color="accent-600"
                                    className="text-sm sm:text-base"
                                >
                                    {testimonials[currentTestimonial].position} di {testimonials[currentTestimonial].company}
                                </Typography>
                            </div>
                        </div>

                        {/* Desktop: Right Image */}
                        <div className="hidden lg:block w-full lg:w-2/5 xl:w-1/3 lg:h-auto overflow-hidden">
                            <Image
                                src={testimonials[currentTestimonial].image}
                                alt={testimonials[currentTestimonial].name}
                                fullWidth={true}
                                aspectRatio="square"
                                shape="square"
                                fit="cover"
                                className="w-full h-full object-cover object-center"
                            />
                        </div>
                    </div>
                </div>

                {/* Navigation Arrows - Mobile */}
                <div className="flex lg:hidden justify-center items-center gap-6 mt-8">
                    <Button
                        size="sm"
                        shape="outline"
                        color="accent-600"
                        onClick={prevTestimonial}
                        className="w-10 h-10 p-0 rounded-full border-2 hover:bg-[var(--color-accent-50)] transition-all duration-200"
                    >
                        <Icon
                            icon="arrow-left"
                            type="image"
                            src="/src/common/leftarrow.svg"
                            size="sm"
                            color="accent-600"
                            alt="Previous"
                            className="w-4 h-4"
                        />
                    </Button>
                    <Button
                        size="sm"
                        shape="outline"
                        color="accent-600"
                        onClick={nextTestimonial}
                        className="w-10 h-10 p-0 rounded-full border-2 hover:bg-[var(--color-accent-50)] transition-all duration-200"
                    >
                        <Icon
                            icon="arrow-right"
                            type="image"
                            src="/src/common/rightarrow.svg"
                            size="sm"
                            color="accent-600"
                            alt="Next"
                            className="w-4 h-4"
                        />
                    </Button>
                </div>
            </div>
        </section>
    )
}
