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
    const base = buildMetadata(seo, {
        fallbackTitle: 'ArutalaLab',
        fallbackDescription:
            'Penyedia Layanan IT Education, Resources, dan Software Services yang mendukung pertumbuhan individu dan perusahaan.',
        pageUrl: SITE_URL,
    })
    return {
        ...base,
        title: { absolute: seo?.meta_title || 'ArutalaLab' },
    }
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
