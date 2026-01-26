'use client'
import { Typography, Card } from '@/components'
import { useRouter } from 'next/navigation'

export default function ServicesSection() {
    const router = useRouter()

    const handleServiceClick = (servicePath: string) => {
        router.push(servicePath)
    }

    return (
        <section className="bg-[#ffffff] w-full py-18 px-4 sm:px-6 lg:px-8 lg:py-32">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <Typography
                        as="h2"
                        size="xl"
                        weight="semibold"
                        color="neutral-950"
                        align="center"
                        className="mb-4 lg:text-3xl sm:text-2xl"
                    >
                        Layanan Kami
                    </Typography>
                </div>

                {/* Cards Grid */}
                <div className="flex flex-col lg:flex-row gap-8 justify-center items-center lg:items-stretch">
                    {/* IT Education Card */}
                    <Card
                        size="lg"
                        image={{
                            src: '/src/education.webp',
                            alt: 'IT Education Service'
                        }}
                        title="IT Education"
                        description="Pelatihan IT yang dirancang untuk individu maupun kebutuhan bisnis."
                        onButtonClick={() =>
                            handleServiceClick('/it-education')
                        }
                    />

                    {/* Resource Card */}
                    <Card
                        size="lg"
                        image={{
                            src: '/src/resource.webp',
                            alt: 'Resource Service'
                        }}
                        title="Resource"
                        description="Penyedia talenta IT melalui proses headhunting atau outsourcing"
                        onButtonClick={() =>
                            handleServiceClick('/resource')
                        }
                    />

                    {/* Software Services Card */}
                    <Card
                        size="lg"
                        image={{
                            src: '/src/software.webp',
                            alt: 'Software Services'
                        }}
                        title="Software Services"
                        description="Layanan pengembangan dan pemeliharaan perangkat lunak sesuai kebutuhan pengguna."
                        onButtonClick={() =>
                            handleServiceClick('/software-services')
                        }
                    />
                </div>
            </div>
        </section>
    )
}
