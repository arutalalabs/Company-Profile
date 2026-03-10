import type { Metadata } from 'next'
import { getSeoData, buildMetadata, SITE_URL } from '@/lib/api/seo'
import {
    CTA,
    HeroSection,
    ServicesSection,
    WhyArutalaLabSection,
    ComingSoonLearningSection,
    TestimonialSection,
    MitrasSection,
    ArticlesSection
} from '@/components'

export async function generateMetadata(): Promise<Metadata> {
    const seo = await getSeoData('home')
    return buildMetadata(seo, {
        fallbackTitle: 'ArutalaLab',
        fallbackDescription:
            'ArutalaLab merupakan platform untuk IT Education, Resources, dan Software Services yang mendukung pertumbuhan individu dan perusahaan.',
        pageUrl: SITE_URL,
    })
}

export default function Landing() {
    return (
        <>
            <HeroSection />
            <ServicesSection />
            <WhyArutalaLabSection />
            <ComingSoonLearningSection />
            <TestimonialSection />
            <MitrasSection />
            <ArticlesSection />
            <CTA />
        </>
    )
}
