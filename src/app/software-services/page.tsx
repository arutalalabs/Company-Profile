import { CTA } from '@/components'
import HeroSoftwareServices from '@/components/organisms/software-services/HeroSoftwareServices'
import AboutSection from '@/components/organisms/software-services/AboutSection'
import ProcessSection from '@/components/organisms/software-services/ProcessSection'
import AdvantagesSection from '@/components/organisms/software-services/AdvantagesSection'
import WhyChooseSection from '@/components/organisms/software-services/WhyChooseSection'
import ContactFlowSection from '@/components/organisms/software-services/ContactFlowSection'

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
