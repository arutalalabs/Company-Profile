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
        alt: 'Resources Service',
        title: 'Resources',
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

// ============================================
// HeroSection — Star & shooting-star data
// ============================================

function generateStars(count: number, seed = 42) {
    const stars = []
    let s = seed
    const rand = () => {
        s = (s * 1664525 + 1013904223) & 0xffffffff
        return (s >>> 0) / 0xffffffff
    }
    for (let i = 0; i < count; i++) {
        stars.push({
            x: rand() * 100,
            y: rand() * 100,
            size: rand() * 1.5 + 0.5,
            delay: rand() * 5,
            duration: rand() * 3 + 2,
            opacity: rand() * 0.6 + 0.2,
        })
    }
    return stars
}

function generateGlowStars(count: number, seed = 99) {
    const stars = []
    let s = seed
    const rand = () => {
        s = (s * 1664525 + 1013904223) & 0xffffffff
        return (s >>> 0) / 0xffffffff
    }
    for (let i = 0; i < count; i++) {
        stars.push({ x: rand() * 95 + 2.5, y: rand() * 85 + 2.5, delay: rand() * 4 })
    }
    return stars
}

export const HERO_STARS = generateStars(50)
export const HERO_GLOW_STARS = generateGlowStars(5)

export const HERO_SHOOTING_STARS = [
    { top: '12%', left: '-5%',  width: '120px', animationDuration: '4s', animationDelay: '1s',   transform: 'rotate(20deg)' },
    { top: '28%', left: '-8%',  width: '80px',  animationDuration: '6s', animationDelay: '3.5s', transform: 'rotate(18deg)' },
    { top: '8%',  left: '-10%', width: '160px', animationDuration: '5s', animationDelay: '7s',   transform: 'rotate(22deg)' },
    { top: '55%', left: '-6%',  width: '100px', animationDuration: '7s', animationDelay: '2s',   transform: 'rotate(15deg)' },
] as const
