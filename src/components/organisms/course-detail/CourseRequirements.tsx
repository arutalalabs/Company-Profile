'use client'
import { Typography } from '@/components'
import type { CourseBenefit } from '@/lib/api/courses'

interface Requirement {
    title: string
    items?: string[]
}

interface CourseRequirementsProps {
    /** Requirements/prerequisites for the course */
    requirements?: Requirement[]
    /** Benefits/outputs of the training */
    benefits?: CourseBenefit[]
}

/**
 * CourseRequirements - Section showing requirements and training outputs
 */
export function CourseRequirements({ requirements = [], benefits = [] }: CourseRequirementsProps) {
    // Default requirements if none provided
    // const defaultRequirements: Requirement[] = [
    //     {
    //         title: 'Live Online Class (via Google Meet)',
    //         items: [
    //             'Pembelajaran utama dilakukan secara langsung bersama mentor.',
    //             'Penjelasan mater',
    //             'Praktik langsung',
    //             'Tanya Jawab',
    //             'Demo tools'
    //         ]
    //     },
    //     {
    //         title: 'Waktu Pelaksanaan',
    //         items: [
    //             'Tanggal 16 Desember 2025 - 17 Desember 2025',
    //             '3 jam per hari yaitu pukul 13.00-16.00 WIB.'
    //         ]
    //     },
    //     {
    //         title: 'Materi yang anda dapatkan',
    //         items: [
    //             'Recording kelas',
    //             'Slide PDF',
    //             'Template proyek',
    //             'Tools pendukung'
    //         ]
    //     },
    //     {
    //         title: 'Persyaratan Belajar',
    //         items: [
    //             'Laptop',
    //             'Internet',
    //             'Webcam & mic aktif',
    //             'Aplikasi: Jira'
    //         ]
    //     }
    // ]

    // const defaultBenefits: CourseBenefit[] = [
    //     { title: 'Benefit 1', description: 'Kamu mengerti "kenapa" dan "bagaimana" Scrum diterapkan di perusahaan nyata.' },
    //     { title: 'Benefit 2', description: 'Kamu bisa bekerja dengan tools yang digunakan perusahaan IT saat ini.' },
    //     { title: 'Benefit 3', description: 'Portfolio berupa Product Backlog yang bisa ditunjukkan saat interview.' },
    //     { title: 'Benefit 4', description: 'Kamu bisa langsung bergabung ke scrum team tanpa adaptasi panjang.' }
    // ]

    // Software QA specific requirements
    const defaultRequirements: Requirement[] = [
        {
            title: 'Live Online Class (via Google Meet)',
            items: [
                'Pembelajaran interaktif langsung bersama QA Engineer berpengalaman',
                'Penjelasan konsep testing dan best practices',
                'Hands-on praktik dengan real project scenarios',
                'Sesi tanya jawab untuk membahas study cases',
                'Live demo testing tools (Postman, Selenium, Jira)'
            ]
        },
        {
            title: 'Waktu Pelaksanaan',
            items: [
                'Durasi: 2 hari intensif (16 jam total)',
                'Jadwal: Sabtu-Minggu, 09.00-17.00 WIB',
                'Includes: Coffee break dan diskusi informal'
            ]
        },
        {
            title: 'Materi yang Anda Dapatkan',
            items: [
                'Recording kelas untuk review materi',
                'E-book dan slide materi dalam PDF',
                'Template test case dan test plan',
                'Checklist testing dan bug report template',
                'Sample automation scripts',
                'Akses ke komunitas alumni QA'
            ]
        },
        {
            title: 'Persyaratan Belajar',
            items: [
                'Laptop/PC dengan RAM minimal 8GB',
                'Koneksi internet stabil (minimal 10 Mbps)',
                'Webcam & microphone aktif untuk interaksi',
                'Software: Postman, Browser (Chrome/Firefox)',
                'Akses Jira (akan diberikan saat kelas)',
                'Basic understanding tentang web application'
            ]
        }
    ]

    // Software QA specific benefits
    const defaultBenefits: CourseBenefit[] = [
        { 
            title: 'Benefit 1', 
            description: 'Menguasai fundamental QA dan mampu membuat test case yang comprehensive untuk berbagai jenis testing' 
        },
        { 
            title: 'Benefit 2', 
            description: 'Mampu menggunakan tools industry-standard seperti Postman untuk API testing dan Jira untuk bug tracking' 
        },
        { 
            title: 'Benefit 3', 
            description: 'Portfolio berupa test documentation lengkap yang bisa langsung ditunjukkan saat melamar kerja' 
        },
        { 
            title: 'Benefit 4', 
            description: 'Memahami automation testing basics dan siap untuk explore lebih dalam tentang test automation' 
        },
        { 
            title: 'Benefit 5', 
            description: 'Sertifikat kelulusan yang dapat meningkatkan kredibilitas profesional Anda di bidang QA' 
        },
        { 
            title: 'Benefit 6', 
            description: 'Networking dengan praktisi QA dan akses ke job opportunities dari partner perusahaan' 
        }
    ]

    // Uncomment lines below to use QA-specific data instead of default
    // const displayRequirements = requirements.length > 0 ? requirements : qaRequirements
    // const displayBenefits = benefits.length > 0 ? benefits : qaBenefits
    
    const displayRequirements = requirements.length > 0 ? requirements : defaultRequirements
    const displayBenefits = benefits.length > 0 ? benefits : defaultBenefits

    return (
        <section className="py-10 lg:py-16 bg-white">
            <div className="mx-auto max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-5xl 2xl:max-w-7xl px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Requirements Column */}
                    <div>
                        <Typography
                            as="h2"
                            size="base"
                            weight="bold"
                            color="neutral-950"
                            className="sm:text-xl lg:text-lg 2xl:text-2xl mb-8"
                        >
                            Hal yang Harus Diperhatikan
                        </Typography>

                        <div className="space-y-6">
                            {displayRequirements.map((req, index) => (
                                <div key={index} className="space-y-2">
                                    {/* Main Requirement Title */}
                                    <div className="flex items-center gap-2">
                                        <Typography
                                            as="span"
                                            size="sm"
                                            weight="bold"
                                            color="neutral-950"
                                            className="text-sm 2xl:text-lg"
                                        >
                                            {index + 1}.
                                        </Typography>
                                        <Typography
                                            as="h3"
                                            size="sm"
                                            weight="semibold"
                                            color="neutral-950"
                                            className="lg:text-sm 2xl:text-lg"
                                        >
                                            {req.title}
                                        </Typography>
                                    </div>

                                    {/* Sub Items */}
                                    {req.items && req.items.length > 0 && (
                                        <div className="ml-6 space-y-1">
                                            {req.items.map((item, itemIndex) => (
                                                <div key={itemIndex} className="flex items-center gap-2">
                                                    <span className="text-neutral-950">•</span>
                                                    <Typography
                                                        as="p"
                                                        size="sm"
                                                        color="neutral-950"
                                                        className="lg:text-sm 2xl:text-base"
                                                    >
                                                        {item}
                                                    </Typography>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Training Outputs Column */}
                    <div>
                        <Typography
                            as="h2"
                            size="base"
                            weight="bold"
                            color="neutral-950"
                            className="sm:text-lg lg:text-lg 2xl:text-2xl mb-8"
                        >
                            Output dari Pelatihan ini
                        </Typography>

                        <div className="space-y-4">
                            {displayBenefits.map((benefit, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-2"
                                >
                                    <span className="text-neutral-950">•</span>
                                    <Typography
                                        as="p"
                                        size="sm"
                                        color="neutral-950"
                                        className="lg:text-sm 2xl:text-base leading-relaxed"
                                    >
                                        {benefit.description}
                                    </Typography>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}