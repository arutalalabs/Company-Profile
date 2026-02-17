import { MitraHero, MitraSection, CTA } from '@/components'
import { mitrasApi } from '@/lib/api/mitras'

/** ISR: revalidate setiap 1 hari */
export const revalidate = 86400

/**
 * Mitra Page
 * 
 * Menampilkan semua mitra/partner yang bekerja sama
 * Menggunakan Server Components untuk data fetching
 */
export default async function MitraPage() {
    // Fetch data mitra menggunakan API service
    const mitras = await mitrasApi.getAll({
        revalidate: 86400, // Revalidate setiap 1 hari
        tags: ['mitra-data'] // Tag untuk on-demand revalidation
    })

    return (
        <main>
            {/* Hero Section */}
            <MitraHero />

            {/* Mitra Section */}
            <MitraSection mitras={mitras} />

            {/* CTA Section */}
            <CTA 
                title='Diskusikan Kebutuhan Anda'
                description='Temukan solusi pengembangan skill, penyediaan talenta, dan pengembangan software bersama ArutalaLab. Hubungi kami untuk informasi selanjutnya.'
            />
        </main>
    )
}