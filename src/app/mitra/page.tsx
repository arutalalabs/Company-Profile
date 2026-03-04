import { MitraHero, MitraSection, CTA } from '@/components'
import { mitrasApi } from '@/lib/api/mitras'

export const revalidate = 86400

export default async function MitraPage() {

    const mitras = await mitrasApi.getAll({
        revalidate: 86400,
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