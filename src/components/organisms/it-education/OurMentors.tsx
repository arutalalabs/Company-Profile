'use client'
import { getAllInstructors, getLocalInstructors } from '@/lib/api/courses'
import { Typography } from '@/components/atoms/typography'
import { MentorCard } from '@/components/molecules/mentor-card'
import { useEffect, useState } from 'react'

export function Mentor() {
    const [instructors, setInstructors] = useState<any[]>([])

    useEffect(() => {
        // Pilih salah satu:
        getAllInstructors().then(setInstructors)      // Fetch dari API
        // getLocalInstructors().then(setInstructors)    // Get dari data lokal
    }, [])

    // Duplicate instructors untuk infinite loop effect
    const duplicatedInstructors = [...instructors, ...instructors]

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
                    <div className="flex gap-6 animate-slide-infinite hover:pause-animation">
                        {duplicatedInstructors.map((instructor, index) => (
                            <div 
                                key={index} 
                                className="flex-shrink-0 w-[300px]"
                            >
                                <MentorCard instructor={instructor} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes slide {
                    from {
                        transform: translateX(0);
                    }
                    to {
                        transform: translateX(-50%);
                    }
                }

                .animate-slide-infinite {
                    animation: slide 30s linear infinite;
                    width: max-content;
                }

                .hover\\:pause-animation:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    )
}
