import { Typography, Image } from '@/components'

interface Advantage {
    icon: string
    title: string
}

const advantages: Advantage[] = [
    {
        icon: '/src/software-services/tim.svg',
        title: 'Tim Profesional Berpengalaman'
    },
    {
        icon: '/src/software-services/metode.svg',
        title: 'Metode Kerja Berbasis Industri'
    },
    {
        icon: '/src/software-services/realiable.svg',
        title: 'Reliable Delivery Approach'
    },
    {
        icon: '/src/software-services/fleksible.svg',
        title: 'Fleksibel untuk Semua Platform'
    },
    {
        icon: '/src/software-services/dokumetasi.svg',
        title: 'Dokumentasi Lengkap'
    },
    {
        icon: '/src/software-services/tools.svg',
        title: 'Tools dan Teknologi Andal'
    }
]

export default function AdvantagesSection() {
    return (
        <section className="py-12 lg:py-20 px-4 bg-white">
            <div className="container mx-auto px-4 py-4 sm:px-0 sm:py-0 sm:max-w-2xl lg:max-w-5xl 2xl:max-w-7xl">
                <div>
                    {/* Section Title */}
                    <Typography
                        as="h2"
                        size="xl"
                        weight="bold"
                        color="primary-900"
                        className="mb-4 text-xl md:text-2xl lg:text-start 2xl:text-3xl"
                    >
                        Keunggulan Layanan
                    </Typography>

                    <Typography
                        as="p"
                        size="sm"
                        weight="normal"
                        color="neutral-950"
                        leading="relaxed"
                        className="text-sm md:text-base mb-8 lg:mb-10"
                    >
                        Sebagai penyedia Software Services, kami menghadirkan solusi pengembangan dan pengelolaan perangkat lunak yang andal, fleksibel, dan disesuaikan dengan kebutuhan bisnis Anda. Setiap layanan dirancang untuk membantu bisnis berkembang melalui teknologi yang tepat, aman, dan berkelanjutan.
                    </Typography>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-stretch">
                        {/* Advantages List */}
                        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 gap-x-10 content-start">
                            {advantages.map((advantage, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 bg-white rounded-full border-2 border-[var(--color-primary-600)] px-4 py-3 lg:px-4 lg:py-3 2xl:px-5 2xl:py-3.5 hover:bg-[var(--color-primary-50)] transition-colors duration-200"
                                >
                                    {/* Icon */}
                                    <div className="w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center flex-shrink-0">
                                        <Image
                                            src={advantage.icon}
                                            alt={advantage.title}
                                            size="sm"
                                            fit="contain"
                                            className="w-6 h-6 lg:w-8 lg:h-8"
                                        />
                                    </div>

                                    {/* Title */}
                                    <Typography
                                        as="span"
                                        size="sm"
                                        weight="medium"
                                        color="primary-900"
                                        className="text-xs lg:text-xs 2xl:text-sm leading-tight"
                                    >
                                        {advantage.title}
                                    </Typography>
                                </div>
                            ))}
                        </div>
                        {/* Illustration */}
                        <div className="relative order-first lg:order-none flex items-center">
                            <div className="relative w-full max-w-md mx-auto lg:max-w-full">
                                <Image
                                    src="/src/software-services/product.png"
                                    alt="Software Services Illustration"
                                    fullWidth
                                    fit="contain"
                                    className="w-full h-[180px] sm:h-[200px] lg:h-[240px] 2xl:h-[260px]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}