'use client'
import { Typography, Tag, Button, Image } from '@/components'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/constants/routes'
import { IT_EDUCATION_TAGS } from '@/constants/it-education'

export default function ITEducationHero() {
    const router = useRouter()

    const handleContactClick = () => {
        router.push(ROUTES.KONTAK)
    }
    return (
        <section className="container mx-auto max-w-xs sm:max-w-md md:max-w-xl lg:max-w-6xl 2xl:max-w-[90rem] lg:py-20 2x:py-24 px-4 py-4">
            <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-10 lg:gap-18 items-center">
                {/* Text Content - Left Side */}
                <div className="flex flex-col gap-2 lg:gap-0 order-2 lg:order-1">
                    {/* Title */}
                    <Typography
                        as="h1"
                        size="xl"
                        weight="bold"
                        color="neutral-950"
                        className="text-2xl sm:text-xl md:text-2xl 2xl:text-4xl mb-2"
                    >
                        Wujudkan Karir Digital Impianmu dengan Program Edukasi Kami
                    </Typography>

                    {/* Description */}
                    <Typography
                        as="p"
                        size="sm"
                        weight="normal"
                        color="neutral-600"
                        leading="relaxed"
                        className="text-sm sm:text-sm md:text-sm lg:text-sm 2xl:text-lg"
                    >
                        <b>ArutalaLab</b> tempat dimana Arutalians bisa berkembang menjadi IT talent yang handal dan siap kerja. Kami menyediakan pelatihan berkualitas, mengasah keterampilan, dan membuka jalan karir baru di dunia teknologi. Gabung dan wujudkan aspirasi Arutalians bersama kami!
                    </Typography>

                    {/* Tags */}
                    <div className="hidden lg:block lg:flex lg:flex-wrap lg:gap-4 lg:py-6">
                        {IT_EDUCATION_TAGS.map((tag) => (
                            <Tag
                                key={tag}
                                variant="outline"
                                size="sm"
                                color="accent-600"
                                className="text-black rounded-xl"
                            >
                                {tag}
                            </Tag>
                        ))}
                    </div>

                    {/* Buttons */}
                    <div className="mt-4 lg:mt-0">
                        
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
                    <div className="rrelative w-full flex items-center justify-center">
                        <Image
                            src="/src/it-education/edu-hero.webp"
                            alt="IT Education Hero"
                            aspectRatio='square'
                            fullWidth
                            loading='eager'
                            className='w-full max-w-[200px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-full h-auto object-contain'
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
