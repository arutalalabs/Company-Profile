import { ArticlePageContent } from '@/components/organisms/article'
import { CTA } from '@/components/molecules/cta'

export default function ArticlePage() {
    // Mock data for articles - KEEP as fallback/reference
    const allArticles = [
        {
            id: '1',
            title: "Python Adalah Pemrograman yang Banyak Diminati Saat ini?",
            description: "Temukan roadmap lengkap untuk menjadi Fullstack Web Developer. Panduan berbasis kebutuhan industri yang membantu Anda memahami keterampilan, tools, dan alur belajar yang tepat.",
            image: "/src/article/python.png",
            created_date: "2026-01-15",
            slug: "python-adalah-pemrograman-banyak-diminati"
        },
        {
            id: '2',
            title: "Apakah Microservices dapat Menyelesaikan Masalah Aplikasi Anda?",
            description: "Temukan roadmap lengkap untuk menjadi Fullstack Web Developer. Panduan berbasis kebutuhan industri yang membantu Anda memahami keterampilan, tools, dan alur belajar yang tepat.",
            image: "/src/article/microservice.png",
            created_date: "2026-01-12",
            slug: "apakah-microservices-dapat-menyelesaikan-masalah-aplikasi-anda"
        },
        {
            id: '3',
            title: "Jalur Belajar Sebagai Fullstack Web Developer",
            description: "Temukan roadmap lengkap untuk menjadi Fullstack Web Developer. Panduan berbasis kebutuhan industri yang membantu Anda memahami keterampilan, tools, dan alur belajar yang tepat.",
            image: "/src/article/fullstack.png",
            created_date: "2026-01-18",
            slug: "jalur-belajar-fullstack-web-developer"
        },
        {
            id: '4',
            title: "Best Practices Testing untuk Aplikasi Mobile",
            description: "Strategi dan teknik testing khusus untuk aplikasi mobile, termasuk cross-platform testing, performance testing, usability testing, dan security testing untuk iOS dan Android.",
            image: "/src/article/python.png",
            created_date: "2026-01-10",
            slug: "best-practices-mobile-testing"
        },
        {
            id: '5',
            title: "Mengenal React Native untuk Pengembangan Mobile",
            description: "Panduan lengkap memahami React Native sebagai framework untuk pengembangan aplikasi mobile cross-platform. Pelajari keuntungan, best practices, dan tips implementasi.",
            image: "/src/article/python.png",
            created_date: "2026-01-08",
            slug: "mengenal-react-native-mobile"
        },
        {
            id: '6',
            title: "Keamanan API dalam Aplikasi Modern",
            description: "Memahami pentingnya keamanan API dalam ekosistem aplikasi modern. Teknik authentication, authorization, rate limiting, dan best practices security lainnya.",
            image: "/src/article/microservice.png",
            created_date: "2026-01-05",
            slug: "keamanan-api-aplikasi-modern"
        },
        {
            id: '7',
            title: "Docker dan Kubernetes untuk DevOps",
            description: "Menguasai containerization dengan Docker dan orchestration dengan Kubernetes. Panduan praktis untuk implementasi DevOps di production environment.",
            image: "/src/article/fullstack.png",
            created_date: "2026-01-03",
            slug: "docker-kubernetes-devops"
        },
        {
            id: '8',
            title: "Machine Learning untuk Pemula",
            description: "Memulai perjalanan machine learning dari dasar. Konsep fundamental, algoritma dasar, dan implementasi sederhana untuk pemula yang ingin belajar ML.",
            image: "/src/article/microservice.png",
            created_date: "2026-01-01",
            slug: "machine-learning-pemula"
        },
        {
            id: '9',
            title: "Cloud Computing dengan AWS",
            description: "Panduan komprehensif menggunakan AWS untuk cloud computing. Dari EC2, S3, RDS, hingga Lambda dan serverless architecture.",
            image: "/src/article/python.png",
            created_date: "2025-12-28",
            slug: "cloud-computing-aws"
        },
        {
            id: '10',
            title: "GraphQL vs REST API",
            description: "Perbandingan mendalam antara GraphQL dan REST API. Kapan menggunakan masing-masing, kelebihan, kekurangan, dan use case yang tepat.",
            image: "/src/article/microservice.png",
            created_date: "2025-12-25",
            slug: "graphql-vs-rest-api"
        },
        {
            id: '11',
            title: "Progressive Web Apps (PWA) Modern",
            description: "Membangun Progressive Web Apps yang modern dan performant. Service workers, offline capability, dan optimization techniques.",
            image: "/src/article/fullstack.png",
            created_date: "2025-12-22",
            slug: "progressive-web-apps-modern"
        },
        {
            id: '12',
            title: "Typescript Best Practices 2026",
            description: "Best practices terbaru dalam penggunaan TypeScript. Type safety, generics, advanced types, dan patterns untuk kode yang maintainable.",
            image: "/src/article/fullstack.png",
            created_date: "2025-12-20",
            slug: "typescript-best-practices-2026"
        }
    ]

    // Sort articles by date (newest first) for fallback
    const sortedArticles = [...allArticles].sort(
        (a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime()
    )

    return (
        <main className="min-h-screen">
            {/* Article Content - fetches from API with loading/error states */}
            <ArticlePageContent
                fallbackArticles={sortedArticles}
                itemsPerPage={6}
            />

            {/* CTA Section */}
            <CTA />
        </main>
    )
}
