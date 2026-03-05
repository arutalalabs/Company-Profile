function getApiBaseUrl(): string | undefined {
    return process.env.NEXT_PUBLIC_API_URL
}

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

export interface FetchOptions extends RequestInit {
    timeout?: number
    /** ISR revalidation time in seconds. Default: 3600 (1 hour). Use 0 for no cache. */
    revalidate?: number | false
    /** Cache tags for on-demand revalidation */
    tags?: string[]
}

export async function apiFetch<T>(
    endpoint: string,
    options: FetchOptions = {}
): Promise<T> {
    const apiBaseUrl = getApiBaseUrl()
    if (!apiBaseUrl) {
        throw new Error(
            'NEXT_PUBLIC_API_URL environment variable is not set. ' +
            'Please set it in your .env.local file or Vercel environment variables.'
        )
    }

    const {
        timeout = 10000,
        revalidate = 3600,
        tags = [],
        ...fetchOptions
    } = options

    // Abort controller untuk timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    // Build Next.js cache options
    const nextOptions: { revalidate?: number | false; tags?: string[] } = {}
    if (revalidate !== undefined) {
        nextOptions.revalidate = revalidate
    }
    if (tags.length > 0) {
        nextOptions.tags = tags
    }

    try {
        const response = await fetch(`${apiBaseUrl}${endpoint}`, {
            ...fetchOptions,
            signal: controller.signal,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                ...fetchOptions.headers
            },
            next: nextOptions
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

export async function apiGet<T>(endpoint: string, options?: FetchOptions): Promise<T> {
    return apiFetch<T>(endpoint, { ...options, method: 'GET' })
}

export async function apiPost<T>(
    endpoint: string,
    data: unknown,
    options?: FetchOptions
): Promise<T> {
    return apiFetch<T>(endpoint, {
        ...options,
        method: 'POST',
        body: JSON.stringify(data),
        revalidate: 0, // POST should never be cached
        cache: 'no-store'
    })
}
