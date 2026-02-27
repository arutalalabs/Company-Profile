import { useState, useEffect } from 'react'
import { mitrasApi } from '@/lib/api/mitras'
import type { Mitra } from '@/types/mitra'

export function useMitras() {
    const [mitras, setMitras] = useState<Mitra[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchMitras = async () => {
            try {
                setLoading(true)
                const data = await mitrasApi.getAll()
                setMitras(data)
            } catch (err) {
                console.error('Error loading mitras:', err)
                setError('Gagal memuat mitra. Silakan coba lagi nanti.')
            } finally {
                setLoading(false)
            }
        }
        fetchMitras()
    }, [])

    return { mitras, loading, error }
}