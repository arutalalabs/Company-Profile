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

    // Helper to calculate discount percentage
    const calculateDiscount = (prices: Prices | undefined): number | undefined => {
        if (!prices || !prices.basePrice || !prices.finalPrice) return undefined
        if (prices.finalPrice === prices.basePrice) return undefined
        
        const discount = ((prices.basePrice - prices.finalPrice) / prices.basePrice) * 100
        return Math.round(discount)
    }

    // Helper function to format date
    const formatDate = (dateString: string): string => {
        if (!dateString) return ''
        const date = new Date(dateString)
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
    }

    // Format date range
    const formatDateRange = (startDate: string, endDate: string): string => {
        const start = formatDate(startDate)
        const end = formatDate(endDate)
        return `${start} - ${end}`
    }

    // Helper to determine actual batch status based on dates
    const getBatchStatus = (batch: CourseDetailBatch): 'available' | 'full' | 'coming-soon' => {
        const now = new Date()
        now.setHours(0, 0, 0, 0) // Reset time to start of day for accurate comparison
        
        // Check if registration period has ended
        if (batch.registration_end) {
            const registrationEndDate = new Date(batch.registration_end)
            registrationEndDate.setHours(23, 59, 59, 999) // End of day
            
            if (now > registrationEndDate) {
                return 'full' // Registration closed
            }
        }
        
        // Check if registration hasn't started yet
        if (batch.registration_start) {
            const registrationStartDate = new Date(batch.registration_start)
            registrationStartDate.setHours(0, 0, 0, 0)
            
            if (now < registrationStartDate) {
                return 'coming-soon' // Registration not open yet
            }
        }
        
        // Use database status if within registration period
        if (batch.status === 'full') return 'full'
        if (batch.status === 'coming-soon') return 'coming-soon'
        
        return 'available'
    }

    // Convert batches to schedule rows
    const scheduleRows: ScheduleRowData[] = batches.map(batch => ({
        batchName: batch.name,
        schedule: formatDateRange(batch.start_date, batch.end_date),
        registrationRange: batch.registration_start && batch.registration_end 
            ? formatDateRange(batch.registration_start, batch.registration_end)
            : undefined,
        classSchedule: batch.class_schedule || undefined,
        originalPrice: formatOriginalPrice(batch.prices),
        finalPrice: formatPrice(batch.prices),
        discountPercent: calculateDiscount(batch.prices),
        status: getBatchStatus(batch),
        onRegisterClick: () => onRegisterClick?.(batch.name)
    }))

    return (
        <section className="py-10 lg:py-16 bg-white">
            <div className="mx-auto lg:max-w-6xl 2xl:max-w-7xl px-4">
                <ScheduleTable 
                    title="Jadwal & Biaya"
                    rows={scheduleRows}
                    size="md"
                />
            </div>
        </section>
    )
}