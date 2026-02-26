import { useState, useEffect, useCallback } from 'react'

export type AnimationPhase = 'idle' | 'slide-out' | 'reposition' | 'slide-in'
export type SlideDirection = 'left' | 'right'

interface UseCarouselReturn {
    currentIndex: number
    isAnimating: boolean
    slideDirection: SlideDirection
    animationPhase: AnimationPhase
    next: () => void
    prev: () => void
}

/**
 * Custom hook for carousel/slider behavior with smooth two-phase slide animation.
 *
 * @param itemCount - Total number of items in the carousel
 * @param autoSlideInterval - Auto-slide interval in ms (0 to disable). Default: 0
 */
export function useCarousel(itemCount: number, autoSlideInterval = 0): UseCarouselReturn {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const [slideDirection, setSlideDirection] = useState<SlideDirection>('right')
    const [animationPhase, setAnimationPhase] = useState<AnimationPhase>('idle')

    const changeItem = useCallback((newIndex: number, direction: SlideDirection) => {
        if (isAnimating) return
        setIsAnimating(true)
        setSlideDirection(direction)

        // Phase 1: slide out current content
        setAnimationPhase('slide-out')
        setTimeout(() => {
            // Swap content while off-screen, reposition to entry side instantly
            setCurrentIndex(newIndex)
            setAnimationPhase('reposition')

            // Allow browser to apply the repositioned state before animating in
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    // Phase 2: slide in new content
                    setAnimationPhase('slide-in')
                    setTimeout(() => {
                        setAnimationPhase('idle')
                        setIsAnimating(false)
                    }, 500)
                })
            })
        }, 500)
    }, [isAnimating])

    const next = useCallback(() => {
        if (itemCount <= 0) return
        changeItem((currentIndex + 1) % itemCount, 'right')
    }, [currentIndex, itemCount, changeItem])

    const prev = useCallback(() => {
        if (itemCount <= 0) return
        changeItem((currentIndex - 1 + itemCount) % itemCount, 'left')
    }, [currentIndex, itemCount, changeItem])

    // Auto-slide effect
    useEffect(() => {
        if (autoSlideInterval <= 0 || itemCount <= 1) return
        const interval = setInterval(() => {
            next()
        }, autoSlideInterval)
        return () => clearInterval(interval)
    }, [autoSlideInterval, itemCount, next])

    return {
        currentIndex,
        isAnimating,
        slideDirection,
        animationPhase,
        next,
        prev,
    }
}
