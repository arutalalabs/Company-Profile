import { notFound } from 'next/navigation'
import { 
    CourseDetailHero, 
    CourseAbout, 
    CourseLearning, 
    CourseRequirements, 
    CourseSchedule, 
    CourseFAQ,
    CourseFeatures
} from '@/components/organisms/course-detail'
import { getCourseBySlug, getAllCourse, generateCourseSlug } from '@/lib/api/courses'

interface CourseDetailPageProps {
    params: Promise<{
        slug: string
    }>
}

/** ISR: revalidate setiap 1 detik untuk memastikan data selalu up-to-date tanpa perlu rebuild seluruh site.*/
export const revalidate = 1

/**
 * Generate static params untuk semua courses
 * Ini memungkinkan Next.js pre-render halaman saat build time
 */
export async function generateStaticParams() {
    try {
        const response = await getAllCourse()
        return response.data.map(course => ({
            slug: generateCourseSlug(course.course_title)
        }))
    } catch {
        return []
    }
}

/**
 * Course Detail Page (Server Component)
 * 
 * Pre-rendered at build time with ISR for updated content.
 * No client-side JS needed for initial render → faster LCP.
 */
export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
    const { slug } = await params

    const response = await getCourseBySlug(slug)

    if (!response.success || response.data.length === 0) {
        notFound()
    }

    const course = response.data[0]

    // Safety check for course_batch
    if (!course?.course_batch) {
        course.course_batch = []
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
                batchStatus={firstBatch?.status}
                registrationUrl={firstBatch?.registration_url}
            />

            {/* Course Features Section */}
            <CourseFeatures />

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
                />
            )}

            {/* FAQ Section */}
            <CourseFAQ 
                courseTitle={course.course_title}
                categoryName={course.course_category_name}
            />
        </main>
    )
}
