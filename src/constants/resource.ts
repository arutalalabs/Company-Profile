import type { ITFieldItem, ProfitItem } from '@/types/resource'

// ============================================
// ITField — IT position cards
// ============================================

export const IT_FIELDS: ITFieldItem[] = [
    {
        id: 'qa',
        title: 'Software QA',
        icon: '/src/resource/qa.svg',
        description:
            'Melakukan pengujian perangkat lunak untuk memastikan kualitas, menemukan bug, dan menjamin produk berjalan sesuai kebutuhan pengguna.',
    },
    {
        id: 'backend',
        title: 'Back-End Developer',
        icon: '/src/resource/back-dev.svg',
        description:
            'Mengembangkan logika aplikasi, API, dan database di sisi server untuk mendukung fungsionalitas aplikasi secara keseluruhan.',
    },
    {
        id: 'frontend',
        title: 'Front-End Developer',
        icon: '/src/resource/front-dev.svg',
        description:
            'Membangun tampilan antarmuka pengguna yang interaktif dan responsif menggunakan teknologi web modern.',
    },
    {
        id: 'writer',
        title: 'Technical Writer',
        icon: '/src/resource/writer.svg',
        description:
            'Menyusun dokumentasi teknis yang jelas dan terstruktur untuk membantu pengguna dan tim pengembang memahami produk.',
    },
]

// ============================================
// ProfitSection — Benefit items
// ============================================

export const PROFIT_ITEMS: ProfitItem[] = [
    { icon: '/src/resource/kompeten.svg', label: 'Kompetensi yang Terjamin' },
    { icon: '/src/resource/pendekatan.svg', label: 'Pendekatan yang Disesuaikan' },
    { icon: '/src/resource/kerahasiaan.svg', label: 'Kerahasiaan' },
    { icon: '/src/resource/jaringan.svg', label: 'Jaringan yang  Luas' },
    { icon: '/src/resource/efisien.svg', label: 'Efisiensi Waktu dan Biaya' },
    { icon: '/src/resource/rekam.svg', label: 'Rekam Jejak Terbukti' },
]
