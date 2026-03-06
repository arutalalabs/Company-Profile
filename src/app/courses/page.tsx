import type { Metadata } from 'next'
import { CTA } from '@/components'
import { CoursesHero, AllCoursesSection } from '@/components/organisms/courses'
import { getSeoData, buildMetadata } from '@/lib/api/seo'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://arutalalab.vercel.app'

export async function generateMetadata(): Promise<Metadata> {
    const seo = await getSeoData('courses')
    return buildMetadata(seo, {
        fallbackTitle: 'Courses | ArutalaLab',
        fallbackDescription: 'Temukan kursus IT berkualitas untuk meningkatkan skill dan karier profesional Anda bersama ArutalaLab.',
        pageUrl: `${SITE_URL}/courses`,
    })
}

export default function CoursesPage() {
    return (
        <main className="min-h-screen bg-white">
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
