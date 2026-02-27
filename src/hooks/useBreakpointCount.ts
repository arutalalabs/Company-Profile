import { useState, useEffect } from 'react'

export interface BreakpointCountConfig {
    /** Default count before any resize event fires */
    default?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    '2xl'?: number
}

/**
 * Returns a count value that changes based on the current viewport width.
 * Breakpoints match Tailwind's defaults: sm=640, md=768, lg=1024, xl=1280, 2xl=1536.
 */
export function useBreakpointCount(config: BreakpointCountConfig): number {
    const resolve = (width: number): number => {
        if (width >= 1536 && config['2xl'] !== undefined) return config['2xl']
        if (width >= 1280 && config.xl !== undefined) return config.xl
        if (width >= 1024 && config.lg !== undefined) return config.lg
        if (width >= 768 && config.md !== undefined) return config.md
        if (width >= 640 && config.sm !== undefined) return config.sm
        return config.default ?? 1
    }

    const [count, setCount] = useState<number>(config.default ?? 1)

    useEffect(() => {
        const handleResize = () => setCount(resolve(window.innerWidth))
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return count
}
