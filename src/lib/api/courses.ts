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
    title: string
    description: string
}

export interface CourseBenefit {
    title: string
    description: string
}

export interface BatchSession {
    topic: string
    date: string
    startTime: string
    endTime: string
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
    return apiGet<CourseDetailResponse>(`/courses/${courseId}`)
}
