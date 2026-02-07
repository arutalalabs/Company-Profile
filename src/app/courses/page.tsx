import { CTA } from '@/components'
import { CoursesHero, AllCoursesSection } from '@/components/organisms/courses'

/**
 * Courses Page
 * 
 * Halaman untuk menampilkan semua pelatihan yang tersedia
 * Menggunakan client components untuk data fetching dan filtering
 */
export default function CoursesPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <CoursesHero />

            {/* All Courses Section */}
            <AllCoursesSection />

            {/* CTA Section */}
            <CTA />
        </main>
    )
}
