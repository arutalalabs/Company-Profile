/**
 * Base API Configuration & Error Handling
 * Centralized fetch wrapper dengan timeout dan error handling
 */

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || 'https://backend-cms-arutala.vercel.app'

/**
 * Custom API Error Class
 * Untuk error handling yang lebih detail
 */
export class ApiError extends Error {
    constructor(
        public status: number,
        public statusText: string,
        public data?: unknown
    ) {
        super(`API Error ${status}: ${statusText}`)
        this.name = 'ApiError'
    }
}

/**
 * Extended Fetch Options dengan timeout
 */
interface FetchOptions extends RequestInit {
    timeout?: number
}

/**
 * Enhanced fetch wrapper dengan:
 * - Automatic JSON parsing
 * - Timeout handling
 * - Comprehensive error handling
 * - Type safety
 *
 * @example
 * ```ts
 * const data = await apiFetch<User>('/users/1')
 * ```
 */
export async function apiFetch<T>(
    endpoint: string,
    options: FetchOptions = {}
): Promise<T> {
    const { timeout = 10000, ...fetchOptions } = options

    // Abort controller untuk timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...fetchOptions,
            signal: controller.signal,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                ...fetchOptions.headers
            }
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
            const errorData = await response.json().catch(() => null)
            throw new ApiError(response.status, response.statusText, errorData)
        }

        return await response.json()
    } catch (error) {
        clearTimeout(timeoutId)

        // Re-throw ApiError as-is
        if (error instanceof ApiError) {
            throw error
        }

        // Handle AbortError (timeout)
        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                throw new Error('Request timeout - silakan coba lagi')
            }
            throw new Error(error.message)
        }

        throw new Error('Terjadi kesalahan yang tidak diketahui')
    }
}

/**
 * Helper untuk GET request
 */
export async function apiGet<T>(endpoint: string, options?: FetchOptions): Promise<T> {
    return apiFetch<T>(endpoint, { ...options, method: 'GET' })
}

/**
 * Helper untuk POST request
 */
export async function apiPost<T>(
    endpoint: string,
    data: unknown,
    options?: FetchOptions
): Promise<T> {
    return apiFetch<T>(endpoint, {
        ...options,
        method: 'POST',
        body: JSON.stringify(data)
    })
}

/**
 * Helper untuk PUT request
 */
export async function apiPut<T>(
    endpoint: string,
    data: unknown,
    options?: FetchOptions
): Promise<T> {
    return apiFetch<T>(endpoint, {
        ...options,
        method: 'PUT',
        body: JSON.stringify(data)
    })
}

/**
 * Helper untuk DELETE request
 */
export async function apiDelete<T>(endpoint: string, options?: FetchOptions): Promise<T> {
    return apiFetch<T>(endpoint, { ...options, method: 'DELETE' })
}
