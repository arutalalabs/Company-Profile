import { Typography, Image } from '@/components'

interface ProfitItem {
    icon: string
    label: string
}

const profits: ProfitItem[] = [
    { icon: '/src/resource/kompeten.svg', label: 'Kompetensi yang Terjamin' },
    { icon: '/src/resource/pendekatan.svg', label: 'Pendekatan yang Disesuaikan' },
    { icon: '/src/resource/kerahasiaan.svg', label: 'Kerahasiaan' },
    { icon: '/src/resource/jaringan.svg', label: 'Jaringan yang  Luas' },
    { icon: '/src/resource/efisien.svg', label: 'Efisiensi Waktu dan Biaya' },
    { icon: '/src/resource/rekam.svg', label: 'Rekam Jejak Terbukti' },
]

export default function ProfitSection() {
    return (
        <section className="py-12 lg:py-20 px-4">
            <div className="max-w-xs md:max-w-2xl lg:max-w-5xl 2xl:max-w-7xl mx-auto">
                {/* Section Title */}
                <div className="text-center mb-10 lg:mb-14">
                    <Typography
                        as="h2"
                        size="xl"
                        weight="bold"
                        color="neutral-950"
                        className="text-xl md:text-2xl lg:text-3xl"
                    >
                        Keuntungan Memilih ArutalaLab Sebagai Penyedia Talent
                    </Typography>
                </div>

                {/* Profits Grid */}
                <div className="bg-[#EBF0FB] rounded-2xl py-10 lg:py-14 px-6 lg:px-16">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 lg:gap-y-14 gap-x-6 lg:gap-x-10">
                        {profits.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center gap-3 lg:gap-4"
                            >
                                {/* Icon */}
                                <div className="w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center">
                                    <Image
                                        src={item.icon}
                                        alt={item.label}
                                        size="sm"
                                        fit="contain"
                                        className="w-10 h-10 lg:w-12 lg:h-12"
                                    />
                                </div>

                                {/* Label */}
                                <Typography
                                    as="p"
                                    size="sm"
                                    weight="medium"
                                    color="neutral-950"
                                    className="text-xs lg:text-sm text-center leading-snug"
                                >
                                    {item.label}
                                </Typography>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
