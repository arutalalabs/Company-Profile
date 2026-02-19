import { apiFetch, apiGet } from './client'

// ============================================
// Types untuk Upcoming Course API
// ============================================

export interface NearestBatch {
    name: string
    posterUrl: string
    start_date: string
    registration_end: string
}

export interface UpcomingCourse {
    course_id: string
    course_title: string
    course_description: string
    course_category_name: string
    nearest_batch: NearestBatch
}

export interface UpcomingCoursesResponse {
    success: boolean
    message: string
    data: UpcomingCourse[]
}

// ============================================
// Types untuk Available Courses API
// ============================================

export interface Contributor {
    contributor_id: string
    contributor_name: string
    contributor_job_title: string
    contributor_company_name: string
    contributor_profile_url: string
}

export interface Instructor {
    id?: string
    name: string
    jobTitle: string
    companyName: string
    profileUrl: string
}

// Mock data untuk testing tersedia di src/__fixtures__/mock-instructors.ts

export interface Prices {
    basePrice: number
    discountType: string | null
    discountValue: number | null
    finalPrice: number | null
}

export interface CourseBatch {
    name: string
    status: string
    posterUrl: string
    registration_start: string
    registration_end: string
    start_date: string
    end_date: string
    instructor: Instructor
    prices: Prices
}

export interface AvailableCourse {
    course_id: string
    course_title: string
    course_description: string
    course_category_name: string
    course_field_name: string
    course_batch: CourseBatch
}

export interface AvailableCoursesResponse {
    success: boolean
    message: string
    data: AvailableCourse[]
}

// ============================================
// Types untuk Course Detail API
// ============================================

export interface CourseMaterial {
    description: string
}

export interface CourseBenefit {
    title: string
    description: string
}

export interface BatchSession {
    course_session_id: string
    topic: string
    date: string
    start_time: string
    end_time: string
}

export interface CourseDetailBatch {
    name: string
    posterUrl: string
    registration_start: string
    registration_end: string
    start_date: string
    end_date: string
    instructor: Instructor
    prices: Prices
    sessions: BatchSession[]
    /** API batch status: SCHEDULED | OPEN | ON_GOING | COMPLETED */
    status?: string
    registration_url?: string
    class_schedule?: string
    registration_date?: string
}

export interface CourseDetail {
    course_id: string
    course_title: string
    course_description: string
    course_category_name: string
    course_field_name: string
    course_material: CourseMaterial[]
    course_benefit: CourseBenefit[]
    course_batch: CourseDetailBatch[]
}

export interface CourseDetailResponse {
    success: boolean
    message: string
    data: CourseDetail[]
}

export interface ApiCourseBatchResponse {
    course_batch_id: string
    name: string
    poster_url: string | null
    registration_start: string
    registration_end: string
    start_date: string
    end_date: string
    batch_status: string
    registration_url?: string
    instructor_name: string
    instructor_job_title: string
    instructor_company_name: string
    instructor_profile_url: string
    base_price: number
    discount_type: string | null
    discount_value: number | null
    final_price: number | null
    sessions: BatchSession[]
}

export interface ApiCourseDetailResponse {
    success: boolean
    message: string
    data: {
        course_id: string
        course_title: string
        course_description: string
        course_category_name: string
        course_field_name: string
        courseBenefit: Array<{ title: string; description: string }>
        courseMaterial: Array<{ title: string; description: string }>
        courseBatch: ApiCourseBatchResponse[]
    }
}

// ============================================
// API Functions
// ============================================

export async function getUpcomingCourses(): Promise<UpcomingCoursesResponse> {
    return apiGet<UpcomingCoursesResponse>('/courses/upcoming-course')
}

export async function getAvailableCourses(): Promise<AvailableCoursesResponse> {
    return apiGet<AvailableCoursesResponse>('/courses?available=true')
}

export async function getCourseById(courseId: string): Promise<CourseDetailResponse> {
    const apiResponse = await apiGet<ApiCourseDetailResponse>(`/courses/${courseId}`)

    const transformedData: CourseDetail = {
        course_id: apiResponse.data.course_id,
        course_title: apiResponse.data.course_title,
        course_description: apiResponse.data.course_description,
        course_category_name: apiResponse.data.course_category_name,
        course_field_name: apiResponse.data.course_field_name,
        course_material: apiResponse.data.courseMaterial?.map(m => ({
            description: m.description
        })) || [],
        course_benefit: apiResponse.data.courseBenefit?.map(b => ({
            title: b.title,
            description: b.description
        })) || [],
        course_batch: apiResponse.data.courseBatch?.map(batch => ({
            name: batch.name,
            posterUrl: batch.poster_url || '',
            registration_start: batch.registration_start,
            registration_end: batch.registration_end,
            start_date: batch.start_date,
            end_date: batch.end_date,
            status: batch.batch_status,
            registration_url: batch.registration_url,
            instructor: {
                name: batch.instructor_name,
                jobTitle: batch.instructor_job_title,
                companyName: batch.instructor_company_name,
                profileUrl: batch.instructor_profile_url
            },
            prices: {
                basePrice: batch.base_price,
                discountType: batch.discount_type,
                discountValue: batch.discount_value,
                finalPrice: batch.final_price || batch.base_price
            },
            sessions: batch.sessions || []
        })) || []
    }
    
    return {
        success: apiResponse.success,
        message: apiResponse.message,
        data: [transformedData]
    }
}

export async function getAllCourse(): Promise<CourseDetailResponse> {
    return apiGet<CourseDetailResponse>(`/courses/`)
}

export interface ContributorsResponse {
    success: boolean
    message: string
    data: Contributor[]
}

export async function getAllContributors(): Promise<Contributor[]> {
    const response = await apiGet<ContributorsResponse>('/contributors')
    return Array.isArray(response.data) ? response.data : []
}

export async function getAllInstructors(): Promise<Instructor[]> {
    const response = await getAllCourse()
    const instructors: Instructor[] = []
    const seen = new Set<string>()
    response.data.forEach(course => {
        const batches = Array.isArray(course.course_batch) ? course.course_batch : [course.course_batch]
        batches.forEach(batch => {
            if (!batch?.instructor) return
            const key = `${batch.instructor.name}-${batch.instructor.companyName}`
            if (!seen.has(key)) {
                seen.add(key)
                instructors.push(batch.instructor)
            }
        })
    })
    return instructors
}

export async function getCourseBySlug(slug: string): Promise<CourseDetailResponse> {
    try {
        const allCourses = await getAllCourse()
        const matchedCourse = allCourses.data.find(course => {
            const courseSlug = course.course_title
                .toLowerCase()
                .replace(/[^a-z0-9\s]/g, '')
                .replace(/\s+/g, '-')
            return courseSlug === slug
        })

        if (!matchedCourse) {
            return {
                success: false,
                message: 'Course not found',
                data: []
            }
        }
        
        const fullCourseDetail = await getCourseById(matchedCourse.course_id)
        
        if (!fullCourseDetail.success || !fullCourseDetail.data || fullCourseDetail.data.length === 0) {
            return {
                success: true,
                message: 'Course found (from all courses)',
                data: [matchedCourse]
            }
        }

        return fullCourseDetail
    } catch (error) {
        console.error('❌ Error in getCourseBySlug:', error)
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Unknown error',
            data: []
        }
    }
}

export function generateCourseSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
}
