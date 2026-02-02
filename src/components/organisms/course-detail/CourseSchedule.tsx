'use client'
import { Typography, Button } from '@/components'
import { ScheduleTable, type ScheduleRowData } from '@/components/molecules/schedule-table'
import type { CourseDetailBatch, Prices } from '@/lib/api/courses'

interface CourseScheduleProps {
    batches: CourseDetailBatch[]
    onRegisterClick?: (batchName: string) => void
}

/**
 * CourseSchedule - Section showing available batches with schedule and pricing
 */
export function CourseSchedule({ batches, onRegisterClick }: CourseScheduleProps) {
    // Helper function to format price
    const formatPrice = (prices: Prices | undefined): string => {
        if (!prices) return 'Gratis'
        
        if (prices.finalPrice === 0 || prices.basePrice === 0) {
            return 'Gratis'
        }
        
        const price = prices.finalPrice || prices.basePrice
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price)
    }

    // Helper to format original price
    const formatOriginalPrice = (prices: Prices | undefined): string | undefined => {
        if (!prices || !prices.basePrice || prices.basePrice === 0) return undefined
        if (prices.finalPrice === prices.basePrice) return undefined
        
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(prices.basePrice)
    }

    // Helper function to format date
    const formatDate = (dateString: string): string => {
        if (!dateString) return ''
        const date = new Date(dateString)
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
    }

    // Format date range
    const formatDateRange = (startDate: string, endDate: string): string => {
        const start = formatDate(startDate)
        const end = formatDate(endDate)
        return `${start} - ${end}`
    }

    // Convert batches to schedule rows
    const scheduleRows: ScheduleRowData[] = batches.map(batch => ({
        batchName: batch.name,
        schedule: formatDateRange(batch.start_date, batch.end_date),
        originalPrice: formatOriginalPrice(batch.prices),
        finalPrice: formatPrice(batch.prices),
        status: batch.status === 'full' ? 'full' : batch.status === 'coming-soon' ? 'coming-soon' : 'available'
    }))

    return (
        <section className="py-10 lg:py-16 bg-gray-50">
            <div className="mx-auto max-w-xs sm:max-w-md md:max-w-xl lg:max-w-5xl 2xl:max-w-7xl px-4">
                <ScheduleTable 
                    title="Jadwal & Biaya"
                    rows={scheduleRows}
                    size="md"
                />

                {/* Register Button */}
                <div className="mt-6 flex justify-center">
                    <Button
                        size="md"
                        shape="solid"
                        color="accent-600"
                        onClick={() => onRegisterClick?.(batches[0]?.name || '')}
                        className="text-sm sm:text-base px-8"
                    >
                        Daftar Sekarang
                    </Button>
                </div>
            </div>
        </section>
    )
}
