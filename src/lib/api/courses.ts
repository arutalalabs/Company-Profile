import { apiGet } from './client'
import { generateSlug } from '@/utils/slug'

import type {
    UpcomingCourse,
    AvailableCourse,
    Contributor,
    Instructor,
    BatchSession,
    CourseDetail,
    CourseDetailBatch,
    Prices,
} from '@/types/course'
import { ContributorType } from '@/types/course'

export const generateCourseSlug = generateSlug

// ============================================
// API Response Types (internal to API layer)
// ============================================

export interface UpcomingCoursesResponse {
    success: boolean
    message: string
    data: UpcomingCourse[]
}

export interface AvailableCoursesResponse {
    success: boolean
    message: string
    data: AvailableCourse[]
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
    return apiGet<UpcomingCoursesResponse>('/v2/courses/upcoming-course?isDisplayed=true')
}

export async function getAvailableCourses(): Promise<AvailableCoursesResponse> {
    return apiGet<AvailableCoursesResponse>('/v2/courses?available=true')
}

export async function getCourseById(courseId: string): Promise<CourseDetailResponse> {
    const apiResponse = await apiGet<ApiCourseDetailResponse>(`/v2/courses/${courseId}`)

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
                profileUrl: batch.instructor_profile_url,
                contributorType: ContributorType.EXTERNAL
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
    return apiGet<CourseDetailResponse>(`/v2/courses?isDisplayed=true`)
}

export interface ContributorsResponse {
    success: boolean
    message: string
    data: Contributor[]
}

export async function getAllContributors(): Promise<Contributor[]> {
    const response = await apiGet<ContributorsResponse>('/v2/contributors?type=internal')
    return Array.isArray(response.data) ? response.data : []
}

export async function getAllInstructors(): Promise<Instructor[]> {
    const contributors = await getAllContributors()
    return contributors.map(contributor => ({
        id: contributor.contributor_id,
        name: contributor.contributor_name,
        jobTitle: contributor.contributor_job_title,
        companyName: contributor.contributor_company_name,
        profileUrl: contributor.contributor_profile_url,
        contributorType: ContributorType.INTERNAL
    }))
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