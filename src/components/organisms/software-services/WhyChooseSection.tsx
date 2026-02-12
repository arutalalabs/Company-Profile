import { Typography, Image } from '@/components'

interface WhyChooseCard {
    title: string
    description: string
}

const cards: WhyChooseCard[] = [
    {
        title: 'Expertise',
        description: 'Kami menyediakan Software Services yang mengacu pada standar terbaik industri internasional. Tim kami berpengalaman menangani berbagai platform dan teknologi, serta telah terlibat dalam proyek dari beragam sektor.'
    },
    {
        title: 'Customized',
        description: 'Setiap kebutuhan klien bersifat unik. Oleh karena itu, kami menyesuaikan pemilihan software engineer berdasarkan jenis proyek, domain bisnis, tools yang digunakan, dan model kerja yang dibutuhkan.'
    },
    {
        title: 'Qualified Talent',
        description: 'Sebagian besar tim kami terdiri dari level senior yang memiliki pemahaman kuat terhadap teori dan praktik perangkat lunak secara menyeluruh. Setiap engineer melalui proses seleksi yang ketat untuk memastikan kompetensi serta kemampuan komunikasi yang baik.'
    },
    {
        title: 'Security',
        description: 'Keamanan dan kerahasiaan proyek merupakan prioritas utama kami. Tim kami menjunjung tinggi privasi klien dan menerapkan standar keamanan dalam seluruh proses.'
    }
]

export default function WhyChooseSection() {
    return (
        <section className="pt-12 lg:pt-20 px-4">
            <div className="container mx-auto px-4 py-4 sm:px-0 sm:py-0 sm:max-w-2xl lg:max-w-5xl 2xl:max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10 lg:gap-16">
                    {/* Left: Text + Illustration */}
                    <div className="flex flex-col gap-6">
                        {/* Title & Description */}
                        <div>
                            <Typography
                                as="h2"
                                size="xl"
                                weight="bold"
                                color="neutral-950"
                                className="mb-4 text-xl md:text-2xl lg:text-start 2xl:text-3xl"
                            >
                                Mengapa ArutalaLab dapat Menjadi Solusi Perusahaan Anda
                            </Typography>

                            <Typography
                                as="p"
                                size="sm"
                                weight="normal"
                                color="neutral-950"
                                leading="relaxed"
                                className="text-sm md:text-base lg:text-xs 2xl:text-base"
                            >
                                Tim kami menyediakan Software Services secara menyeluruh, mulai dari perencanaan hingga pengujian yang terstruktur, proses eksekusi yang detail, hingga pelaporan yang jelas dan mudah dipahami. Kami membantu meningkatkan kepercayaan Anda terhadap kualitas software sebelum dirilis maupun saat dilakukan pengembangan. Pendekatan kami dibangun berdasarkan elemen utama berikut:
                            </Typography>
                        </div>

                        {/* Illustration */}
                        <div className="relative w-full max-w-sm mx-auto lg:mx-0">
                            <Image
                                src="/src/software-services/nice-idea.png"
                                alt="Nice Idea Illustration"
                                fullWidth
                                fit="contain"
                                className="w-full h-[180px] sm:h-[200px] lg:h-[240px] 2xl:h-[260px]"
                            />
                        </div>
                    </div>

                    {/* Right: Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-0 lg:gap-5 lg:mb-40">
                        {cards.map((card, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl border border-[var(--color-primary-600)] p-4 lg:p-5 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <Typography
                                    as="h3"
                                    size="base"
                                    weight="semibold"
                                    color="primary-900"
                                    className="text-base lg:text-lg mb-2"
                                >
                                    {card.title}
                                </Typography>

                                <Typography
                                    as="p"
                                    size="sm"
                                    weight="normal"
                                    color="neutral-950"
                                    leading="relaxed"
                                    className="text-sm lg:text-xs 2xl:text-base"
                                >
                                    {card.description}
                                </Typography>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
