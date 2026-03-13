import type { Metadata } from 'next'
import { MitraHero, MitraSection, CTA } from '@/components'
import { mitrasApi } from '@/lib/api/mitras'
import { getSeoData, buildMetadata, SITE_URL } from '@/lib/api/seo'
import ScrollTracker from '@/components/atoms/ScrollTracker'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
    const seo = await getSeoData('mitra')
    return buildMetadata(seo, {
        fallbackTitle: 'Mitra',
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
            <ScrollTracker />
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