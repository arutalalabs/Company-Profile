import { Typography, Button, Image } from '../../index'

export function CTA() {
    return (
        <section className="w-full px-4 py-12 md:py-30">
            <div className="max-w-xs sm:max-w-md md:max-w-5xl 2xl:max-w-[1440px] mx-auto flex justify-center">
                {/* Container utama dengan max-width 940px */}
                <div className="relative w-full max-w-[940px] bg-[var(--color-primary-900)] rounded-xl md:rounded-3xl overflow-visible">
                    {/* Flex container untuk layout 60-40 */}
                    <div className="relative flex flex-col md:flex-row items-center md:items-stretch h-auto md:h-[300px]">
                        {/* Konten Teks - 60% */}
                        <div className="w-full md:w-[55%] p-8 md:p-8 md:pl-12 lg:p-16 flex flex-col justify-center z-10">
                            <Typography
                                as="h2"
                                size="lg"
                                weight="semibold"
                                color="neutral-50"
                                className="mb-4 text-2xl md:text-3xl lg:text-3xl"
                            >
                                Siap Akselerasi?
                            </Typography>

                            <Typography
                                as="p"
                                size="base"
                                weight="normal"
                                color="neutral-50"
                                className="mb-6 md:mb-8 opacity-90 text-sm md:text-base leading-relaxed"
                            >
                                Temukan solusi pengembangan skill, penyediaan talenta, dan software services bersama ArutalaLab. Hubungi kami untuk informasi selanjutnya.
                            </Typography>

                            <div>
                                <Button
                                    size="sm"
                                    shape="outline"
                                    color="accent-600"
                                    className="border-2 sm:text-xs sm:px-4 py-3 sm:min-h-[1rem] sm:rounded-[20px] lg:text-sm lg:px-6 py-3 lg:min-h-[2.5rem] lg:gap-3 lg:rounded-[20px]"
                                >
                                    Hubungi Kami
                                </Button>
                            </div>
                        </div>

                        {/* Ilustrasi - 40% dengan overflow */}
                        <div className="w-full md:w-[45%] relative h-[300px] md:h-full flex items-end md:items-center justify-center md:justify-end">
                            {/* CTA Icon */}
                            <div className="relative md:absolute md:bottom-0 md:right-8 lg:right-4">
                                <Image
                                    src="/src/cta.svg"
                                    size="2xl"
                                    alt="Call to Action"
                                    className="mb-10 sm:mb-0 w-[280px] md:w-[300px] lg:w-[420px] h-[280px] md:h-[360px] lg:h-[420px]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}