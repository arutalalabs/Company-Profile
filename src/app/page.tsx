import type { Metadata } from 'next'
import { getSeoData, buildMetadata } from '@/lib/api/seo'
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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.arutalalab.com'

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
