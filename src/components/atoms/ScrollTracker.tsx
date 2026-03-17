'use client'

import { useEffect, useRef } from 'react'
import { trackScrollDepth } from '@/lib/analytics'

const SCROLL_MILESTONES = [25, 50, 75, 90]

export default function ScrollTracker() {
    const firedRef = useRef<Set<number>>(new Set())
    const rafRef = useRef<number | null>(null)

    useEffect(() => {
        const handleScroll = () => {
            if (rafRef.current !== null) return

            rafRef.current = window.requestAnimationFrame(() => {
                const scrollTop = window.scrollY
                const windowHeight = window.innerHeight
                const docHeight = document.documentElement.scrollHeight
                const denominator = Math.max(1, docHeight)

                const scrollPercent = Math.round(
                    ((scrollTop + windowHeight) / denominator) * 100
                )

                for (const milestone of SCROLL_MILESTONES) {
                    if (scrollPercent >= milestone && !firedRef.current.has(milestone)) {
                        firedRef.current.add(milestone)
                        trackScrollDepth(milestone)
                    }
                }

                if (firedRef.current.size >= SCROLL_MILESTONES.length) {
                    window.removeEventListener('scroll', handleScroll)
                }

                rafRef.current = null
            })
        }

        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', handleScroll)
            if (rafRef.current !== null) {
                window.cancelAnimationFrame(rafRef.current)
            }
        }
    }, [])

    return null
}
