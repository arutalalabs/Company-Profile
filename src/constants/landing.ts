import { ROUTES } from './routes'

// ============================================
// WhyArutalaLabSection - Features Data
// ============================================

export const LANDING_FEATURES = [
    {
        title: 'Inovasi yang Menginspirasi',
        description: 'Mendorong kreativitas dan pemikiran teknologi yang relevan dengan kebutuhan masa depan.',
    },
    {
        title: 'Membuka Pintu Peluang',
        description: 'Membekali talenta dengan skill dan kesiapan menghadapi dunia industri.',
    },
    {
        title: 'Pengalaman yang Mendalam',
        description: 'Didukung tim profesional dengan keahlian luas dalam pengembangan talenta dan teknologi.',
    },
    {
        title: 'Kemitraan yang Kuat',
        description: 'Memiliki kolaborasi yang saling menguatkan untuk mencapai tujuan bisnis.',
    },
] as const

// ============================================
// ServicesSection - Services Data
// ============================================

export const LANDING_SERVICES = [
    {
        image: '/src/landing/education.webp',
        alt: 'IT Education Service',
        title: 'IT Education',
        description: 'Pelatihan IT yang dirancang untuk individu maupun kebutuhan bisnis.',
        path: ROUTES.IT_EDUCATION,
    },
    {
        image: '/src/landing/resource.webp',
        alt: 'Resource Service',
        title: 'Resource',
        description: 'Penyedia talenta IT melalui proses headhunting atau outsourcing',
        path: ROUTES.RESOURCE,
    },
    {
        image: '/src/landing/software.webp',
        alt: 'Software Services',
        title: 'Software Services',
        description: 'Layanan pengembangan dan pemeliharaan perangkat lunak sesuai kebutuhan pengguna.',
        path: ROUTES.SOFTWARE_SERVICES,
    },
] as const

// ============================================
// ComingSoonLearningSection - Course Categories
// ============================================

export const COURSE_CATEGORIES = ['Bootcamp', 'Offline/Online Class', 'Webinar', 'Workshop'] as const
