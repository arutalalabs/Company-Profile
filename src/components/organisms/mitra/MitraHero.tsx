'use client'

import { Typography, Image } from '@/components'

/**
 * MitraHero - Organism Component
 * 
 * Hero section untuk halaman mitra
 * Menampilkan judul dan gambar hero
 */
export function MitraHero() {
    return (
        <section className="w-full">
            <div className="w-full flex justify-center items-center py-18 bg-gradient-to-b from-[var(--color-primary-900)] to-[var(--color-primary-800)]">
                <div className="max-w-2xs sm:max-w-xl lg:max-w-5xl flex justify-center items-center gap-2 lg:px-4">
                    <Typography
                        as="h1"
                        size="2xl"
                        weight="semibold"
                        color="neutral-50"
                        className="text-center lg:text-3xl"
                    >
                        Dipercaya oleh Berbagai Perusahaan dan Institusi
                    </Typography>

                    <Image
                        src="/src/mitra-hero.webp"
                        alt="Mitra Arutalalab"
                        size="2xl"
                        shape="rounded"
                        className="rounded-2xl w-[420px] h-[180px] lg:w-[580px] lg:h-[270px] hidden md:block"
                    />
                </div>
            </div>
        </section>
    )
}
