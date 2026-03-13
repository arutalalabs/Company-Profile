import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { 
    CourseDetailHero, 
    CourseAbout, 
    CourseDetailExpand,
    CourseSchedule, 
    CourseFAQ,
    CourseFeatures
} from '@/components/organisms/course-detail'
import { getCourseBySlug, getAllCourse, generateCourseSlug } from '@/lib/api/courses'
import { getSeoData, buildMetadata, SITE_URL } from '@/lib/api/seo'
import ScrollTracker from '@/components/atoms/ScrollTracker'

interface CourseDetailPageProps {
    params: Promise<{
        slug: string
    }>
}

export const revalidate = 60

export async function generateMetadata({ params }: CourseDetailPageProps): Promise<Metadata> {
    const { slug } = await params
    const response = await getCourseBySlug(slug)
    const course = response.success && response.data.length > 0 ? response.data[0] : null
    const seo = course ? await getSeoData(course.course_id) : null
    return buildMetadata(seo, {
        fallbackTitle: course?.course_title ?? 'Courses',
        fallbackDescription:
            course?.course_headline ??
            course?.course_description ??
            'Temukan kursus IT berkualitas untuk meningkatkan skill dan karier Anda.',
        pageUrl: `${SITE_URL}/courses/${slug}`,
    })
}

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
            <ScrollTracker />
            {/* Hero Section */}
            <CourseDetailHero
                title={course.course_title}
                headline={course.course_headline}
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

            {/* Learning & Requirements — revealed by toggle button */}
            <CourseDetailExpand
                materials={course.course_material || []}
                benefits={course.course_benefit || []}
                instructor={instructor}
            />

            {/* Schedule & Pricing Section */}
            {batches.length > 0 && (
                <CourseSchedule 
                    batches={batches}
                    courseTitle={course.course_title}
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
