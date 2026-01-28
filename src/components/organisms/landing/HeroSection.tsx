'use client'
import { Tag, Typography, Button } from '@/components'

export default function HeroSection() {
    return (
        <section className="bg-[#ffffff] w-full sm:px-4 sm:pt-2 lg:pt-6 lg:px-8 ">
            <div className="relative bg-[var(--color-neutral-950)] w-full min-h-[614px] flex justify-center items-center overflow-hidden sm:rounded-2xl sm:min-h-[520px] md:min-h-[580px] lg:min-h-[480px] 2xl:min-h-[614px] lg:rounded-3xl">
                {/* Background Animations Layer */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {/* Star Glow - Top Right */}
                    <div className="absolute top-4 right-4 sm:top-2 sm:right-2 lg:top-4 lg:right-4 2xl:top-10 2xl:right-12 w-40 h-40 sm:w-56 sm:h-56 lg:w-64 lg:h-64 animate-[pulse_4s_ease-in-out_infinite]">
                        {/* Vertical beam - tall and narrow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 sm:w-6 lg:w-8 h-full bg-gradient-to-b from-transparent via-blue-900/80 to-transparent blur-md" />
                        {/* Horizontal beam - wide and short */}
                        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-4 sm:h-6 lg:h-8 bg-gradient-to-r from-transparent via-blue-900/80 to-transparent blur-md" />
                        {/* Bright center core */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 lg:w-26 lg:h-26 bg-blue-900/90 rounded-full blur-xl" />
                        {/* Inner bright spot */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-blue-900/30 rounded-full blur-md" />
                    </div>

                    {/* Star Glow - Bottom Left */}
                    <div className="absolute bottom-4 left-4 sm:bottom-2 sm:left-2 lg:bottom-4 lg:left-4 2xl:bottom-10 2xl:left-12 w-40 h-40 sm:w-56 sm:h-56 lg:w-64 lg:h-64 animate-[pulse_4s_ease-in-out_infinite_2s]">
                        {/* Vertical beam - tall and narrow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 sm:w-6 lg:w-8 h-full bg-gradient-to-b from-transparent via-blue-900/80 to-transparent blur-md" />
                        {/* Horizontal beam - wide and short */}
                        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-4 sm:h-6 lg:h-8 bg-gradient-to-r from-transparent via-blue-900/80 to-transparent blur-md" />
                        {/* Bright center core */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 lg:w-26 lg:h-26 bg-blue-900/90 rounded-full blur-xl" />
                        {/* Inner bright spot */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-blue-900/30 rounded-full blur-md" />
                    </div>

                    {/* Center Circle Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[pulse_5s_ease-in-out_infinite]">
                        {/* Outer soft glow */}
                        <div className="w-64 h-64 sm:w-60 sm:h-60 lg:w-[380px] lg:h-[300px] bg-blue-600/30 rounded-full blur-3xl" />
                        {/* Middle glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-52 sm:h-52 lg:w-64 lg:h-64 bg-blue-900/10 rounded-full blur-3xl" />
                        {/* Inner bright core */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-28 sm:h-28 lg:w-36 lg:h-36 bg-blue-800/10 rounded-full blur-3xl" />
                    </div>
                </div>

                {/* Content Layer */}
                <div className="w-[350px] flex items-center py-4 justify-center sm:w-[480px] md:w-[600px] lg:h-[322px] lg:w-[800px]">
                    <div className="text-center text-white space-y-6">
                        {/* Tag */}
                        <div className="flex justify-center mb-8">
                            <Tag size="md" variant="solid">
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
                                className="mb-2 text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl"
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
                                className="max-w-2xl lg:max-w-3xl mx-auto mb-0 lg:mb-1 text-sm sm:text-base md:text-md 2xl:text-lg"
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
