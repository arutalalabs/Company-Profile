'use client'

import { Typography, Image } from '@/components'
export interface MitraCardProps {
    name: string
    logoUrl: string
    className?: string
}

export function MitraCard({
    name,
    logoUrl,
    className = ''
}: MitraCardProps) {
    return (
        <div
            className={`bg-[var(--color-neutral-50)] rounded-2xl flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${className}`}
        >
            {/* Logo Container */}
            <div className="bg-[var(--color-primary-400)] rounded-2xl py-12 lg:py-8 mb-4">
                <div className="flex items-center justify-center mx-auto">
                    <Image
                        src={logoUrl}
                        alt={`${name} logo`}
                        loading="lazy"
                        fit="contain"
                        className="w-[120px] h-[60px] max-w-[120px] max-h-[60px]"
                    />
                </div>
            </div>

            {/* Mitra Info */}
            <div className="px-2 pb-2">
                <Typography
                    as="h3"
                    size="base"
                    weight="semibold"
                    color="neutral-950"
                    align="left"
                    className="leading-tight"
                >
                    {name}
                </Typography>
            </div>
        </div>
    )
}
