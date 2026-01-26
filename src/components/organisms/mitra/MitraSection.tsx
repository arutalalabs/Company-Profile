'use client'

import { Typography } from '@/components'
import { MitraCard } from '@/components/molecules/mitra-card'
import type { Mitra } from '@/lib/api/mitras'

/**
 * Props untuk MitraSection component
 */
export interface MitraSectionProps {
    /** Array data mitra */
    mitras: Mitra[]
}

/**
 * MitraSection - Organism Component
 * 
 * Grid untuk menampilkan list mitra
 * Menggunakan molecule: MitraCard
 * 
 * @example
 * ```tsx
 * <MitraSection mitras={mitrasData} />
 * ```
 */
export function MitraSection({ mitras }: MitraSectionProps) {
    return (
        <section className="w-full h-auto bg-white">
            <div className="max-w-2xs sm:max-w-xl lg:max-w-5xl mx-auto py-18">
                {/* Section Title */}
                <Typography
                    as="h2"
                    size="2xl"
                    weight="semibold"
                    align="center"
                    color="neutral-950"
                    className="text-center mb-12"
                >
                    Mitra Kami
                </Typography>

                {/* Grid Container */}
                <div className="bg-[var(--color-neutral-50)] w-full h-full rounded-2xl">
                    {Array.isArray(mitras) && mitras.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {mitras.map((mitra) => (
                                <MitraCard
                                    key={mitra.id}
                                    name={mitra.mitra_name}
                                    logoUrl={mitra.mitra_logo_url}
                                />
                            ))}
                        </div>
                    ) : (
                        // Empty State
                        <div className="py-12 text-center">
                            <Typography as="h3" color="neutral-950" align="center">
                                {Array.isArray(mitras)
                                    ? 'Belum ada data mitra yang tersedia'
                                    : 'Gagal memuat data mitra'}
                            </Typography>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
