import { useState, useEffect } from 'react'
import { getTestimoniesByCategory } from '@/lib/api/testimonies'
import type { Testimonial, TestimoniCategory } from '@/types/testimonial'

export type { Testimonial } from '@/types/testimonial'

export function useTestimonials(category: string) {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([])
    const [loading, setLoading]= useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchTestimonials () {
            try {
                setLoading(true)
                const response = await getTestimoniesByCategory(category)
                const transformedData = response.data.map (
                    (item: TestimoniCategory, index: number) => ({
                        id: index + 1,
                        text: item.testimoni_content,
                        name: item.author_name,
                        company: item.author_company_name,
                        position: item.author_job_title,
                        image: item.author_profile_url
                    })
                )
                setTestimonials(transformedData)
                setError(null)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Gagal memuat testimoni')
            } finally {
                setLoading(false)
            }
        }
        fetchTestimonials()
    }, [category])

    return { testimonials, loading, error}
}
