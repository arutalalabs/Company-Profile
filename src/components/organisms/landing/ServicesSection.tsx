'use client'
import { Typography, Card } from '@/components'
import { useRouter } from 'next/navigation'
import { LANDING_SERVICES } from '@/constants/landing'

export default function ServicesSection() {
    const router = useRouter()

    return (
        <section className="bg-white w-full py-18 px-4 sm:px-6 lg:px-8 lg:py-32">
            <div className="max-w-xs md:max-w-2xl lg:max-w-5xl 2xl:max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <Typography
                        as="h2"
                        size="xl"
                        weight="semibold"
                        color="neutral-950"
                        align="center"
                        className="mb-4 sm:text-2xl 2xl:text-3xl"
                    >
                        Layanan Kami
                    </Typography>
                </div>

                {/* Cards Grid */}
                <div className="flex flex-col lg:flex-row gap-8 justify-center items-center lg:items-stretch">
                    {LANDING_SERVICES.map((service) => (
                        <Card
                            key={service.title}
                            size="lg"
                            image={{ src: service.image, alt: service.alt }}
                            title={service.title}
                            description={service.description}
                            onButtonClick={() => router.push(service.path)}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
