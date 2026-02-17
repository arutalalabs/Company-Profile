'use client'
import { Typography, Button, Image } from '@/components'
import { useRouter } from 'next/navigation'

export default function HeroSoftwareServices() {
    const router = useRouter()

    const handleContactClick = () => {
        router.push('/kontak')
    }

    return (
        <section className="relative w-full">
            {/* Background Gradient - Full Width */}
            <div
                className="absolute inset-0 opacity-45 pointer-events-none"
                style={{
                    background: 'linear-gradient(to bottom, transparent 0%, var(--color-primary-600) 50%, transparent 100%)'
                }}
            />

            {/* Content Container */}
            <div className="relative container mx-auto max-w-xs sm:max-w-2xl lg:py-20 2x:py-24 py-8 lg:max-w-5xl 2xl:py-24 2xl:max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-2 lg:gap-18 items-center">
                    {/* Text Content - Left Side */}
                    <div className="flex flex-col gap-6 lg:gap-8 order-2 lg:order-1">
                        <div className="flex flex-col gap-4">
                            <Typography
                                as="h1"
                                size="xl"
                                weight="bold"
                                color="primary-900"
                                className="text-2xl sm:text-xl md:text-3xl 2xl:text-4xl leading-tight"
                            >
                                Software Services Profesional untuk Bisnis Digital di Indonesia
                            </Typography>

                            {/* Divider Line */}
                            <div className="w-full h-[1px] bg-blue-100" />

                            <Typography
                                as="p"
                                size="sm"
                                weight="normal"
                                color="neutral-950"
                                leading="relaxed"
                                className="text-sm sm:text-sm md:text-sm lg:text-base 2xl:text-lg"
                            >
                                ArutalaLab adalah partner terpercaya dalam layanan pengembangan software untuk bisnis digital. Dengan dukungan tim dan mitra profesional, kami membantu Anda merancang, membangun, dan mengoptimalkan produk serta layanan digital melalui software services berkualitas.
                            </Typography>
                        </div>

                        {/* Button */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-2">
                            <Button
                                shape="solid"
                                color="accent-600"
                                size="md"
                                className="w-full sm:w-auto px-8 py-3"
                                onClick={handleContactClick}
                            >
                                Hubungi Kami
                            </Button>
                        </div>
                    </div>

                    {/* Image - Right Side */}
                    <div className="relative order-1 lg:order-2 flex items-center justify-center lg:justify-end w-full">
                        <div className="relative w-full aspect-[16/10] sm:max-w-[500px] lg:max-w-full">
                            <Image
                                src="/src/software-services/hero.png"
                                alt="Software Development Illustration"
                                fullWidth
                                fit="cover"
                                shape="rounded"
                                loading="eager"
                                className="rounded-[32px] object-center"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
