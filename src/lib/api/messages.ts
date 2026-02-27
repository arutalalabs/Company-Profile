/**
 * Messages API Service
 * Handle semua operasi terkait contact messages
 */

import { apiPost, apiGet } from './client'

import type { MessageFormData } from '@/types/contact'

/**
 * Interface untuk response dari API
 */
export interface MessageResponse {
    success: boolean
    message: string
    data?: {
        id?: string
        createdAt?: string
        [key: string]: unknown
    }
}

/**
 * Messages API Service
 * Centralized service untuk operasi messages
 */
export const messagesApi = {
    /**
     * Kirim pesan baru melalui contact form
     *
     * @param data - Data form yang akan dikirim
     * @returns Promise dengan response dari API
     *
     * @example
     * ```ts
     * const response = await messagesApi.send({
     *   senderName: 'John Doe',
     *   senderEmail: 'john@example.com',
     *   senderPhone: '+6281234567890',
     *   subject: ['IT Education'],
     *   messageBody: 'Hello!'
     * })
     * ```
     */
    send: async (data: MessageFormData): Promise<MessageResponse> => {
        return apiPost<MessageResponse>('/messages/', data)
    },

    /**
     * Get pesan berdasarkan ID (untuk future use)
     *
     * @param id - ID dari message
     * @returns Promise dengan data message
     */
    getById: async (id: string): Promise<MessageResponse> => {
        return apiGet<MessageResponse>(`/messages/${id}`)
    },

    /**
     * Get semua messages (untuk future use - admin panel)
     *
     * @param params - Query parameters untuk filtering
     * @returns Promise dengan array messages
     */
    getAll: async (params?: {
        page?: number
        limit?: number
        status?: string
    }): Promise<MessageResponse> => {
        const queryParams = new URLSearchParams()
        if (params?.page) queryParams.set('page', params.page.toString())
        if (params?.limit) queryParams.set('limit', params.limit.toString())
        if (params?.status) queryParams.set('status', params.status)

        const query = queryParams.toString()
        return apiGet<MessageResponse>(`/messages/${query ? `?${query}` : ''}`)
    }
}
