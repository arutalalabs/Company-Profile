import { apiGet } from './client'

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

export interface Instructor {
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
    status?: string
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

// API Response types (as returned from backend)
export interface ApiCourseBatchResponse {
    course_batch_id: string
    name: string
    poster_url: string | null
    registration_start: string
    registration_end: string
    start_date: string
    end_date: string
    batch_status: string
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

/**
 * Fetch upcoming courses (pelatihan mendatang)
 * 
 * @example
 * ```ts
 * const response = await getUpcomingCourses()
 * console.log(response.data) // Array of upcoming courses
 * ```
 */
export async function getUpcomingCourses(): Promise<UpcomingCoursesResponse> {
    return apiGet<UpcomingCoursesResponse>('/courses/upcoming-course')
}

/**
 * Fetch all available courses
 * 
 * @example
 * ```ts
 * const response = await getAvailableCourses()
 * console.log(response.data) // Array of available courses
 * ```
 */
export async function getAvailableCourses(): Promise<AvailableCoursesResponse> {
    return apiGet<AvailableCoursesResponse>('/courses?available=true')
}

/**
 * Fetch course detail by ID
 * 
 * @param courseId - UUID of the course
 * @example
 * ```ts
 * const response = await getCourseById('5b3010a9-534e-45e0-b882-50aa853553ab')
 * console.log(response.data[0]) // Course detail
 * ```
 */
export async function getCourseById(courseId: string): Promise<CourseDetailResponse> {
    // Fetch from API - structure is different for by ID endpoint
    const apiResponse = await apiGet<ApiCourseDetailResponse>(`/courses/${courseId}`)
    
    // Transform API response to match CourseDetailResponse format
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

/**
 * Fetch all instructors from courses
 * Extracts unique instructors from all course batches
 * 
 * @example
 * ```ts
 * const instructors = await getAllInstructors()
 * console.log(instructors) // Array of unique instructors
 * ```
 */
export async function getAllInstructors(): Promise<Instructor[]> {
    const response = await getAllCourse()

    // Extract all instructors from all course batches
    const instructors: Instructor[] = []
    const instructorSet = new Set<string>() // To track unique instructors by name

    response.data.forEach(course => {
        // Ensure course_batch is an array
        const batches = Array.isArray(course.course_batch)
            ? course.course_batch
            : [course.course_batch]

        batches.forEach(batch => {
            // Skip if batch or instructor is undefined
            if (!batch || !batch.instructor) return

            const instructorKey = `${batch.instructor.name}-${batch.instructor.companyName}`

            // Only add if not already in set (to avoid duplicates)
            if (!instructorSet.has(instructorKey)) {
                instructorSet.add(instructorKey)
                instructors.push(batch.instructor)
            }
        })
    })

    return instructors
}

/**
 * Fetch course detail by slug
 * Slug is generated from course_title by converting to lowercase and replacing spaces with dashes
 * 
 * @param slug - URL-friendly slug of the course
 * @example
 * ```ts
 * const response = await getCourseBySlug('pengetahuan-dasar-pengembangan-aplikasi-ai')
 * console.log(response.data[0]) // Course detail
 * ```
 */
export async function getCourseBySlug(slug: string): Promise<CourseDetailResponse> {
    try {
        // First get all courses to find the matching course_id
        const allCourses = await getAllCourse()

        // Find the course that matches the slug
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
        
        // Fetch full course detail by ID to get complete data including sessions
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

/**
 * Generate slug from course title
 * @param title - Course title
 * @returns URL-friendly slug
 */
export function generateCourseSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
}
