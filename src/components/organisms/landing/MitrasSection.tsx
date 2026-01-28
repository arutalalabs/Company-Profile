'use client'
import { Typography, Image } from '@/components'
import { useState, useEffect } from 'react'
import { mitrasApi, type Mitra } from '@/lib/api/mitras'

export default function PartnersSection() {
    const [mitras, setMitras] = useState<Mitra[]>([])
    const [loading, setLoading] = useState(true)

    // Fetch data mitra dari API
    useEffect(() => {
        const fetchMitras = async () => {
            try {
                setLoading(true)
                const data = await mitrasApi.getAll()
                setMitras(data)
            } catch (error) {
                console.error('Error loading mitras:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchMitras()
    }, [])

    return (
        <section className="bg-[#ffffff] w-full py-12 px-4 sm:px-6 lg:px-8 lg:py-20">
            <div className="max-w-xs md:max-w-2xl lg:max-w-5xl 2xl:max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="mb-12">
                    <Typography
                        as="h2"
                        size="xl"
                        weight="semibold"
                        color="neutral-950"
                        className="text-2xl md:text-3xl lg:text-3xl text-center sm:text-left"
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
                            {/* First Set of Logos */}
                            <div className="flex items-center gap-8 sm:gap-12 lg:gap-16 pr-8 sm:pr-12 lg:pr-16">
                                {mitras.map((mitra, index) => (
                                    <div
                                        key={`first-${mitra.id || index}`}
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
                            
                            {/* Duplicate Set untuk Seamless Loop */}
                            <div className="flex items-center gap-8 sm:gap-12 lg:gap-16 pr-8 sm:pr-12 lg:pr-16">
                                {mitras.map((mitra, index) => (
                                    <div
                                        key={`second-${mitra.id || index}`}
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

                            {/* Duplicate Set untuk Seamless Loop */}
                            <div className="flex items-center gap-8 sm:gap-12 lg:gap-16 pr-8 sm:pr-12 lg:pr-16">
                                {mitras.map((mitra, index) => (
                                    <div
                                        key={`third-${mitra.id || index}`}
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
                        </div>
                    )}
                </div>
            </div>

            {/* Custom CSS untuk Animation */}
            <style jsx>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                
                .animate-scroll {
                    animation: scroll 20s linear infinite;
                }
                
                .animate-scroll:hover {
                    animation-play-state: paused;
                }
                
                @media (max-width: 640px) {
                    .animate-scroll {
                        animation: scroll 20s linear infinite;
                    }
                }
                
                @media (min-width: 1024px) {
                    .animate-scroll {
                        animation: scroll 20s linear infinite;
                    }
                }
            `}</style>
        </section>
    )
}