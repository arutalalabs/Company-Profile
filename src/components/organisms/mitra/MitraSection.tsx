'use client'

import { Typography } from '@/components'
import { MitraCard } from '@/components/molecules/mitra-card'
import type { MitraSectionProps } from '@/types/mitra'
import { useScrollPagination } from '@/hooks/useScrollPagination'

export type { MitraSectionProps }

export function MitraSection({ mitras }: MitraSectionProps) {
    const { scrollContainerRef, currentPage, totalPages, handleScroll, scrollToPage, getPaginationDots } = useScrollPagination([mitras])

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

                {Array.isArray(mitras) && mitras.length > 0 ? (
                    <>
                        {/* Desktop Grid - Hidden on Mobile */}
                        <div className="hidden lg:block bg-[var(--color-neutral-50)] w-full h-full rounded-2xl p-6">
                            <div className="grid grid-cols-3 xl:grid-cols-4 gap-6">
                                {mitras.map((mitra, index) => (
                                    <MitraCard
                                        key={mitra.id ?? `mitra-${index}`}
                                        name={mitra.mitra_name}
                                        logoUrl={mitra.mitra_logo_url}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Mobile/Tablet Horizontal Scroll - Hidden on Desktop */}
                        <div className="lg:hidden">
                            <div className="bg-[var(--color-neutral-50)] w-full rounded-2xl p-4 sm:p-6">
                                <div
                                    ref={scrollContainerRef}
                                    onScroll={handleScroll}
                                    className="overflow-x-auto scrollbar-hide snap-x snap-mandatory"
                                    style={{
                                        scrollbarWidth: 'none',
                                        msOverflowStyle: 'none',
                                        WebkitOverflowScrolling: 'touch',
                                        scrollSnapType: 'x mandatory',
                                        scrollSnapStop: 'always'
                                    }}
                                >
                                    <div className="flex gap-4 sm:gap-6 pb-2">
                                        {mitras.map((mitra, index) => (
                                            <div
                                                key={mitra.id ?? `mitra-${index}`}
                                                className="flex-shrink-0 w-full sm:w-[calc(50%-0.75rem)]"
                                                style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
                                            >
                                                <MitraCard
                                                    name={mitra.mitra_name}
                                                    logoUrl={mitra.mitra_logo_url}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Pagination Dots - Mobile only */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-center gap-1.5 mt-6">
                                    {getPaginationDots().map((dot, index) => {
                                        if (dot === 'ellipsis') {
                                            return (
                                                <span
                                                    key={`ellipsis-${index}`}
                                                    className="text-neutral-400 text-sm"
                                                >
                                                    ...
                                                </span>
                                            )
                                        }
                                        
                                        return (
                                            <button
                                                key={dot}
                                                onClick={() => scrollToPage(dot)}
                                                className={`transition-all duration-300 rounded-full ${
                                                    currentPage === dot
                                                        ? 'w-6 h-2 bg-[var(--color-primary-900)]'
                                                        : 'w-2 h-2 bg-neutral-300 hover:bg-neutral-400'
                                                }`}
                                                aria-label={`Go to page ${dot + 1}`}
                                            />
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    // Empty State
                    <div className="bg-[var(--color-neutral-50)] w-full h-full rounded-2xl p-6">
                        <div className="py-12 text-center">
                            <Typography as="h3" color="neutral-950" align="center">
                                {Array.isArray(mitras)
                                    ? 'Belum ada data mitra yang tersedia'
                                    : 'Gagal memuat data mitra'}
                            </Typography>
                        </div>
                    </div>
                )}
            </div>

        </section>
    )
}
