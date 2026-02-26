'use client'

import { Typography } from '@/components'
import { MitraCard } from '@/components/molecules/mitra-card'
import type { Mitra } from '@/types/mitra'
import { useState, useRef, useEffect } from 'react'

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
 * Grid untuk menampilkan list mitra dengan horizontal scroll di mobile
 * Desktop: Grid layout
 * Mobile: Swipeable dengan pagination dots
 * 
 * @example
 * ```tsx
 * <MitraSection mitras={mitrasData} />
 * ```
 */
export function MitraSection({ mitras }: MitraSectionProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    
    // Calculate total pages for mobile view
    useEffect(() => {
        const calculatePages = () => {
            if (!scrollContainerRef.current || typeof window === 'undefined') return
            
            const container = scrollContainerRef.current
            const containerWidth = container.offsetWidth
            const scrollWidth = container.scrollWidth
            
            // Calculate how many pages needed based on scroll width
            const pages = Math.ceil(scrollWidth / containerWidth)
            setTotalPages(pages)
        }
        
        calculatePages()
        window.addEventListener('resize', calculatePages)
        
        return () => window.removeEventListener('resize', calculatePages)
    }, [mitras])
    
    // Handle scroll for pagination indicator
    const handleScroll = () => {
        if (!scrollContainerRef.current) return
        
        const container = scrollContainerRef.current
        const scrollLeft = container.scrollLeft
        const containerWidth = container.offsetWidth
        
        const page = Math.round(scrollLeft / containerWidth)
        setCurrentPage(page)
    }
    
    // Scroll to specific page
    const scrollToPage = (pageIndex: number) => {
        if (!scrollContainerRef.current) return
        
        const container = scrollContainerRef.current
        const containerWidth = container.offsetWidth
        
        container.scrollTo({
            left: pageIndex * containerWidth,
            behavior: 'smooth'
        })
    }
    
    // Smart pagination: show max 7 dots with ellipsis
    const getPaginationDots = () => {
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i)
        }
        
        // Logic untuk smart pagination
        const dots: (number | 'ellipsis')[] = []
        
        if (currentPage <= 3) {
            // Awal: [0, 1, 2, 3, 4, ..., last]
            for (let i = 0; i < 5; i++) dots.push(i)
            dots.push('ellipsis')
            dots.push(totalPages - 1)
        } else if (currentPage >= totalPages - 4) {
            // Akhir: [0, ..., n-4, n-3, n-2, n-1, n]
            dots.push(0)
            dots.push('ellipsis')
            for (let i = totalPages - 5; i < totalPages; i++) dots.push(i)
        } else {
            // Tengah: [0, ..., current-1, current, current+1, ..., last]
            dots.push(0)
            dots.push('ellipsis')
            dots.push(currentPage - 1)
            dots.push(currentPage)
            dots.push(currentPage + 1)
            dots.push('ellipsis')
            dots.push(totalPages - 1)
        }
        
        return dots
    }

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

            {/* Custom CSS untuk hide scrollbar */}
            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    )
}
