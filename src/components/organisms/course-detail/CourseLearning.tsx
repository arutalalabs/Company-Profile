'use client'
import { Typography } from '@/components'
import { MentorDetailCard } from '@/components/molecules/mentor-detail-card'
import type { CourseMaterial, Instructor } from '@/lib/api/courses'

interface CourseLearningProps {
    materials: CourseMaterial[]
    instructor?: Instructor
}

/**
 * CourseLearning - Section showing what students will learn and the mentor
 */
export function CourseLearning({ materials, instructor }: CourseLearningProps) {
    return (
        <section className="py-10 lg:py-16 bg-gray-50">
            <div className="mx-auto max-w-xs sm:max-w-md md:max-w-xl lg:max-w-5xl 2xl:max-w-7xl px-4">
                {/* Section Title */}
                <Typography
                    as="h2"
                    size="xl"
                    weight="bold"
                    color="neutral-950"
                    className="text-lg sm:text-xl lg:text-2xl 2xl:text-3xl mb-8"
                >
                    Yang akan kamu pelajari
                </Typography>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Materials Grid */}
                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {materials.map((material, index) => (
                                <div 
                                    key={index}
                                    className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
                                >
                                    {/* Check Icon */}
                                    <div className="flex-shrink-0 w-6 h-6 bg-[var(--color-accent-600)] rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-[var(--color-neutral-950)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>

                                    {/* Material Content */}
                                    <div className="flex-1">
                                        <Typography
                                            as="h4"
                                            size="sm"
                                            weight="semibold"
                                            color="neutral-950"
                                            className="text-sm sm:text-base mb-1"
                                        >
                                            {material.title}
                                        </Typography>
                                        {material.description && (
                                            <Typography
                                                as="p"
                                                size="xs"
                                                color="neutral-600"
                                                className="text-xs sm:text-sm"
                                            >
                                                {material.description}
                                            </Typography>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mentor Card */}
                    {instructor && (
                        <div className="lg:col-span-1">
                            <Typography
                                as="h3"
                                size="base"
                                weight="semibold"
                                color="neutral-950"
                                className="text-base sm:text-lg mb-4"
                            >
                                Mentor
                            </Typography>
                            <MentorDetailCard
                                name={instructor.name}
                                jobTitle={instructor.jobTitle}
                                companyName={instructor.companyName}
                                profileUrl={instructor.profileUrl}
                                role="Master of Ceremony"
                                variant="vertical"
                                size="md"
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
