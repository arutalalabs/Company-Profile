import type { Metadata } from 'next'
import { CTA } from '@/components'
import { CoursesHero, AllCoursesSection } from '@/components/organisms/courses'
import { getSeoData, buildMetadata, SITE_URL } from '@/lib/api/seo'
import ScrollTracker from '@/components/atoms/ScrollTracker'

export async function generateMetadata(): Promise<Metadata> {
    const seo = await getSeoData('courses')
    return buildMetadata(seo, {
        fallbackTitle: 'Courses',
        fallbackDescription: 'Temukan kursus IT berkualitas untuk meningkatkan skill dan karier profesional Anda bersama ArutalaLab.',
        pageUrl: `${SITE_URL}/courses`,
    })
}

export default function CoursesPage() {
    return (
        <main className="min-h-screen bg-white">
            <ScrollTracker />
            {/* Hero Section */}
            <CoursesHero />

            {/* All Courses Section */}
            <AllCoursesSection />

            {/* CTA Section */}
            <CTA 
                title='Mulai Perjalanan Anda!'
                description='Pelajari skill IT yang relevan dan aplikatif untuk mendukung kesiapan karier di dunia profesional.'
            />
        </main>
    )
}
