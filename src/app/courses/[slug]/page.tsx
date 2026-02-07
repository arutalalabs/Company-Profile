'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Typography, Button, CTA } from '@/components'
import { 
    CourseDetailHero, 
    CourseAbout, 
    CourseLearning, 
    CourseRequirements, 
    CourseSchedule, 
    CourseFAQ 
} from '@/components/organisms/course-detail'
import { getCourseBySlug, type CourseDetail } from '@/lib/api/courses'

interface CourseDetailPageProps {
    params: Promise<{
        slug: string
    }>
}

/**
 * Course Detail Page
 * 
 * Dynamic page that displays detailed information about a specific course
 * based on the URL slug parameter
 */
export default function CourseDetailPage({ params }: CourseDetailPageProps) {
    const router = useRouter()
    const [course, setCourse] = useState<CourseDetail | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [slug, setSlug] = useState<string>('')

    // Unwrap params
    useEffect(() => {
        params.then(resolvedParams => {
            setSlug(resolvedParams.slug)
        })
    }, [params])

    // Fetch course data
    useEffect(() => {
        if (!slug) return

        async function fetchCourse() {
            try {
                setLoading(true)
                setError(null)
                const response = await getCourseBySlug(slug)
                
                if (response.success && response.data.length > 0) {
                    setCourse(response.data[0])
                } else {
                    setError('Course tidak ditemukan')
                }
            } catch (err) {
                console.error('Error fetching course:', err)
                setError('Terjadi kesalahan saat memuat data course')
            } finally {
                setLoading(false)
            }
        }

        fetchCourse()
    }, [slug])

    // Handle register click
    const handleRegisterClick = () => {
        router.push('/kontak')
    }

    // Handle demo click
    const handleDemoClick = () => {
        // Could open a modal or navigate to demo page
        console.log('Demo clicked')
    }

    // Loading state
    if (loading) {
        return (
            <main className="min-h-screen bg-white">
                <div className="min-h-[60vh] flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-[var(--color-primary-900)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <Typography as="p" size="base" color="neutral-600">
                            Memuat data course...
                        </Typography>
                    </div>
                </div>
            </main>
        )
    }

    // Error state
    if (error || !course) {
        return (
            <main className="min-h-screen bg-white">
                <div className="min-h-[60vh] flex items-center justify-center">
                    <div className="text-center max-w-md px-4">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <Typography as="h2" size="xl" weight="bold" color="neutral-950" className="mb-2">
                            {error || 'Course tidak ditemukan'}
                        </Typography>
                        <Typography as="p" size="base" color="neutral-600" className="mb-6">
                            Maaf, course yang Anda cari tidak tersedia atau sudah dihapus.
                        </Typography>
                        <Button
                            size="md"
                            shape="solid"
                            color="primary-900"
                            onClick={() => router.push('/courses')}
                        >
                            Lihat Semua Course
                        </Button>
                    </div>
                </div>
            </main>
        )
    }

    // Get first batch data for hero section
    const batches = Array.isArray(course.course_batch) 
        ? course.course_batch 
        : [course.course_batch].filter(Boolean)
    
    const firstBatch = batches[0]
    const instructor = firstBatch?.instructor

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <CourseDetailHero
                title={course.course_title}
                description={course.course_description}
                course_field_name={course.course_field_name}
                category={course.course_category_name}
                posterUrl={firstBatch?.posterUrl}
                startDate={firstBatch?.start_date}
                endDate={firstBatch?.end_date}
                onRegisterClick={handleRegisterClick}
                onDemoClick={handleDemoClick}
            />

            {/* About Section */}
            <CourseAbout description={course.course_description} />

            {/* Learning Materials Section */}
            <CourseLearning 
                materials={course.course_material || []}
                instructor={instructor}
            />

            {/* Requirements & Outputs Section */}
            <CourseRequirements 
                benefits={course.course_benefit || []}
            />

            {/* Schedule & Pricing Section */}
            {batches.length > 0 && (
                <CourseSchedule 
                    batches={batches}
                    onRegisterClick={handleRegisterClick}
                />
            )}

            {/* FAQ Section */}
            <CourseFAQ 
                courseTitle={course.course_title}
                categoryName={course.course_category_name}
            />

            {/* CTA Section */}
            <CTA />
        </main>
    )
}
