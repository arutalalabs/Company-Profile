'use client'

import { Typography, Button, Image } from '../../index'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface CTAProps {
    title?: string
    description?: string
    buttonText?: string
    onButtonClick?: () => void
    contactPath?: string
}

/**
 * CTA Component - Call To Action section
 * Default mengarah ke halaman kontak (/kontak)
 */
export function CTA({
    title = 'Siap Akselerasi?',
    description = 'Temukan solusi pengembangan skill, penyediaan talenta, dan software services bersama ArutalaLab. Hubungi kami untuk informasi selanjutnya.',
    buttonText = 'Hubungi Kami',
    onButtonClick,
    contactPath = '/kontak',
}: CTAProps) {
    const router = useRouter()
    
    const handleButtonClick = () => {
        if (onButtonClick) {
            onButtonClick()
        } else {
            router.push(contactPath)
        }
    }

    return (
        <section className="w-full px-4 py-12 md:py-30">
            <div className="max-w-xs sm:max-w-md md:max-w-full 2xl:max-w-[1440px] mx-auto flex justify-center">
                <div className="relative w-full lg:w-fit lg:min-w-[940px] max-w-full bg-[var(--color-primary-900)] rounded-xl md:rounded-3xl overflow-visible">
                    <div className="relative flex flex-col md:flex-row items-center md:items-stretch h-auto md:min-h-[300px]">
                        {/* Konten Teks - 60% */}
                        <div className="w-full md:flex-1 p-8 md:p-8 md:pl-12 lg:p-16 lg:pr-16 flex flex-col justify-center z-10">
                            <Typography
                                as="h2"
                                size="lg"
                                weight="semibold"
                                color="neutral-50"
                                className="mb-4 text-2xl md:text-3xl lg:text-3xl"
                            >
                                {title}
                            </Typography>

                            <Typography
                                as="p"
                                size="base"
                                weight="normal"
                                color="neutral-50"
                                className="mb-6 md:mb-8 opacity-90 text-sm md:text-base leading-relaxed w-0 min-w-full"
                            >
                                {description}
                            </Typography>

                            <div>
                                <Button
                                    size="sm"
                                    shape="outline"
                                    color="accent-600"
                                    className="border-2 sm:text-xs sm:px-4 py-3 sm:min-h-[1rem] sm:rounded-[20px] lg:text-sm lg:px-6 py-3 lg:min-h-[2.5rem] lg:gap-3 lg:rounded-[20px]"
                                    onClick={handleButtonClick}
                                >
                                    {buttonText}
                                </Button>
                            </div>
                        </div>

                        {/* Ilustrasi - 40% dengan overflow */}
                        <div className="w-full md:w-auto md:min-w-[320px] lg:min-w-[400px] relative h-[300px] md:h-auto flex items-end md:items-center justify-center md:justify-end">
                            <div className="relative md:absolute md:bottom-0 md:right-8 lg:right-4">
                                <Image
                                    src="/src/common/cta.svg"
                                    size="xl"
                                    alt="Call to Action"
                                    fit="contain"
                                    className="mb-10 sm:mb-0 w-[280px] md:w-[320px] lg:w-[420px] h-[280px] md:h-[370px] lg:h-[460px]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}