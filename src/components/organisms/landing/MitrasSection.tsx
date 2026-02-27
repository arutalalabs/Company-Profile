'use client'
import { Typography, Image } from '@/components'
import { useMitras } from '@/hooks/useMitras'
import type { Mitra } from '@/types/mitra'

const LOGO_SET_KEYS = ['first', 'second'] as const

function MitraLogoSet({ mitras, setKey }: { mitras: Mitra[]; setKey: string }) {
    return (
        <div className="flex items-center gap-8 sm:gap-12 lg:gap-16 pr-8 sm:pr-12 lg:pr-16">
            {mitras.map((mitra, index) => (
                <div
                    key={`${setKey}-${mitra.id || index}`}
                    className="flex-shrink-0 flex items-center justify-center w-32 sm:w-40 lg:w-48"
                >
                    <Image
                        src={mitra.mitra_logo_url}
                        alt={mitra.mitra_name}
                        shape="square"
                        fit="contain"
                        className="h-[60px] w-auto object-contain filter transition-all duration-300 hover:opacity-100"
                    />
                </div>
            ))}
        </div>
    )
}

export default function MitrasSection() {
    const { mitras, loading } = useMitras()

    return (
        <section className="bg-white w-full py-12 px-4 sm:px-6 lg:px-8 lg:py-20">
            <div className="max-w-xs md:max-w-2xl lg:max-w-5xl 2xl:max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="mb-12">
                    <Typography
                        as="h2"
                        size="xl"
                        weight="semibold"
                        color="neutral-950"
                        className="text-xl md:text-2xl lg:text-2xl 2xl:text-3xl text-center sm:text-left"
                    >
                        Mitra ArutalaLab
                    </Typography>
                </div>

                {/* Partners Logo Container dengan Scrolling Animation */}
                <div className="relative overflow-hidden">
                    {/* Gradient Overlays untuk smooth fade effect */}
                    <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white z-10 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white z-10 pointer-events-none"></div>
                    
                    {/* Loading State */}
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <Typography
                                as="p"
                                size="base"
                                weight="normal"
                                color="neutral-600"
                            >
                                Memuat mitra...
                            </Typography>
                        </div>
                    ) : mitras.length === 0 ? (
                        <div className="flex items-center justify-center py-12">
                            <Typography
                                as="p"
                                size="base"
                                weight="normal"
                                color="neutral-600"
                            >
                                Belum ada mitra tersedia
                            </Typography>
                        </div>
                    ) : (
                        /* Scrolling Container */
                        <div className="flex animate-scroll">
                            {LOGO_SET_KEYS.map((setKey) => (
                                <MitraLogoSet key={setKey} mitras={mitras} setKey={setKey} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}