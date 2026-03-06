import type { Metadata } from 'next'
import { CTA } from '@/components'
import { getSeoData, buildMetadata } from '@/lib/api/seo'
import HeroSoftwareServices from '@/components/organisms/software-services/HeroSoftwareServices'
import AboutSection from '@/components/organisms/software-services/AboutSection'
import ProcessSection from '@/components/organisms/software-services/ProcessSection'
import AdvantagesSection from '@/components/organisms/software-services/AdvantagesSection'
import WhyChooseSection from '@/components/organisms/software-services/WhyChooseSection'
import ContactFlowSection from '@/components/organisms/software-services/ContactFlowSection'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://arutalalab.vercel.app'

export async function generateMetadata(): Promise<Metadata> {
    const seo = await getSeoData('software-services')
    return buildMetadata(seo, {
        fallbackTitle: 'Software Services | ArutalaLab',
        fallbackDescription: 'Layanan pengembangan software profesional dari ArutalaLab untuk akselerasi transformasi digital bisnis Anda.',
        pageUrl: `${SITE_URL}/software-services`,
    })
}

export default function SoftwareServicesPage() {
    return (
        <main className="min-h-screen bg-white">
            <HeroSoftwareServices />
            <AboutSection />
            <ProcessSection />
            <AdvantagesSection />
            <WhyChooseSection />
            <ContactFlowSection />
            <CTA
                title='Tingkatkan Kualitas Software Anda'
                description='Kami membantu memastikan stabilitas, performa, dan fungsionalitas aplikasi sebelum digunakan pengguna.'
            />
        </main>
    )
}
