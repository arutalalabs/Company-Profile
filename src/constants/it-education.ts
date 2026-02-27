import type { CardData, CategoryData } from '@/types/it-education'

// ============================================
// ITEducationHero — Course topic tags
// ============================================

export const IT_EDUCATION_TAGS = [
    'Microservices',
    'UI/UX Design',
    'Quality Assurance',
    'Back-End Development',
    'Front-End Development',
    'Basic Agile',
    'Artificial Intelligence Apps Development',
    'Software Project Management',
    'Mobile Development',
] as const

// ============================================
// WhyITEducation — Reason cards
// ============================================

export const IT_EDUCATION_WHY_CARDS: CardData[] = [
    {
        title: 'Mentor Profesional',
        description: 'Akses eksklusif ke jaringan mentor expert kami.',
        imageSrc: '/src/it-education/pro-mentor.png',
        imageAlt: 'mentor profesional',
    },
    {
        title: 'Simulasi Kerja Nyata',
        description: 'Metode belajar menggunakan Project-based learning.',
        imageSrc: '/src/it-education/good-job.png',
        imageAlt: 'simulasi kerja nyata',
    },
    {
        title: 'Komunitas dan Networking',
        description: 'Berkesempatan bertemu dengan orang-orang terbaik.',
        imageSrc: '/src/it-education/earth.png',
        imageAlt: 'komunitas dan networking',
    },
]

// ============================================
// LearningMethods — Category data
// ============================================

export const IT_EDUCATION_CATEGORY_DATA: CategoryData[] = [
    {
        name: 'Bootcamp',
        image: '/src/it-education/learning-illustration.png',
        fieldInfo: {
            duration: '1-3 Bulan',
            schedule: ['Weekdays', 'Weekend'],
            level: 'Beginner Friendly',
        },
        learningMethods: [
            { type: 'Online Class', icon: '/src/common/checklist.svg' },
            { type: 'Offline - Live Interactive', icon: '/src/common/checklist.svg' },
            { type: 'Project for Portfolio', icon: '/src/common/checklist.svg' },
            { type: 'Mentoring', icon: '/src/common/checklist.svg' },
        ],
    },
    {
        name: 'Online/Offline Course',
        image: '/src/it-education/learning-illustration.png',
        fieldInfo: {
            duration: '2-4 Minggu',
            schedule: ['Flexible'],
            level: 'All Levels',
        },
        learningMethods: [
            { type: 'Self Learning', icon: '/src/common/checklist.svg' },
            { type: 'Online Class', icon: '/src/common/checklist.svg' },
            { type: 'Offline Class', icon: '/src/common/checklist.svg' },
            { type: 'Project Based', icon: '/src/common/checklist.svg' },
        ],
    },
    {
        name: 'Workshop',
        image: '/src/it-education/learning-illustration.png',
        fieldInfo: {
            duration: '1-7 Hari',
            schedule: ['Weekend'],
            level: 'Intermediate',
        },
        learningMethods: [
            { type: 'Offline - Live Interactive', icon: '/src/common/checklist.svg' },
            { type: 'Hands-on Practice', icon: '/src/common/checklist.svg' },
            { type: 'Group Discussion', icon: '/src/common/checklist.svg' },
        ],
    },
    {
        name: 'Webinar',
        image: '/src/it-education/learning-illustration.png',
        fieldInfo: {
            duration: '1-3 Jam',
            schedule: ['Weekdays', 'Weekend'],
            level: 'All Levels',
        },
        learningMethods: [
            { type: 'Online Live Session', icon: '/src/common/checklist.svg' },
            { type: 'Q&A Session', icon: '/src/common/checklist.svg' },
            { type: 'Recording Available', icon: '/src/common/checklist.svg' },
        ],
    },
]
