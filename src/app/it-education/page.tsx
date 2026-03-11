import type { Metadata } from 'next'
import { CTA } from '@/components'
import { 
    ITEducationHero,
    WhyITEducation,
    LearningMethods,
    Mentor,
    TestimonialSection,
    AvailableCourse
} from '@/components/organisms/it-education'
import { getSeoData, buildMetadata, SITE_URL } from '@/lib/api/seo'

export async function generateMetadata(): Promise<Metadata> {
    const seo = await getSeoData('it-education')
    return buildMetadata(seo, {
        fallbackTitle: 'IT Education',
        fallbackDescription: 'Program pendidikan IT berkualitas tinggi untuk mempersiapkan Anda menghadapi tantangan industri teknologi.',
        pageUrl: `${SITE_URL}/it-education`,
    })
}

export default function ITEducationPage() {
    return (
        <main className="min-h-screen bg-white">
            <ITEducationHero />
            <WhyITEducation />
            <LearningMethods />
            <Mentor/>
            <AvailableCourse />
            <TestimonialSection />
            <CTA 
                title='Mulai Perjalanan Anda!'
                description='Pelajari skill IT yang relevan dan aplikatif untuk mendukung kesiapan karier di dunia profesional.'
            />
        </main>
    )
}