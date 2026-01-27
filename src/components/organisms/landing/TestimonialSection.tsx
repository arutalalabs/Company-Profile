'use client'
import { Typography, Button, Icon, Image } from '@/components'
import { useState, useEffect } from 'react'
import { getTestimonies, TestimoniData } from '@/lib/api/testimonies'

export default function TestimonialSection() {
    const [currentTestimonial, setCurrentTestimonial] = useState(0)
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

    // Fetch testimonials from API
    useEffect(() => {
        async function fetchTestimonials() {
            try {
                setLoading(true)
                const response = await getTestimonies()
                
                // Transform API data to component format
                const transformedData = response.data.map((item: TestimoniData, index: number) => ({
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
                        image: "/src/mentor/Aldy Akbarrizky Senior Software Developer PT. Padepokan Tujuh Sembilan.webp"
                    }
                ])
            } finally {
                setLoading(false)
            }
        }

        fetchTestimonials()
    }, [])

    // Functions untuk testimonial navigation
    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    const goToTestimonial = (index: number) => {
        setCurrentTestimonial(index)
    }

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
                                src="/src/leftarrow.svg"
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
                                src="/src/rightarrow.svg"
                                size="sm"
                                color="accent-600"
                                alt="Next"
                                className="w-4 h-4 sm:w-5 sm:h-5"
                            />
                        </Button>
                    </div>
                </div>

                {/* Testimonial Card */}
                <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden transition-all duration-300 hover:shadow-[0_12px_40px_rgb(0,0,0,0.15)]">
                    <div className="flex flex-col lg:flex-row min-h-[320px] sm:min-h-[350px] lg:min-h-[400px]">
                        
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

                {/* Pagination Dots with Navigation for Mobile */}
                <div className="flex justify-center items-center mt-8 lg:mt-12">
                    {/* Left Arrow - Mobile Only */}
                    <Button
                        size="sm"
                        shape="outline"
                        color="accent-600"
                        onClick={prevTestimonial}
                        className="lg:hidden w-10 h-10 p-0 rounded-full border-2 hover:bg-[var(--color-accent-50)] transition-all duration-200 mr-4"
                    >
                        <Icon
                            icon="arrow-left"
                            type="image"
                            src="/src/leftarrow.svg"
                            size="sm"
                            color="accent-600"
                            alt="Previous"
                            className="w-4 h-4"
                        />
                    </Button>

                    {/* Pagination Dots */}
                    <div className="flex gap-3">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToTestimonial(index)}
                                className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
                                    index === currentTestimonial
                                        ? 'bg-[var(--color-accent-600)] scale-110'
                                        : 'bg-[var(--color-accent-400)] hover:bg-[var(--color-accent-500)] hover:scale-105'
                                }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Right Arrow - Mobile Only */}
                    <Button
                        size="sm"
                        shape="outline"
                        color="accent-600"
                        onClick={nextTestimonial}
                        className="lg:hidden w-10 h-10 p-0 rounded-full border-2 hover:bg-[var(--color-accent-50)] transition-all duration-200 ml-4"
                    >
                        <Icon
                            icon="arrow-right"
                            type="image"
                            src="/src/rightarrow.svg"
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
