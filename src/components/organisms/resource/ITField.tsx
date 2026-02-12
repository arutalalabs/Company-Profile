'use client'
import { Typography, Image } from '@/components'
import { useState } from 'react'

interface ITFieldItem {
    id: string
    title: string
    icon: string
    description: string
}

const fields: ITFieldItem[] = [
    {
        id: 'qa',
        title: 'Software QA',
        icon: '/src/resource/qa.svg',
        description: 'Melakukan pengujian perangkat lunak untuk memastikan kualitas, menemukan bug, dan menjamin produk berjalan sesuai kebutuhan pengguna.'
    },
    {
        id: 'backend',
        title: 'Back-End Developer',
        icon: '/src/resource/back-dev.svg',
        description: 'Mengembangkan logika aplikasi, API, dan database di sisi server untuk mendukung fungsionalitas aplikasi secara keseluruhan.'
    },
    {
        id: 'frontend',
        title: 'Front-End Developer',
        icon: '/src/resource/front-dev.svg',
        description: 'Membangun tampilan antarmuka pengguna yang interaktif dan responsif menggunakan teknologi web modern.'
    },
    {
        id: 'writer',
        title: 'Technical Writer',
        icon: '/src/resource/writer.svg',
        description: 'Menyusun dokumentasi teknis yang jelas dan terstruktur untuk membantu pengguna dan tim pengembang memahami produk.'
    }
]

export default function ITField() {
    const [activeField, setActiveField] = useState<string | null>(null)

    const toggleField = (id: string) => {
        setActiveField(prev => prev === id ? null : id)
    }

    const handleMouseEnter = (id: string) => {
        setActiveField(id)
    }

    const handleMouseLeave = () => {
        setActiveField(null)
    }

    return (
        <section className="py-12 lg:py-20 px-4">
            <div className="max-w-xs md:max-w-2xl lg:max-w-5xl 2xl:max-w-7xl mx-auto">
                {/* Section Title */}
                <div className="text-center mb-10 lg:mb-14">
                    <Typography
                        as="h2"
                        size="xl"
                        weight="bold"
                        color="neutral-950"
                        className="text-xl md:text-2xl lg:text-3xl"
                    >
                        Siap Memenuhi Kebutuhan Talent IT Berbagai Posisi
                    </Typography>
                </div>

                {/* Fields - Horizontal Row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                    {fields.map((field) => {
                        const isActive = activeField === field.id
                        return (
                            <div
                                key={field.id}
                                className="flex flex-col"
                                onMouseEnter={() => handleMouseEnter(field.id)}
                                onMouseLeave={handleMouseLeave}
                            >
                                {/* Card Container - Border meliputi keseluruhan */}
                                <div
                                    className={`
                                        rounded-xl border-2 transition-all duration-300
                                        ${isActive
                                            ? 'border-[var(--color-primary-600)] bg-[var(--color-primary-50)] shadow-lg'
                                            : 'border-[var(--color-primary-900)] bg-white hover:border-[var(--color-primary-400)] hover:shadow-md'
                                        }
                                    `}
                                >
                                    {/* Header - Icon & Title */}
                                    <button
                                        onClick={() => toggleField(field.id)}
                                        className="flex items-center justify-between gap-3 lg:gap-4 px-4 py-2 lg:px-5 lg:py-2 cursor-pointer w-full"
                                    >

                                        {/* Title */}
                                        <Typography
                                            as="span"
                                            size="sm"
                                            weight="semibold"
                                            color="neutral-950"
                                            className="text-sm lg:text-base text-left leading-tight"
                                        >
                                            {field.title}
                                        </Typography>

                                        {/* Icon */}
                                        <div className={`
                                            w-10 h-10 lg:w-12 lg:h-12 flex-shrink-0 flex items-center justify-center
                                            transition-all duration-300
                                            ${isActive ? 'scale-100' : ''}
                                        `}>
                                            <Image
                                                src={field.icon}
                                                alt={field.title}
                                                size="sm"
                                                fit="contain"
                                                className="w-8 h-8 lg:w-8 lg:h-8"
                                            />
                                        </div>
                                    </button>

                                    {/* Dropdown Description - Dalam border yang sama */}
                                    <div className={`
                                        overflow-hidden transition-all duration-300 ease-in-out
                                        ${isActive ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}
                                    `}>
                                        <div className="px-4 pb-4 lg:px-5 lg:pb-5 pt-0">
                                            <div className="border-t border-[var(--color-primary-200)] pt-3">
                                                <Typography
                                                    as="p"
                                                    size="sm"
                                                    weight="normal"
                                                    color="neutral-950"
                                                    leading="relaxed"
                                                    className="text-xs lg:text-sm"
                                                >
                                                    {field.description}
                                                </Typography>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}