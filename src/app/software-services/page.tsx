import type { Metadata } from 'next'
import { CTA } from '@/components'
import ScrollTracker from '@/components/atoms/ScrollTracker'
import { getSeoData, buildMetadata, SITE_URL } from '@/lib/api/seo'
import HeroSoftwareServices from '@/components/organisms/software-services/HeroSoftwareServices'
import AboutSection from '@/components/organisms/software-services/AboutSection'
import ProcessSection from '@/components/organisms/software-services/ProcessSection'
import AdvantagesSection from '@/components/organisms/software-services/AdvantagesSection'
import WhyChooseSection from '@/components/organisms/software-services/WhyChooseSection'
import ContactFlowSection from '@/components/organisms/software-services/ContactFlowSection'

export async function generateMetadata(): Promise<Metadata> {
    const seo = await getSeoData('software-services')
    return buildMetadata(seo, {
        fallbackTitle: 'Software Services',
        fallbackDescription: 'Layanan pengembangan software profesional dari ArutalaLab untuk akselerasi transformasi digital bisnis Anda.',
        pageUrl: `${SITE_URL}/software-services`,
    })
}

export default function SoftwareServicesPage() {
    return (
        <main className="min-h-screen bg-white">
            <ScrollTracker />
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
