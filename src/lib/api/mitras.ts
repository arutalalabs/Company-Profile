/**
 * Mitras API Service
 * Handle operasi terkait mitra/partners
 */

import { apiGet, type FetchOptions } from './client'

/**
 * Interface untuk data mitra
 */
export interface Mitra {
    id: number
    mitra_name: string
    business_field: string
    mitra_logo_url: string
}

/**
 * Interface untuk response dari API
 */
export interface MitrasResponse {
    success: boolean
    message: string
    data: Mitra[]
}

/**
 * Mitras API Service
 * Centralized service untuk operasi mitras/partners
 */
export const mitrasApi = {
    /**
     * Get semua mitra
     * 
     * @param options - Fetch options (optional)
     * @returns Promise dengan array mitra
     * 
     * @example
     * ```ts
     * const mitras = await mitrasApi.getAll()
     * ```
     */
    getAll: async (options?: FetchOptions): Promise<Mitra[]> => {
        try {
            const response = await apiGet<MitrasResponse>('/mitras/', options)
            
            // Handle response - extract data array
            if (response && Array.isArray(response.data)) {
                return response.data
            }
            
            // Fallback jika struktur tidak sesuai
            console.warn('Unexpected API response structure:', response)
            return []
        } catch (error) {
            console.error('Error fetching mitras:', error)
            return [] // Return empty array sebagai fallback
        }
    },

    /**
     * Get mitra berdasarkan ID (untuk future use)
     * 
     * @param id - ID dari mitra
     * @returns Promise dengan data mitra
     */
    getById: async (id: number): Promise<Mitra | null> => {
        try {
            const response = await apiGet<{ data: Mitra }>(`/mitras/${id}`)
            return response.data
        } catch (error) {
            console.error(`Error fetching mitra ${id}:`, error)
            return null
        }
    },

    /**
     * Get mitras dengan filter (untuk future use)
     * 
     * @param filters - Filter parameters
     * @returns Promise dengan array mitra terfilter
     */
    getByBusinessField: async (businessField: string): Promise<Mitra[]> => {
        try {
            const allMitras = await mitrasApi.getAll()
            return allMitras.filter((mitra) => 
                mitra.business_field.includes(businessField)
            )
        } catch (error) {
            console.error('Error filtering mitras:', error)
            return []
        }
    }
}
