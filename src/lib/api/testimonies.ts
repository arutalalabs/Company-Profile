import { apiGet } from './client'

export interface TestimoniData {
    author_name: string
    author_job_title: string
    author_company_name: string
    author_profile_url: string
    testimoni_content: string
}

export interface TestimoniCategory {
    testimoni_id: string
    author_name: string
    author_job_title: string
    author_company_name: string
    author_profile_url: string
    testimoni_content: string
}

export interface TestimoniResponse {
    success: boolean
    massage: string
    data: TestimoniData[]
}

export interface TestimoniCategoryResponse {
    success: boolean
    massage: string
    data: TestimoniCategory[]
}

/**
 * Fetch semua testimoni dari API
 * 
 * @example
 * ```ts
 * const response = await getTestimonies()
 * console.log(response.data) // Array of testimonies
 * ```
 */
export async function getTestimonies(): Promise<TestimoniResponse> {
    return apiGet<TestimoniResponse>('/testimonies/')
}

export async function getTestimoniesByCategory(category: string): Promise<TestimoniCategoryResponse> {
    return apiGet<TestimoniCategoryResponse>(`/testimonies?category=${category}`)
}

