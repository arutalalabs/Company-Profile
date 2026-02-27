// types/course.ts — Domain types for courses

// ============================================
// Types untuk Upcoming Course
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

// ============================================
// Types untuk Available Courses
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
    contributorType: ContributorType
}

export enum ContributorType {
    INTERNAL = 'INTERNAL',
    EXTERNAL = 'EXTERNAL'
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

// ============================================
// Types untuk Course Detail
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
