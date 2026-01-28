import { MitraHero, MitraSection, CTA } from '@/components'
import { mitrasApi } from '@/lib/api/mitras'

/**
 * Mitra Page
 * 
 * Menampilkan semua mitra/partner yang bekerja sama
 * Menggunakan Server Components untuk data fetching
 */
export default async function MitraPage() {
    // Fetch data mitra menggunakan API service
    const mitras = await mitrasApi.getAll({
        next: {
            revalidate: 1, // Revalidate setiap 1 hari
            tags: ['mitra-data'] // Tag untuk on-demand revalidation
        }
    })

    return (
        <main>
            {/* Hero Section */}
            <MitraHero />

            {/* Mitra Section */}
            <MitraSection mitras={mitras} />

            {/* CTA Section */}
            <CTA />
        </main>
    )
}