import type { Metadata } from 'next'
import { MitraHero, MitraSection, CTA } from '@/components'
import { mitrasApi } from '@/lib/api/mitras'
import { getSeoData, buildMetadata } from '@/lib/api/seo'

export const revalidate = 3600

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://arutalalab.vercel.app'

export async function generateMetadata(): Promise<Metadata> {
    const seo = await getSeoData('mitra')
    return buildMetadata(seo, {
        fallbackTitle: 'Mitra | ArutalaLab',
        fallbackDescription: 'Bergabunglah sebagai mitra ArutalaLab dan wujudkan transformasi digital bersama.',
        pageUrl: `${SITE_URL}/mitra`,
    })
}

export default async function MitraPage() {

    const mitras = await mitrasApi.getAll({
        revalidate: 3600,
        tags: ['mitra-data']
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