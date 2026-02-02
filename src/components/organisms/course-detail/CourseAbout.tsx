'use client'
import { Typography } from '@/components'

interface CourseAboutProps {
    description: string
}

/**
 * CourseAbout - Section that explains what the bootcamp/course is about
 */
export function CourseAbout({ description }: CourseAboutProps) {
    return (
        <section className="py-10 lg:py-16 bg-white">
            <div className="mx-auto max-w-xs sm:max-w-md md:max-w-xl lg:max-w-5xl 2xl:max-w-7xl px-4">
                {/* Section Title */}
                <Typography
                    as="h2"
                    size="xl"
                    weight="bold"
                    color="neutral-950"
                    className="text-lg sm:text-xl lg:text-2xl 2xl:text-3xl mb-6"
                >
                    Bootcamp ini tentang apa sih?
                </Typography>

                {/* Description */}
                <Typography
                    as="p"
                    size="base"
                    color="neutral-600"
                    leading="relaxed"
                    className="text-sm sm:text-base lg:text-base 2xl:text-lg"
                >
                    {description}
                </Typography>
            </div>
        </section>
    )
}
