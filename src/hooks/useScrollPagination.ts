import { useState, useRef, useEffect, type RefObject } from 'react'

export interface UseScrollPaginationReturn {
    scrollContainerRef: RefObject<HTMLDivElement | null>
    currentPage: number
    totalPages: number
    handleScroll: () => void
    scrollToPage: (pageIndex: number) => void
    getPaginationDots: () => (number | 'ellipsis')[]
}

/**
 * Manages horizontal scroll pagination with smart dot indicators.
 * @param deps - dependency array to re-calculate pages when list changes
 */
export function useScrollPagination(deps: unknown[] = []): UseScrollPaginationReturn {
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    // Calculate total pages for mobile view
    useEffect(() => {
        const calculatePages = () => {
            if (!scrollContainerRef.current || typeof window === 'undefined') return

            const container = scrollContainerRef.current
            const pages = Math.ceil(container.scrollWidth / container.offsetWidth)
            setTotalPages(pages)
        }

        calculatePages()
        window.addEventListener('resize', calculatePages)
        return () => window.removeEventListener('resize', calculatePages)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)

    const handleScroll = () => {
        if (!scrollContainerRef.current) return
        const container = scrollContainerRef.current
        const page = Math.round(container.scrollLeft / container.offsetWidth)
        setCurrentPage(page)
    }

    const scrollToPage = (pageIndex: number) => {
        if (!scrollContainerRef.current) return
        const container = scrollContainerRef.current
        container.scrollTo({
            left: pageIndex * container.offsetWidth,
            behavior: 'smooth',
        })
    }

    // Smart pagination: show max 7 dots with ellipsis
    const getPaginationDots = (): (number | 'ellipsis')[] => {
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i)
        }

        const dots: (number | 'ellipsis')[] = []

        if (currentPage <= 3) {
            for (let i = 0; i < 5; i++) dots.push(i)
            dots.push('ellipsis')
            dots.push(totalPages - 1)
        } else if (currentPage >= totalPages - 4) {
            dots.push(0)
            dots.push('ellipsis')
            for (let i = totalPages - 5; i < totalPages; i++) dots.push(i)
        } else {
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

    return { scrollContainerRef, currentPage, totalPages, handleScroll, scrollToPage, getPaginationDots }
}
