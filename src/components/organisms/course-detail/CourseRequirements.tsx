'use client'
import { Typography } from '@/components'
import type { CourseBenefit } from '@/lib/api/courses'

interface CourseRequirementsProps {
    /** Requirements/prerequisites for the course */
    requirements?: string[]
    /** Benefits/outputs of the training */
    benefits?: CourseBenefit[]
}

/**
 * CourseRequirements - Section showing requirements and training outputs
 */
export function CourseRequirements({ requirements = [], benefits = [] }: CourseRequirementsProps) {
    // Default requirements if none provided
    const defaultRequirements = [
        'Laptop/PC dengan koneksi internet stabil',
        'Waktu luang 2-3 jam per hari untuk belajar',
        'Semangat dan motivasi tinggi untuk belajar',
        'Akun Google untuk mengakses materi pembelajaran'
    ]

    const displayRequirements = requirements.length > 0 ? requirements : defaultRequirements

    return (
        <section className="py-10 lg:py-16 bg-white">
            <div className="mx-auto max-w-xs sm:max-w-md md:max-w-xl lg:max-w-5xl 2xl:max-w-7xl px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Requirements Column */}
                    <div>
                        <Typography
                            as="h2"
                            size="xl"
                            weight="bold"
                            color="neutral-950"
                            className="text-lg sm:text-xl lg:text-2xl 2xl:text-2xl mb-6"
                        >
                            Hal yang Harus Diperhatikan
                        </Typography>

                        <div className="space-y-3">
                            {displayRequirements.map((req, index) => (
                                <div 
                                    key={index}
                                    className="flex items-start gap-3"
                                >
                                    {/* Number Badge */}
                                    <div className="flex-shrink-0 w-6 h-6 bg-[var(--color-primary-900)] text-white rounded-full flex items-center justify-center text-xs font-bold">
                                        {index + 1}
                                    </div>
                                    
                                    <Typography
                                        as="p"
                                        size="sm"
                                        color="neutral-600"
                                        className="text-sm sm:text-base"
                                    >
                                        {req}
                                    </Typography>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Training Outputs Column */}
                    <div>
                        <Typography
                            as="h2"
                            size="xl"
                            weight="bold"
                            color="neutral-950"
                            className="text-lg sm:text-xl lg:text-2xl 2xl:text-2xl mb-6"
                        >
                            Output dari Pelatihan ini
                        </Typography>

                        {benefits.length > 0 ? (
                            <div className="space-y-3">
                                {benefits.map((benefit, index) => (
                                    <div 
                                        key={index}
                                        className="flex items-start gap-3"
                                    >
                                        {/* Check Icon */}
                                        <div className="flex-shrink-0 w-6 h-6 bg-[var(--color-accent-600)] rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-[var(--color-neutral-950)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        
                                        <div>
                                            <Typography
                                                as="p"
                                                size="sm"
                                                weight="semibold"
                                                color="neutral-950"
                                                className="text-sm sm:text-base"
                                            >
                                                {benefit.title}
                                            </Typography>
                                            {benefit.description && (
                                                <Typography
                                                    as="p"
                                                    size="xs"
                                                    color="neutral-600"
                                                    className="text-xs sm:text-sm mt-1"
                                                >
                                                    {benefit.description}
                                                </Typography>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 bg-[var(--color-accent-600)] rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-[var(--color-neutral-950)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <Typography as="p" size="sm" color="neutral-600" className="text-sm sm:text-base">
                                        Sertifikat kelulusan yang diakui industri
                                    </Typography>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 bg-[var(--color-accent-600)] rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-[var(--color-neutral-950)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <Typography as="p" size="sm" color="neutral-600" className="text-sm sm:text-base">
                                        Portfolio project yang bisa ditunjukkan ke recruiter
                                    </Typography>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 bg-[var(--color-accent-600)] rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-[var(--color-neutral-950)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <Typography as="p" size="sm" color="neutral-600" className="text-sm sm:text-base">
                                        Skill praktis yang siap diterapkan di dunia kerja
                                    </Typography>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
