import { apiGet } from './client'

import type { TestimoniData, TestimoniCategory } from '@/types/testimonial'

// ============================================
// API Response Types (internal to API layer)
// ============================================

export interface TestimoniResponse {
    success: boolean
    message: string
    data: TestimoniData[]
}

export interface TestimoniCategoryResponse {
    success: boolean
    message: string
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
    return apiGet<TestimoniResponse>('/v2/testimonies/')
}

export async function getTestimoniesByCategory(category: string): Promise<TestimoniCategoryResponse> {
    return apiGet<TestimoniCategoryResponse>(`/v2/testimonies?category=${category}`)
}

