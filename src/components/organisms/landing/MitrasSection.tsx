'use client'
import { Typography, Image } from '@/components'

interface Partner {
    id: number
    name: string
    logo: string
}

export default function PartnersSection() {
    // Data mitra/partners
    const partners: Partner[] = [
        { id: 1, name: "Partner 1", logo: "/src/logo/arkamaya.png" },
        { id: 2, name: "Partner 2", logo: "/src/logo/tujuhsembilan.png" },
        { id: 3, name: "Partner 3", logo: "/src/logo/axiata.png" },
        { id: 4, name: "Partner 4", logo: "/src/logo/ganesha.png" },
        { id: 5, name: "Partner 5", logo: "/src/logo/k.png" },
        { id: 6, name: "Partner 6", logo: "/src/logo/garuda.png" },
        { id: 7, name: "Partner 7", logo: "/src/logo/jayandra.png" },
        { id: 8, name: "Partner 8", logo: "/src/logo/banda.png" }
    ]

    return (
        <section className="bg-[#ffffff] w-full py-12 px-4 sm:px-6 lg:px-8 lg:py-20">
            <div className="max-w-7xl mx-auto">
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
                    
                    {/* Scrolling Container */}
                    <div className="flex flex-row justify-start animate-scroll">
                        {/* First Set of Logos */}
                        <div className="flex items-center space-x-8 sm:space-x-12 lg:space-x-16 whitespace-nowrap min-w-full">
                            {partners.map((partner) => (
                                <div
                                    key={`first-${partner.id}`}
                                    className="flex-shrink-0 flex items-center justify-center w-32 sm:w-40 lg:w-48"
                                >
                                    <Image
                                        src={partner.logo}
                                        alt={partner.name}
                                        shape="square"
                                        fit="contain"
                                        className="h-[60px] w-auto object-contain filter transition-all duration-300 hover:opacity-100"
                                    />
                                </div>
                            ))}
                        </div>
                        
                        {/* Duplicate Set untuk Seamless Loop */}
                        <div className="flex items-center space-x-8 sm:space-x-12 lg:space-x-16 whitespace-nowrap min-w-full ml-8 sm:ml-12 lg:ml-190">
                            {partners.map((partner) => (
                                <div
                                    key={`second-${partner.id}`}
                                    className="flex-shrink-0 flex items-center justify-center w-32 sm:w-40 lg:w-48"
                                >
                                    <Image
                                        src={partner.logo}
                                        alt={partner.name}
                                        shape="square"
                                        fit="contain"
                                        className="h-[60px] w-auto object-contain filter transition-all duration-300 hover:opacity-100"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom CSS untuk Animation */}
            <style jsx>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-100%);
                    }
                }
                
                .animate-scroll {
                    animation: scroll 30s linear infinite;
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
                        animation: scroll 40s linear infinite;
                    }
                }
            `}</style>
        </section>
    )
}
