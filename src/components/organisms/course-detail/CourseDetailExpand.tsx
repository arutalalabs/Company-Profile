'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components'
import { CourseLearning } from './CourseLearning'
import { CourseRequirements } from './CourseRequirements'
import type { CourseMaterial, Instructor, CourseBenefit } from '@/types/course'

interface CourseDetailExpandProps {
    materials: CourseMaterial[]
    benefits: CourseBenefit[]
    instructor?: Instructor
    masterOfCeremony?: Instructor
}

export function CourseDetailExpand({
    materials,
    benefits,
    instructor,
    masterOfCeremony,
}: CourseDetailExpandProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    // mounted flag: prevents inline-style hydration mismatch between SSR and client
    const [mounted, setMounted] = useState(false)
    useEffect(() => { setMounted(true) }, [])

    return (
        <div>
            {/* Expandable Sections */}
            {isExpanded && (
                <>
                    <CourseLearning
                        materials={materials}
                        instructor={instructor}
                        masterOfCeremony={masterOfCeremony}
                    />
                    <CourseRequirements benefits={benefits} />
                </>
            )}

            {/* Toggle Button - centered */}
            <div className="flex justify-center py-8">
                <Button
                    shape="link"
                    color="accent-600"
                    size="sm"
                    className="gap-2"
                    onClick={() => setIsExpanded((prev) => !prev)}
                    rightIcon={
                        <img
                            src="/src/common/rightarrow.svg"
                            alt=""
                            width={16}
                            height={16}
                            className={[
                                'transition-transform duration-300',
                                mounted && isExpanded ? 'rotate-90' : 'rotate-0',
                            ].join(' ')}
                        />
                    }
                >
                    {isExpanded ? 'Sembunyikan' : 'Lihat Selengkapnya'}
                </Button>
            </div>
        </div>
    )
}
