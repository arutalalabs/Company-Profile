'use client'
import { useState, useEffect, useCallback } from 'react'
import { Typography } from '@/components/atoms/typography'

export interface PosterModalProps {
    posterUrl: string
    title: string
    onClose: () => void
}

const ZOOM_LEVELS = [75, 100, 150, 200] as const
type ZoomLevel = (typeof ZOOM_LEVELS)[number]

export function PosterModal({ posterUrl, title, onClose }: PosterModalProps) {
    const [zoom, setZoom] = useState<ZoomLevel>(100)
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024

    const zoomIn = useCallback(() => {
        setZoom((prev) => {
            const idx = ZOOM_LEVELS.indexOf(prev)
            return idx < ZOOM_LEVELS.length - 1 ? ZOOM_LEVELS[idx + 1] : prev
        })
    }, [])

    const zoomOut = useCallback(() => {
        setZoom((prev) => {
            const idx = ZOOM_LEVELS.indexOf(prev)
            return idx > 0 ? ZOOM_LEVELS[idx - 1] : prev
        })
    }, [])

    // Keyboard shortcuts: Escape → close, +/= → zoom in, - → zoom out
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') { onClose(); return }
            if (e.key === '+' || e.key === '=') zoomIn()
            if (e.key === '-') zoomOut()
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [onClose, zoomIn, zoomOut])

    // Scroll-wheel zoom on desktop
    useEffect(() => {
        const handler = (e: WheelEvent) => {
            if (window.innerWidth < 1024) return
            e.preventDefault()
            if (e.deltaY < 0) zoomIn()
            else zoomOut()
        }
        window.addEventListener('wheel', handler, { passive: false })
        return () => window.removeEventListener('wheel', handler)
    }, [zoomIn, zoomOut])

    const canZoomIn = ZOOM_LEVELS.indexOf(zoom) < ZOOM_LEVELS.length - 1
    const canZoomOut = ZOOM_LEVELS.indexOf(zoom) > 0

    return (
        <div
            className="fixed inset-0 bg-black/85 z-50 flex flex-col items-center justify-center"
            onClick={onClose}
        >
            {/* Toolbar */}
            <div
                className="flex items-center justify-between w-full max-w-[260px] sm:max-w-[320px] md:max-w-[420px] lg:max-w-[520px] 2xl:max-w-[600px] mb-3 px-1"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Zoom controls — desktop only */}
                <div className="hidden lg:flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-full px-2 py-1">
                    <button
                        onClick={zoomOut}
                        disabled={!canZoomOut}
                        className="w-7 h-7 flex items-center justify-center rounded-full text-white hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-base font-bold"
                        aria-label="Zoom out"
                    >
                        −
                    </button>
                    <span className="text-white text-xs font-medium w-10 text-center select-none">
                        {zoom}%
                    </span>
                    <button
                        onClick={zoomIn}
                        disabled={!canZoomIn}
                        className="w-7 h-7 flex items-center justify-center rounded-full text-white hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-base font-bold"
                        aria-label="Zoom in"
                    >
                        +
                    </button>
                    {/* Step pills */}
                    <div className="flex items-center gap-0.5 ml-1 border-l border-white/20 pl-2">
                        {ZOOM_LEVELS.map((level) => (
                            <button
                                key={level}
                                onClick={() => setZoom(level)}
                                className={[
                                    'text-[10px] px-1.5 py-0.5 rounded-full transition-colors',
                                    zoom === level
                                        ? 'bg-white text-black font-semibold'
                                        : 'text-white/70 hover:text-white',
                                ].join(' ')}
                            >
                                {level}%
                            </button>
                        ))}
                    </div>
                </div>

                {/* Spacer on mobile */}
                <div className="lg:hidden" />

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="text-white hover:text-gray-300 transition-colors text-sm"
                >
                    ✕ Tutup
                </button>
            </div>

            {/* Scrollable image container */}
            <div
                className="overflow-auto rounded-2xl"
                style={{ maxHeight: '80vh', maxWidth: '90vw' }}
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={posterUrl}
                    alt={title}
                    draggable={false}
                    style={{ width: `${zoom}%`, minWidth: '260px', transition: 'width 0.25s ease' }}
                    className={[
                        'block rounded-2xl object-contain select-none',
                        zoom < 100 ? 'mx-auto' : '',
                        // cursor hint on desktop
                        canZoomIn ? 'lg:cursor-zoom-in' : 'lg:cursor-zoom-out',
                    ].join(' ')}
                    onClick={(e) => {
                        e.stopPropagation()
                        if (window.innerWidth >= 1024) zoomIn()
                    }}
                />
            </div>

            {/* Mobile hint */}
            <p className="lg:hidden text-white/50 text-xs mt-3 select-none">
                Cubit untuk memperbesar
            </p>
        </div>
    )
}
