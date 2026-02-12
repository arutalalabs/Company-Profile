import React from 'react'
import { Typography, Image } from '@/components'

interface ContactStep {
    id: string
    icon: string
    title: string
    description: string
}

const steps: ContactStep[] = [
    {
        id: 'explore',
        icon: '/src/software-services/explore.svg',
        title: 'Explore Services',
        description: 'Melihat daftar layanan serta memahami masalah apa yang Anda ingin selesaikan.'
    },
    {
        id: 'contact',
        icon: '/src/software-services/contact.svg',
        title: 'Contact Us',
        description: 'Anda dapat menghubungi melalui halaman kontak atau melalui email'
    },
    {
        id: 'consultation',
        icon: '/src/software-services/consultation.svg',
        title: 'Consultation',
        description: 'Diskusi dengan kami kebutuhan perangkat lunak Anda'
    },
    {
        id: 'negotiation',
        icon: '/src/software-services/negotiation.svg',
        title: 'Negotiation',
        description: 'Menyusun scope, estimasi waktu, biaya pekerjaan serta penetapan layanan'
    },
    {
        id: 'project',
        icon: '/src/software-services/project.svg',
        title: 'Project Kickoff',
        description: 'Tanda tangan kesepakatan yang telah didiskusikan serta penjadwalan proyek.'
    }
]

export default function ContactFlowSection() {
    return (
        <section className="py-12 lg:py-20 px-4 bg-white">
            <div className="container mx-auto px-4 py-4 sm:px-0 sm:py-0 sm:max-w-2xl lg:px-0 lg:py-0 lg:max-w-5xl 2xl:max-w-7xl">
                {/* Section Title */}
                <div className="mb-12 lg:mb-16">
                    <Typography
                        as="h2"
                        size="xl"
                        weight="bold"
                        color="primary-900"
                        className="mb-4 text-xl md:text-2xl lg:text-start 2xl:text-3xl"
                    >
                        Bagaimana Menghubungi Kami?
                    </Typography>
                </div>

                {/* Mobile: Vertical Flow */}
                <div className="flex lg:hidden flex-col items-center gap-6 max-w-xs mx-auto">
                    {steps.map((step, index) => (
                        <React.Fragment key={step.id}>
                            {/* Step Card */}
                            <div className="w-full bg-white rounded-2xl border-2 border-[var(--color-primary-600)] p-5 2xl:p-6 shadow-sm min-h-[150px]">
                                <div className="flex gap-4 items-start h-full">
                                    {/* Icon */}
                                    <div className="flex-shrink-0 w-12 h-12">
                                        <Image
                                            src={step.icon}
                                            alt={step.title}
                                            size="sm"
                                            fit="contain"
                                            className="w-full h-full"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <Typography
                                            as="h3"
                                            size="lg"
                                            weight="bold"
                                            color="primary-900"
                                            className="text-base mb-2"
                                        >
                                            {step.title}
                                        </Typography>
                                        <Typography
                                            as="p"
                                            size="sm"
                                            weight="normal"
                                            color="neutral-950"
                                            className="text-sm"
                                        >
                                            {step.description}
                                        </Typography>
                                    </div>
                                </div>
                            </div>

                            {/* Arrow between steps (except last) */}
                            {index < steps.length - 1 && (
                                <div className="flex justify-center items-center w-full">
                                    <Image
                                        src="/src/software-services/arrow-bottom.svg"
                                        alt="Arrow"
                                        size="xs"
                                        className="w-4 h-4"
                                    />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Desktop: Custom Flow Layout */}
                <div className="hidden lg:block">
                    {/* Top Row: 3 Cards */}
                    <div className="flex justify-center items-start gap-6 mb-12">
                        {/* Explore Services */}
                        <div className="w-80 lg:w-[340px] 2xl:w-80 ">
                            <div className="bg-white rounded-2xl border-2 border-[var(--color-primary-600)] p-5 2xl:p-6 shadow-sm hover:shadow-md transition-shadow lg:h-[180px] 2xl:h-[180px]">
                                <div className="flex gap-4 items-start h-full">
                                    <div className="flex-shrink-0 lg:w-12 lg:h-12 2xl:w-16 2xl:h-16">
                                        <Image
                                            src={steps[0].icon}
                                            alt={steps[0].title}
                                            size="sm"
                                            fit="contain"
                                            className="w-full h-full"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <Typography
                                            as="h3"
                                            size="lg"
                                            weight="bold"
                                            color="primary-900"
                                            className="text-lg lg:text-xl mb-2"
                                        >
                                            {steps[0].title}
                                        </Typography>
                                        <Typography
                                            as="p"
                                            size="sm"
                                            weight="normal"
                                            color="neutral-950"
                                            className="text-sm"
                                        >
                                            {steps[0].description}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Arrow Right */}
                        <div className="flex items-center pt-16 lg:pt-18 2xl:pt-16">
                            <Image
                                src="/src/software-services/arrow-right.svg"
                                alt="Arrow"
                                size="sm"
                                fit="contain"
                                className="lg:w-8 lg:h-8 2xl:w-10 2xl:h-10"
                            />
                        </div>

                        {/* Contact Us */}
                        <div className="w-80 lg:w-[340px] 2xl:w-80">
                            <div className="bg-white rounded-2xl border-2 border-[var(--color-primary-600)] p-5 2xl:p-6 shadow-sm hover:shadow-md transition-shadow h-[180px] 2xl:h-[180px]">
                                <div className="flex gap-4 items-start h-full">
                                    <div className="flex-shrink-0 lg:w-12 lg:h-12 2xl:w-16 2xl:h-16">
                                        <Image
                                            src={steps[1].icon}
                                            alt={steps[1].title}
                                            size="sm"
                                            fit="contain"
                                            className="w-full h-full"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <Typography
                                            as="h3"
                                            size="lg"
                                            weight="bold"
                                            color="primary-900"
                                            className="text-lg lg:text-xl mb-2"
                                        >
                                            {steps[1].title}
                                        </Typography>
                                        <Typography
                                            as="p"
                                            size="sm"
                                            weight="normal"
                                            color="neutral-950"
                                            className="text-sm"
                                        >
                                            {steps[1].description}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Arrow Right */}
                        <div className="flex items-center pt-16 lg:pt-18 2xl:pt-16">
                            <Image
                                src="/src/software-services/arrow-right.svg"
                                alt="Arrow"
                                size="sm"
                                fit="contain"
                                className="lg:w-8 lg:h-8 2xl:w-10 2xl:h-10"
                            />
                        </div>

                        {/* Consultation */}
                        <div className="w-80 lg:w-[340px] 2xl:w-80">
                            <div className="bg-white rounded-2xl border-2 border-[var(--color-primary-600)] p-5 2xl:p-6 shadow-sm hover:shadow-md transition-shadow h-[180px]">
                                <div className="flex gap-4 items-start h-full">
                                    <div className="flex-shrink-0 lg:w-12 lg:h-12 2xl:w-16 2xl:h-16">
                                        <Image
                                            src={steps[2].icon}
                                            alt={steps[2].title}
                                            size="sm"
                                            fit="contain"
                                            className="w-full h-full"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <Typography
                                            as="h3"
                                            size="lg"
                                            weight="bold"
                                            color="primary-900"
                                            className="text-lg lg:text-xl mb-2"
                                        >
                                            {steps[2].title}
                                        </Typography>
                                        <Typography
                                            as="p"
                                            size="sm"
                                            weight="normal"
                                            color="neutral-950"
                                            className="text-sm"
                                        >
                                            {steps[2].description}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Row: 2 Cards */}
                    <div className="flex justify-center items-start gap-6">
                        {/* Project Kickoff */}
                        <div className="w-80 lg:w-[340px] 2xl:w-80">
                            <div className="bg-white rounded-2xl border-2 border-[var(--color-primary-600)] p-5 2xl:p-6 shadow-sm hover:shadow-md transition-shadow h-[180px]">
                                <div className="flex gap-4 items-start h-full">
                                    <div className="flex-shrink-0 lg:w-12 lg:h-12 2xl:w-16 2xl:h-16">
                                        <Image
                                            src={steps[3].icon}
                                            alt={steps[3].title}
                                            size="sm"
                                            fit="contain"
                                            className="w-full h-full"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <Typography
                                            as="h3"
                                            size="lg"
                                            weight="bold"
                                            color="primary-900"
                                            className="text-lg lg:text-xl mb-2"
                                        >
                                            {steps[3].title}
                                        </Typography>
                                        <Typography
                                            as="p"
                                            size="sm"
                                            weight="normal"
                                            color="neutral-950"
                                            className="text-sm"
                                        >
                                            {steps[3].description}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Arrow Left */}
                        <div className="flex items-center pt-16 lg:pt-18 2xl:pt-16">
                            <Image
                                src="/src/software-services/arrow-left.svg"
                                alt="Arrow"
                                size="sm"
                                fit="contain"
                                className="lg:w-8 lg:h-8 2xl:w-10 2xl:h-10"
                            />
                        </div>

                        {/* Negotiation */}
                        <div className="w-80 lg:w-[340px] 2xl:w-80">
                            <div className="bg-white rounded-2xl border-2 border-[var(--color-primary-600)] p-5 2xl:p-6 shadow-sm hover:shadow-md transition-shadow h-[180px]">
                                <div className="flex gap-4 items-start h-full">
                                    <div className="flex-shrink-0 lg:w-12 lg:h-12 2xl:w-16 2xl:h-16">
                                        <Image
                                            src={steps[4].icon}
                                            alt={steps[4].title}
                                            size="sm"
                                            fit="contain"
                                            className="w-full h-full"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <Typography
                                            as="h3"
                                            size="lg"
                                            weight="bold"
                                            color="primary-900"
                                            className="text-lg lg:text-xl mb-2"
                                        >
                                            {steps[4].title}
                                        </Typography>
                                        <Typography
                                            as="p"
                                            size="sm"
                                            weight="normal"
                                            color="neutral-950"
                                            className="text-sm"
                                        >
                                            {steps[4].description}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Arrow Curved Top-Left */}
                            <div className="flex items-center pt-16 lg:pt-18 2xl:pt-16">
                                <Image
                                    src="/src/software-services/arrow-top-left.svg"
                                    alt="Arrow"
                                    size="sm"
                                    fit="contain"
                                    className="lg:w-8 lg:h-8 2xl:w-10 2xl:h-10"
                                />
                            </div>
                    </div>
                </div>
            </div>
        </section>
    )
}