import { CTA } from '@/components'
import { CoursesHero, AllCoursesSection } from '@/components/organisms/courses'

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
