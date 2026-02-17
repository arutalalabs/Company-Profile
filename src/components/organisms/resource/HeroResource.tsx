'use client'
import { Typography, Button, Image } from '@/components'
import { useRouter } from 'next/navigation'

export default function HeroResource() {
    const router = useRouter()
    
        const handleContactClick = () => {
            router.push('/kontak')
        }
    
        const handleScrollToTestimonial = () => {
            const element = document.getElementById('testimonial')
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
        }
    return (
        <section className="relative container mx-auto max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-6xl 2xl:max-w-[90rem] lg:py-20 2x:py-24 py-8">
            {/* Content */}
            <div className="relative grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-2 lg:gap-18 items-center">
                {/* Text Content - Left Side */}
                <div className="flex flex-col gap-6 lg:gap-8 order-2 lg:order-1">
                    <div className="flex flex-col gap-4">
                        <Typography
                            as="h1"
                            size="xl"
                            weight="bold"
                            color="neutral-950"
                            className="text-2xl sm:text-xl md:text-2xl 2xl:text-4xl leading-tight"
                        >
                            Temukan Bakat Terbaik melalui Layanan Headhunting atau Outsource Kami
                        </Typography>

                        {/* Divider Line */}
                        <div className="w-full h-[1px] bg-blue-100" />

                        <Typography
                            as="p"
                            size="sm"
                            weight="normal"
                            color="neutral-600"
                            leading="relaxed"
                            className="text-sm sm:text-sm md:text-sm lg:text-base 2xl:text-lg"
                        >
                            Dalam persaingan yang ketat di dunia perekrutan bakat, menemukan profesional yang tepat untuk mendorong kemajuan organisasi menjadi sangat penting. Di ArutalaLab, kami mengambil konsep headhunting & outsource.
                        </Typography>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-2">
                        <Button
                            shape="solid"
                            color="accent-600"
                            size="md"
                            className="w-full sm:w-auto px-8 py-3"
                            onClick={handleContactClick}
                        >
                            Konsultasi
                        </Button>
                        <Button
                            shape="outline"
                            color="accent-600"
                            size="md"
                            className="w-full sm:w-auto  px-8 py-3 !text-[var(--color-neutral-950)] hover:bg-orange-50 border-2"
                            onClick={handleScrollToTestimonial}
                        >
                            Alasan Partner Memilih Kami
                        </Button>
                    </div>
                </div>

                {/* Image - Right Side */}
                <div className="relative order-1 lg:order-2 flex items-center justify-center lg:justify-end w-full">
                    <div className="relative w-full aspect-[16/10] sm:max-w-[400px] lg:max-w-full">
                        <Image
                            src="/src/resource/hero.png"
                            alt="Team Collaboration"
                            fullWidth
                            fit="cover"
                            shape="rounded"
                            loading="eager"
                            className="rounded-[32px] object-center"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
