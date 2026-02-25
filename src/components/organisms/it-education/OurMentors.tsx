import { getAllContributors } from '@/lib/api/courses'
import { Typography } from '@/components/atoms/typography'
import { MentorCard } from '@/components/molecules/mentor-card'

export async function Mentor() {
    const contributors = await getAllContributors()

    // Duplicate contributors untuk infinite loop effect
    const duplicatedContributors = [...contributors,  ...contributors ]

    return (
        <section className="w-full py-16 px-4 overflow-hidden">
            <div className="mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <Typography
                        as="h2"
                        size="lg"
                        weight="semibold"
                        align="center"
                        color="neutral-950"
                        className="text-base sm:text-lg md:text-xl lg:text-2xl 2xl:text-3xl px-2"
                    >
                        Our Mentors
                    </Typography>
                </div>

                {/* Mentor Cards Slider - Responsive */}
                <div className="relative w-full">
                    <div className="flex gap-6 animate-slide-infinite">
                        {duplicatedContributors.map((contributor, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 w-[300px]"
                            >
                                <MentorCard contributor={contributor} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
