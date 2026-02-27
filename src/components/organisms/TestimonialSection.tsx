'use client'
import { Typography, Button, Icon, Image } from '@/components'
import { useTestimonials } from '@/hooks/useTestimonials'
import { useCarousel } from '@/hooks/useCarousel'
import type { TestimonialSectionProps } from '@/types/testimonial'

export default function TestimonialSection({
    category,
    title,
    sectionId,
    className = 'bg-white',
}: TestimonialSectionProps) {
    const { testimonials, loading, error } = useTestimonials(category)
    const {
        currentIndex: currentTestimonial,
        animationPhase,
        slideDirection,
        next: nextTestimonial,
        prev: prevTestimonial,
    } = useCarousel(testimonials.length, 15000)

    if (loading) {
        return (
            <section className={`${className} w-full py-12 px-4 sm:px-6 lg:px-8 lg:py-6`}>
                <div className="max-w-7xl mx-auto text-center">
                    <Typography as="p" size="lg" color="neutral-600">
                        Memuat testimoni...
                    </Typography>
                </div>
            </section>
        )
    }

    if (error) {
        console.warn('Testimonial API Error:', error)
    }

    if (testimonials.length === 0) {
        return null
    }

    return (
        <section
            id={sectionId}
            className={`${className} w-full py-12 px-4 sm:px-6 lg:px-6 lg:py-20`}
        >
            <div className="max-w-xs md:max-w-2xl lg:max-w-5xl 2xl:max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
                    <div className="flex-1">
                        <Typography
                            as="h2"
                            size="xl"
                            weight="semibold"
                            color="neutral-950"
                            className="text-xl md:text-2xl 2xl:text-3xl"
                        >
                            {title}
                        </Typography>
                    </div>

                    {/* Navigation Buttons - Desktop Only */}
                    <div className="hidden lg:flex gap-2 sm:gap-3">
                        <Button
                            size="sm"
                            shape="outline"
                            color="accent-600"
                            onClick={prevTestimonial}
                            className="w-10 h-10 sm:w-12 sm:h-12 lg:w-10 lg:h-10 2xl:w-10 2xl:h-10 p-0 rounded-full border-2 transition-all duration-200 !bg-transparent hover:scale-105"
                        >
                            <Icon
                                icon="arrow-left"
                                type="image"
                                src="/src/common/leftarrow.svg"
                                size="sm"
                                color="accent-600"
                                alt="Previous"
                                className="w-4 h-4 !sm:w-[18px] !sm:h-[18px]"
                            />
                        </Button>
                        <Button
                            size="sm"
                            shape="outline"
                            color="accent-600"
                            onClick={nextTestimonial}
                            className="w-10 h-10 sm:w-12 sm:h-12 lg:w-10 lg:h-10 2xl:w-10 2xl:h-10 p-0 rounded-full border-2 transition-all duration-200 !bg-transparent hover:scale-105"
                        >
                            <Icon
                                icon="arrow-right"
                                type="image"
                                src="/src/common/rightarrow.svg"
                                size="sm"
                                color="accent-600"
                                alt="Next"
                                className="w-4 h-4 !sm:w-[18px] !sm:h-[18px]"
                            />
                        </Button>
                    </div>
                </div>

                {/* Testimonial Card with Slide Animation */}
                <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden">
                    <div
                        className={`flex flex-col lg:flex-row ${
                            animationPhase === 'reposition'
                                ? ''
                                : 'transition-all duration-600 ease-in-out'
                        } ${
                            animationPhase === 'slide-out'
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
                                fit="contain"
                                className="w-full h-full object-center"
                            />
                        </div>

                        {/* Content */}
                        <div className="flex-1 px-6 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-6 2xl:px-12 2xl:py-8 flex flex-col justify-center">

                            {/* Mobile: Author Info (after image) */}
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
                                    className="text-sm sm:text-lg lg:text-xs 2xl:text-base italic"
                                >
                                    &ldquo;{testimonials[currentTestimonial].text}&rdquo;
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
                                    className="text-lg sm:text-xl lg:text-base 2xl:text-lg"
                                >
                                    {testimonials[currentTestimonial].name}
                                </Typography>
                                <Typography
                                    as="p"
                                    size="base"
                                    weight="medium"
                                    color="accent-600"
                                    className="text-sm sm:text-sm"
                                >
                                    {testimonials[currentTestimonial].position} di {testimonials[currentTestimonial].company}
                                </Typography>
                            </div>
                        </div>

                        {/* Desktop: Right Image */}
                        <div className="hidden lg:block w-full lg:w-2/4 xl:w-1/3 lg:h-[300px] 2xl:h-[360px] 2xl:self-start overflow-hidden">
                            <Image
                                src={testimonials[currentTestimonial].image}
                                alt={testimonials[currentTestimonial].name}
                                aspectRatio="auto"
                                shape="rounded"
                                fit="cover"
                                className="w-full h-full object-center"
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
