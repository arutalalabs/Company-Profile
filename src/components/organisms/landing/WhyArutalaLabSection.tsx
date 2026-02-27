'use client'
import { Typography, Image, Icon } from '@/components'
import { LANDING_FEATURES } from '@/constants/landing'

export default function WhyArutalaLabSection() {
    return (
        <section className="bg-white w-full pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xs md:max-w-2xl lg:max-w-5xl 2xl:max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <Typography
                        as="h2"
                        size="xl"
                        weight="semibold"
                        color="neutral-950"
                        align="center"
                        className="mb-0 text-xl md:text-2xl 2xl:text-3xl lg:mb-4 lg:text-start"
                    >
                        Mengapa Layanan ArutalaLab Terbaik
                    </Typography>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column - Image */}
                    <div className="flex justify-center lg:justify-start">
                        <Image
                            src="/src/landing/mengapa-arutalalab.webp"
                            alt="Mengapa ArutalaLab"
                            size="3xl"
                            shape="rounded"
                            fit="cover"
                            className="w-[326px] h-[232px] sm:w-[464px] sm:h-[272px] lg:w-[530px] lg:h-[359px] rounded-2xl"
                        />
                    </div>

                    {/* Right Column - Features */}
                    <div className="w-[324px] sm:w-[464px] space-y-8 lg:w-full mx-auto lg:mx-0">
                        {LANDING_FEATURES.map((feature) => (
                            <div key={feature.title} className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <Icon
                                        icon="right-arrow"
                                        type="image"
                                        src="/src/landing/bluearrow.svg"
                                        size="xl"
                                        color="current"
                                        alt="Right Arrow"
                                    />
                                </div>
                                <div className="flex-1">
                                    <Typography
                                        as="h3"
                                        size="lg"
                                        weight="semibold"
                                        color="neutral-950"
                                        className="mb-2 sm:text-lg"
                                    >
                                        {feature.title}
                                    </Typography>
                                    <Typography
                                        as="p"
                                        size="sm"
                                        weight="normal"
                                        color="neutral-600"
                                        leading="normal"
                                        className="2xl:text-base"
                                    >
                                        {feature.description}
                                    </Typography>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
