'use client'
import { Typography } from '@/components'

interface Feature {
    title: string
    description: string
}

interface CourseFeaturesProps {
    features?: Feature[]
    className?: string
}

/**
 * CourseFeatures - Displays course features in a grid layout
 * 
 * Shows key features like Certificate, Learning Modules, Discussion Forum, and Consultation
 * with a clean card design and vertical dividers
 */
export function CourseFeatures({
    features,
    className = ''
}: CourseFeaturesProps) {
    // Default features if none provided
    const defaultFeatures: Feature[] = [
        {
            title: 'Sertifikat',
            description: 'Mendapatkan sertifikat kompetensi bagi peserta yang memenuhi syarat.'
        },
        {
            title: 'Modul Pembelajaran',
            description: 'Dapatkan materi pembelajaran setelah menyelesaikan pelatihan'
        },
        {
            title: 'Forum Diskusi',
            description: 'Mendapatkan forum diskusi degang mentor bersama peserta lain'
        },
        {
            title: 'Konsultasi',
            description: 'Anda bisa berkonsultasi dengan mentor selama dan setelah belajar'
        }
    ]

    const displayFeatures = features || defaultFeatures

    return (
        <section className={`w-full py-8 ${className}`}>
            <div className="mx-auto max-w-xs sm:max-w-2xl lg:max-w-5xl 2xl:max-w-6xl px-4">
                <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0">
                        {displayFeatures.map((feature, index) => (
                            <div
                                key={index}
                                className={`flex flex-col ${
                                    index !== displayFeatures.length - 1
                                        ? 'lg:border-r lg:border-[var(--color-primary-900)] lg:pr-6'
                                        : ''
                                } ${index !== 0 ? 'lg:pl-6' : ''}`}
                            >
                                {/* Feature Title */}
                                <Typography
                                    as="h3"
                                    size="sm"
                                    weight="bold"
                                    color="neutral-950"
                                    className="sm:text-sm lg:text-base 2xl:text-lg mb-2"
                                >
                                    {feature.title}
                                </Typography>

                                {/* Feature Description */}
                                <Typography
                                    as="p"
                                    size="xs"
                                    color="neutral-950"
                                    className="sm:text-xs lg:text-xs 2xl:text-sm leading-relaxed"
                                >
                                    {feature.description}
                                </Typography>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
