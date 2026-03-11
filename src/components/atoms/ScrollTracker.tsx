'use client'

import { useEffect, useRef } from 'react'
import { trackScrollDepth } from '@/lib/analytics'

/**
 * Milestone scroll yang ingin dilacak (dalam persen).
 * Urut dari kecil ke besar agar pengecekan efisien.
 */
const SCROLL_MILESTONES = [25, 50, 75, 90]

/**
 * Komponen invisible yang melacak seberapa jauh pengguna men-scroll halaman.
 *
 * Cara kerja:
 * 1. Komponen ini tidak merender UI apapun (return null).
 * 2. Saat dipasang, ia mendaftarkan event listener 'scroll' pada window.
 * 3. Setiap scroll, ia menghitung persentase posisi scroll saat ini.
 * 4. Jika melewati milestone (25/50/75/90%), event GA4 dikirim SEKALI saja.
 * 5. Set `firedRef` dipakai untuk mencatat milestone mana yang sudah dikirim.
 *
 * Rumus persentase scroll:
 *   (jarak scroll dari atas + tinggi layar) / total tinggi halaman × 100
 *
 * Karena ini Client Component, pasang di dalam Server Component (page.tsx)
 * tanpa khawatir — komponen ini hanya aktif di browser.
 */
export default function ScrollTracker() {
    // Ref untuk menyimpan set milestone yang sudah dikirim ke GA4
    // Menggunakan ref (bukan state) agar tidak menyebabkan re-render
    const firedRef = useRef<Set<number>>(new Set())

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY
            const windowHeight = window.innerHeight
            const docHeight = document.documentElement.scrollHeight

            // Hitung persentase scroll saat ini
            const scrollPercent = Math.round(
                ((scrollTop + windowHeight) / docHeight) * 100
            )

            // Cek setiap milestone — kirim event hanya jika belum pernah dikirim
            for (const milestone of SCROLL_MILESTONES) {
                if (scrollPercent >= milestone && !firedRef.current.has(milestone)) {
                    firedRef.current.add(milestone)
                    trackScrollDepth(milestone)
                }
            }
        }

        // Pasang listener dengan passive: true agar tidak menghambat performa scroll
        window.addEventListener('scroll', handleScroll, { passive: true })

        // Cleanup: hapus listener saat komponen di-unmount
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Tidak merender apapun ke UI
    return null
}
