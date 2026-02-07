'use client'
import { Typography } from '@/components'
import { Accordion, type AccordionItemProps } from '@/components/atoms/accordion'

interface CourseFAQProps {
    /** Course title for generating FAQ questions */
    courseTitle: string
    /** Category name for context */
    categoryName?: string
    /** Custom FAQ items (optional) */
    customFAQs?: AccordionItemProps[]
}

/**
 * CourseFAQ - Frequently Asked Questions section for course detail
 */
export function CourseFAQ({ courseTitle, categoryName, customFAQs }: CourseFAQProps) {
    // Default FAQ items
    const defaultFAQs: AccordionItemProps[] = [
        {
            id: '1',
            title: `Apakah ada batasan usia untuk Bootcamp?`,
            content: (
                <Typography as="p" size="sm" color="neutral-600" className="text-sm sm:text-base">
                    Tidak ada batasan usia untuk mengikuti bootcamp ini. Siapapun yang memiliki semangat belajar dan memenuhi persyaratan teknis dapat mendaftar dan mengikuti pelatihan.
                </Typography>
            )
        },
        {
            id: '2',
            title: `Apakah ada batasan khusus untuk Bootcamp?`,
            content: (
                <Typography as="p" size="sm" color="neutral-600" className="text-sm sm:text-base">
                    Persyaratan utama adalah memiliki laptop/PC dengan spesifikasi minimum yang diperlukan, koneksi internet stabil, dan komitmen waktu untuk mengikuti seluruh sesi pembelajaran.
                </Typography>
            )
        },
        {
            id: '3',
            title: `Apakah ada batasan Hari untuk Bootcamp?`,
            content: (
                <Typography as="p" size="sm" color="neutral-600" className="text-sm sm:text-base">
                    Bootcamp biasanya dilaksanakan pada hari kerja (Senin-Jumat) atau akhir pekan, tergantung pada batch yang dipilih. Jadwal lengkap akan diinformasikan setelah pendaftaran.
                </Typography>
            )
        },
        {
            id: '4',
            title: `Apakah ada batasan sesi untuk Bootcamp?`,
            content: (
                <Typography as="p" size="sm" color="neutral-600" className="text-sm sm:text-base">
                    Setiap bootcamp memiliki jumlah sesi yang berbeda-beda tergantung materi yang akan dipelajari. Detail sesi akan dijelaskan di halaman jadwal pelatihan.
                </Typography>
            )
        },
        {
            id: '5',
            title: `Apakah ada batasan mentor untuk Bootcamp?`,
            content: (
                <Typography as="p" size="sm" color="neutral-600" className="text-sm sm:text-base">
                    Setiap batch bootcamp akan dipandu oleh mentor berpengalaman yang ahli di bidangnya. Mentor siap membantu peserta dalam memahami materi dan menjawab pertanyaan.
                </Typography>
            )
        }
    ]

    const faqItems = customFAQs && customFAQs.length > 0 ? customFAQs : defaultFAQs

    return (
        <section className="py-10 lg:py-16 bg-white">
            <div className="mx-auto max-w-xs sm:max-w-md md:max-w-xl lg:max-w-5xl 2xl:max-w-7xl px-4">
                {/* Section Title */}
                <Typography
                    as="h2"
                    size="xl"
                    weight="bold"
                    color="neutral-950"
                    className="text-lg sm:text-xl lg:text-2xl 2xl:text-3xl mb-8"
                >
                    Frequently Asked Questions
                </Typography>

                {/* FAQ Accordion */}
                <Accordion
                    items={faqItems}
                    variant="bordered"
                    size="md"
                    allowMultiple={false}
                />
            </div>
        </section>
    )
}
