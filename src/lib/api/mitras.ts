import { apiGet, type FetchOptions } from './client'

import type { Mitra } from '@/types/mitra'

// ============================================
// API Response Types (internal to API layer)
// ============================================

export interface MitrasResponse {
    success: boolean
    message: string
    data: Mitra[]
}

/**
 * Mitras API Service
 */
export const mitrasApi = {
    getAll: async (options?: FetchOptions): Promise<Mitra[]> => {
        try {
            const response = await apiGet<MitrasResponse>('/v2/mitras?isDisplayed=true', options)
            
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

    getById: async (id: number): Promise<Mitra | null> => {
        try {
            const response = await apiGet<{ data: Mitra }>(`/v2/mitras/${id}`)
            return response.data
        } catch (error) {
            console.error(`Error fetching mitra ${id}:`, error)
            return null
        }
    },

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
