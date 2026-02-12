'use client'
import { Typography, Image } from '@/components'
import { useState } from 'react'

interface ProcessPhase {
    id: string
    title: string
    description: string
    illustration: string
    alurTitle: string
    alurSteps: string[]
    outputTitle: string
    outputItems: string[]
}

const phases: ProcessPhase[] = [
    {
        id: 'perencanaan',
        title: 'Perencanaan',
        description: 'Perencanaan merupakan tahapan awal dan paling krusial dalam software services. Pada tahap ini, tim akan memahami kebutuhan klien, tujuan bisnis, serta permasalahan yang ingin diselesaikan melalui solusi digital. Perencanaan yang terstruktur membantu memastikan proses pengembangan perangkat lunak berjalan terarah, efisien, dan sesuai dengan kebutuhan pengguna.',
        illustration: '/src/software-services/high-five.png',
        alurTitle: 'Alur Perencanaan',
        alurSteps: [
            'Komunikasi dan diskusi dengan klien untuk memahami kebutuhan bisnis dan gambaran aplikasi.',
            'Identifikasi kebutuhan pengguna, fitur utama, serta prioritas proyek.',
            'Penentuan ruang lingkup pengembangan agar proyek tetap fokus dan realistis.',
            'Penyusunan pendekatan pengembangan, estimasi waktu, dan tahapan kerja selanjutnya.'
        ],
        outputTitle: 'Output Perencanaan',
        outputItems: [
            'Dokumen Kebutuhan Proyek yang mencakup tujuan aplikasi dan kebutuhan pengguna.',
            'Dokumen Ruang Lingkup Proyek untuk menjaga fokus pengembangan.',
            'Rencana Tahapan Pengembangan sebagai panduan proses selanjutnya.'
        ]
    },
    {
        id: 'analisis',
        title: 'Analisis',
        description: 'Tahapan penting dalam software services yang bertujuan menerjemahkan kebutuhan bisnis dan pengguna ke dalam spesifikasi sistem yang jelas. Pada tahap ini, seluruh hasil perencanaan dianalisis secara menyeluruh untuk memastikan solusi perangkat lunak yang dikembangkan tepat guna, efisien, dan sesuai dengan kebutuhan pengguna di Indonesia.',
        illustration: '/src/software-services/nice-idea.png',
        alurTitle: 'Alur Analisis',
        alurSteps: [
            'Analisis dokumen kebutuhan proyek dan tujuan bisnis klien.',
            'Pengkajian alur bisnis, proses kerja, dan user flow aplikasi.',
            'Identifikasi kebutuhan teknis, integrasi sistem, serta potensi risiko.',
            'Penyusunan spesifikasi sistem sebagai acuan tahap desain dan pengembangan.'
        ],
        outputTitle: 'Output Analisis',
        outputItems: [
            'Dokumen Spesifikasi Kebutuhan Sistem (SRS) berisi daftar fitur, fungsi, dan kebutuhan sistem secara detail.',
            'Analisis Alur Bisnis dan Pengguna gambaran alur kerja dan proses yang didukung oleh sistem.',
            'Dokumen Kebutuhan Teknis & Integrasi yang menjelaskan kebutuhan teknologi, integrasi sistem, serta pertimbangan teknis.'
        ]
    },
    {
        id: 'perancangan',
        title: 'Perancangan',
        description: 'Proses penerapan hasil desain dan perancangan ke dalam bentuk perangkat lunak yang dapat digunakan. Pada tahap ini, seluruh rancangan UI/UX, arsitektur sistem, database, serta alur data diimplementasikan melalui proses pengembangan yang terstruktur dan terkontrol. Implementasi dilakukan dengan fokus pada kualitas kode, performa sistem, keamanan, serta kesesuaian fungsi dengan kebutuhan bisnis dan pengguna di Indonesia.',
        illustration: '/src/software-services/product.png',
        alurTitle: 'Alur Perancangan',
        alurSteps: [
            'Menyusun struktur sistem dan komponen aplikasi agar pengembangan berjalan teratur dan scalable.',
            'Membuat alur penggunaan dan kerangka tampilan aplikasi sebagai dasar desain antarmuka.',
            'Merancang tampilan antarmuka yang intuitif, konsisten, dan sesuai dengan identitas bisnis serta kebutuhan pengguna.',
            'Merancang struktur database dan alur data untuk memastikan data tersimpan dengan aman, terorganisir, dan mengalir secara efisien di dalam sistem.',
            'Memvisualisasikan seluruh rancangan dengan kebutuhan bisnis, pengguna, dan kesiapan teknis sebelum masuk ke tahap pengembangan.'
        ],
        outputTitle: 'Output Perancangan',
        outputItems: [
            'Wireframe & User Flow Aplikasi, gambaran alur penggunaan dan struktur tampilan aplikasi.',
            'Desain UI/UX Aplikasi, desain visual antarmuka yang siap digunakan sebagai acuan pengembangan frontend.',
            'Dokumen Arsitektur Sistem, rancangan struktur sistem dan komponen aplikasi.',
            'Database Schema / ERD (Entity Relationship Diagram), gambaran struktur sistem sebagai acuan tahap implementasi.',
            'Data Flow Diagram & Spesifikasi Struktur Data, penjelasan alur data dan aturan pengelolaan data di dalam sistem.'
        ]
    },
    {
        id: 'implementasi',
        title: 'Implementasi',
        description: 'Tahap implementasi adalah proses penerapan hasil desain dan perancangan ke dalam bentuk perangkat lunak yang dapat digunakan. Pada tahap ini, seluruh rancangan UI/UX, arsitektur sistem, database, serta alur data diimplementasikan melalui proses pengembangan yang terstruktur dan terkontrol. Implementasi dilakukan dengan fokus pada kualitas kode, performa sistem, keamanan, serta kesesuaian fungsi dengan kebutuhan bisnis dan pengguna di Indonesia.',
        illustration: '/src/software-services/high-five.png',
        alurTitle: 'Alur Implementasi',
        alurSteps: [
            'Menerapkan desain UI/UX ke dalam tampilan aplikasi agar interaktif, responsif, dan mudah digunakan.',
            'Mengembangkan logika sistem, API, serta pengelolaan data sesuai dengan arsitektur dan kebutuhan teknis.',
            'Membangun struktur database dan relasi data berdasarkan rancangan yang telah disepakati.',
            'Menghubungkan aplikasi dengan layanan pihak ketiga, API eksternal, atau sistem pendukung lainnya.',
            'Melakukan pengecekan kualitas kode untuk memastikan sistem stabil, aman, dan mudah dikembangkan.'
        ],
        outputTitle: 'Output Implementasi',
        outputItems: [
            'Aplikasi atau Sistem yang Berfungsi, fitur-fitur utama telah dikembangkan sesuai spesifikasi.',
            'Struktur Sistem dan Database; Sistem backend dan pengelolaan data yang telah terintegrasi.',
            'Dokumentasi Implementasi; Dokumen ringkas mengenai struktur aplikasi dan fitur yang telah dikembangkan.',
            'Kode Program Terstruktur & Terdokumentasi, kode yang rapi, aman, dan siap untuk tahap pengujian.',
            'Sistem berjalan secara menyeluruh dan saling terhubung.'
        ]
    },
    {
        id: 'pengujian',
        title: 'Pengujian',
        description: 'Tahap pengujian adalah proses evaluasi menyeluruh untuk memastikan perangkat lunak yang dikembangkan berfungsi dengan benar, aman, dan sesuai dengan kebutuhan bisnis serta pengguna. Pada tahap ini, dilakukan berbagai jenis pengujian untuk mengidentifikasi potensi masalah, mengevaluasi performa sistem, serta memastikan kualitas keseluruhan produk sebelum diluncurkan.',
        illustration: '/src/software-services/high-five.png',
        alurTitle: 'Alur Pengujian',
        alurSteps: [
            'Menyusun rencana pengujian yang mencakup jenis pengujian, skenario, data uji, dan kriteria keberhasilan.',
            'Melakukan pengujian fungsional untuk memastikan setiap fitur bekerja sesuai spesifikasi dan kebutuhan bisnis.',
            'Melakukan pengujian non-fungsional untuk mengevaluasi performa, keamanan, skalabilitas, dan usability sistem.',
            'Mengidentifikasi, mencatat, dan melacak setiap bug atau masalah yang ditemukan selama pengujian.',
            'Melakukan pengujian ulang setelah perbaikan untuk memastikan masalah telah teratasi dan tidak menimbulkan dampak negatif pada bagian lain sistem.'
        ],
        outputTitle: 'Output Pengujian',
        outputItems: [
            'Laporan Hasil Pengujian yang merinci temuan, tingkat keparahan bug, dan rekomendasi perbaikan.',
            'Daftar Bug yang Teridentifikasi dan Terlacak; Bug yang ditemukan dicatat lengkap dengan status dan prioritasnya.',
            'Rencana Pengujian yang Terverifikasi; Dokumen yang menunjukkan bahwa sistem telah diuji sesuai rencana yang disepakati.',
            'Sistem yang Stabil dan Siap Rilis; Perangkat lunak yang telah lolos pengujian dan siap untuk digunakan oleh pengguna.'
        ]
    }
]

export default function ProcessSection() {
    const [activePhase, setActivePhase] = useState<string | null>(null)

    const togglePhase = (id: string) => {
        setActivePhase(prev => prev === id ? null : id)
    }

    return (
        <section className="py-12 lg:py-20 px-4 bg-gray-50">
            <div className="container mx-auto px-4 py-4 sm:px-0 sm:py-0 sm:max-w-2xl lg:max-w-5xl 2xl:max-w-7xl">
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left Side - Sticky Title, Description & Image */}
                    <div className="lg:sticky lg:top-26 lg:self-start">
                        {/* Section Title & Description */}
                        <div className="mb-8 lg:mb-10">
                            <Typography
                                as="h2"
                                size="xl"
                                weight="bold"
                                color="primary-900"
                                className="mb-4 text-xl md:text-2xl lg:text-start 2xl:text-3xl"
                            >
                                Brilliant Software Services
                            </Typography>
                            <Typography
                                as="p"
                                size="sm"
                                weight="normal"
                                color="neutral-950"
                                className="lg:text-sm 2xl:text-base"
                            >
                                Software Services kami mencakup beberapa tahapan seperti perencanaan, analisis, perancangan, implementasi dan pengujian. Anda dapat memilih tahapan mana yang cocok atau menggunakan semua layanan untuk kebutuhan perangkat lunak.
                            </Typography>
                        </div>

                        {/* Image */}
                        <div className="relative w-full max-w-sm mx-auto lg:mx-0">
                            <Image
                                src="/src/software-services/high-five.png"
                                alt="Software Services"
                                fullWidth
                                fit="contain"
                                className="w-full h-[180px] sm:h-[200px] lg:h-[240px] 2xl:h-[260px]"
                            />
                        </div>
                    </div>

                    {/* Right Side - Accordion List */}
                    <div className="flex flex-col gap-4">
                        {phases.map((phase) => {
                            const isActive = activePhase === phase.id
                            return (
                                <div
                                    key={phase.id}
                                    className={`
                                        rounded-2xl border-2 transition-all duration-300
                                        ${isActive
                                            ? 'border-[var(--color-primary-400)] bg-white shadow-lg'
                                            : 'border-[var(--color-neutral-200)] bg-white hover:border-[var(--color-primary-300)] hover:shadow-md'
                                        }
                                    `}
                                >
                                    {/* Header Button */}
                                    <button
                                        onClick={() => togglePhase(phase.id)}
                                        className="w-full flex items-center justify-between px-5 py-4 lg:px-6 lg:py-5"
                                    >
                                        <Typography
                                            as="span"
                                            size="base"
                                            weight="semibold"
                                            color="neutral-950"
                                            className="text-base lg:text-base 2xl:text-lg text-left"
                                        >
                                            {phase.title}
                                        </Typography>

                                        {/* Arrow Icon */}
                                        <div className={`
                                            w-5 h-5 flex-shrink-0 transition-transform duration-300
                                            ${isActive ? 'rotate-180' : ''}
                                        `}>
                                            <Image
                                                src="/src/software-services/arrow-bottom.svg"
                                                alt="Arrow"
                                                size="sm"
                                                fit="contain"
                                                className="w-full h-full"
                                            />
                                        </div>
                                    </button>

                                    {/* Dropdown Content */}
                                    <div className={`
                                        overflow-hidden transition-all duration-300 ease-in-out
                                        ${isActive ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}
                                    `}>
                                        <div className="px-5 pb-5 lg:px-6 lg:pb-6 pt-0">
                                            <div className="border-t border-[var(--color-neutral-200)] pt-4">
                                                {/* Description */}
                                                <Typography
                                                    as="p"
                                                    size="sm"
                                                    weight="normal"
                                                    color="neutral-600"
                                                    leading="relaxed"
                                                    className="text-sm mb-5"
                                                >
                                                    {phase.description}
                                                </Typography>

                                                {/* Alur Section */}
                                                <div className="mb-5">
                                                    <Typography
                                                        as="h4"
                                                        size="sm"
                                                        weight="semibold"
                                                        color="neutral-950"
                                                        className="text-sm lg:text-base mb-3"
                                                    >
                                                        {phase.alurTitle}
                                                    </Typography>
                                                    <ol className="list-decimal list-inside space-y-2 ml-1">
                                                        {phase.alurSteps.map((step, idx) => (
                                                            <li
                                                                key={idx}
                                                                className="text-sm text-gray-700 leading-relaxed pl-1"
                                                            >
                                                                {step}
                                                            </li>
                                                        ))}
                                                    </ol>
                                                </div>

                                                {/* Output Section */}
                                                <div>
                                                    <Typography
                                                        as="h4"
                                                        size="sm"
                                                        weight="semibold"
                                                        color="neutral-950"
                                                        className="text-sm lg:text-base mb-3"
                                                    >
                                                        {phase.outputTitle}
                                                    </Typography>
                                                    <ul className="list-disc list-inside space-y-2 ml-1">
                                                        {phase.outputItems.map((item, idx) => (
                                                            <li
                                                                key={idx}
                                                                className="text-sm text-gray-700 leading-relaxed pl-1"
                                                            >
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}