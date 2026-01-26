'use client'
import { Tag, Typography, Button } from '@/components'

export default function HeroSection() {
    return (
        <section className="bg-[#ffffff] w-full sm:px-4 sm:pt-2 lg:pt-6 lg:px-8 ">
            <div className="bg-[var(--color-neutral-950)] w-full min-h-[614px] flex justify-center items-center overflow-hidden sm:rounded-2xl sm:min-h-[520px] md:min-h-[580px] lg:rounded-3xl lg:min-h-[614px]">
                {/* Background Animations Layer */}
                <div className="absolute inset-0 pointer-events-none">
                    {/* Diamond Glow - Top Right */}
                    <div className="diamond-top-right absolute -right-0.5 w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80"></div>

                    {/* Diamond Glow - Bottom Left */}
                    <div className="diamond-bottom-left absolute -bottom-0.5 -left-0.5 w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80"></div>

                    {/* Center Radial Glow */}
                    <div className="center-radial absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 sm:w-[500px] sm:h-[500px] lg:w-[600px] lg:h-[600px]"></div>
                </div>

                {/* Content Layer */}
                <div className="w-[350px] flex items-center py-4 justify-center sm:w-[480px] md:w-[600px] lg:h-[322px] lg:w-[800px]">
                    <div className="text-center text-white space-y-6">
                        {/* Tag */}
                        <div className="flex justify-center mb-8">
                            <Tag size="sm" variant="solid">
                                Belajar atau Temukan Talent untuk Team Anda
                            </Tag>
                        </div>

                        {/* Title */}
                        <div className="flex flex-col justify-center mb-8">
                            <Typography
                                as="h1"
                                size="xl"
                                weight="semibold"
                                color="neutral-50"
                                align="center"
                                leading="tight"
                                className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
                            >
                                Tingkatkan Skill & Solusi Digital Anda
                                Bersama ArutalaLab
                            </Typography>

                            {/* Description */}
                            <Typography
                                as="p"
                                size="sm"
                                weight="light"
                                color="neutral-50"
                                align="center"
                                className="max-w-2xl lg:max-w-3xl mx-auto mb-0 lg:mb-1 text-sm sm:text-base md:text-lg lg:text-lg"
                            >
                                ArutalaLab merupakan platform untuk IT
                                Education, Resource, dan Software Services
                                yang mendukung pertumbuhan individu dan
                                perusahaan.
                            </Typography>
                        </div>

                        {/* Buttons */}
                        <div className="flex sm:flex-row gap-3 justify-center items-center sm:gap-4 lg:gap-4">
                            <Button
                                size="sm"
                                shape="solid"
                                color="accent-600"
                                className="sm:text-xs sm:px-4 py-3 sm:min-h-[1rem] sm:rounded-[20px] lg:text-sm lg:px-6 py-3 lg:min-h-[2.5rem] lg:gap-3 lg:rounded-[20px]"
                            >
                                Contact Us
                            </Button>
                            <Button
                                size="sm"
                                shape="outline"
                                color="accent-600"
                                className="sm:text-xs sm:px-4 py-3 sm:min-h-[1rem] sm:rounded-[20px] lg:text-sm lg:px-6 py-3 lg:min-h-[2.5rem] lg:gap-3 lg:rounded-[20px]"
                            >
                                Pelatihan Mendatang
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
