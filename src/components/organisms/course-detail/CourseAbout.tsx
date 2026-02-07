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
            <div className="mx-auto max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-5xl 2xl:max-w-7xl px-4">
                {/* Section Title */}
                <Typography
                    as="h2"
                    size="base"
                    weight="bold"
                    color="neutral-950"
                    className="sm:text-xl lg:text-lg 2xl:text-2xl mb-6"
                >
                    Bootcamp ini tentang apa sih?
                </Typography>

                {/* Description */}
                <Typography
                    as="p"
                    size="sm"
                    color="neutral-950"
                    className="text-sm sm:text-base lg:text-sm 2xl:text-lg"
                >
                    {description}
                </Typography>
            </div>
        </section>
    )
}
