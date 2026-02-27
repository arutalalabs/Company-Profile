'use client'
import { Typography, Button } from '@/components'
import { ScheduleTable, type ScheduleRowData } from '@/components/molecules/schedule-table'
import type { CourseDetailBatch, Prices } from '@/types/course'

interface CourseScheduleProps {
    batches: CourseDetailBatch[]
    onRegisterClick?: (batchName: string) => void
}

// Helper to get Indonesian day name
const getDayName = (dateString: string): string => {
    const date = new Date(dateString)
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
    return days[date.getDay()]
}

// Helper to get day order for sorting (Senin=1, ..., Minggu=7)
const getDayOrder = (dayName: string): number => {
    const dayOrder: Record<string, number> = {
        'Senin': 1,
        'Selasa': 2,
        'Rabu': 3,
        'Kamis': 4,
        'Jumat': 5,
        'Sabtu': 6,
        'Minggu': 7
    }
    return dayOrder[dayName] || 0
}

// Helper to format time with WIB timezone
const formatTime = (timeString: string): string => {
    const [hours, minutes] = timeString.split(':')
    return `${hours}:${minutes}`
}

/**
 * CourseSchedule - Section showing available batches with schedule and pricing
 */
export function CourseSchedule({ batches, onRegisterClick }: CourseScheduleProps) {
    // Helper function to extract batch number from batch name
    const extractBatchNumber = (batchName: string): number => {
        const match = batchName.match(/\d+/)
        return match ? parseInt(match[0]) : 0
    }
    
    // Helper to map API batch status to display status
    const getBatchStatus = (batch: CourseDetailBatch): 'available' | 'full' | 'coming-soon' | 'on-going' | 'completed' => {
        // Prioritise the API status field (SCHEDULED, OPEN, ON_GOING, COMPLETED)
        switch (batch.status?.toUpperCase()) {
            case 'OPEN':      return 'available'
            case 'SCHEDULED': return 'coming-soon'
            case 'ON_GOING':  return 'on-going'
            case 'COMPLETED': return 'completed'
        }

        // Fallback: infer from registration dates
        const now = new Date()
        now.setHours(0, 0, 0, 0)

        if (batch.registration_end) {
            const registrationEndDate = new Date(batch.registration_end)
            registrationEndDate.setHours(23, 59, 59, 999)
            if (now > registrationEndDate) return 'full'
        }

        if (batch.registration_start) {
            const registrationStartDate = new Date(batch.registration_start)
            registrationStartDate.setHours(0, 0, 0, 0)
            if (now < registrationStartDate) return 'coming-soon'
        }

        return 'available'
    }
    
    // Sort batches: 1. By status priority (available > coming-soon > on-going > completed > full), 2. By batch number
    const sortedBatches = [...batches].sort((a, b) => {
        const statusA = getBatchStatus(a)
        const statusB = getBatchStatus(b)

        const statusPriority: Record<string, number> = {
            'available': 1,
            'coming-soon': 2,
            'on-going': 3,
            'completed': 4,
            'full': 5
        }
        
        const priorityA = statusPriority[statusA]
        const priorityB = statusPriority[statusB]
        
        // Sort by status first
        if (priorityA !== priorityB) {
            return priorityA - priorityB
        }
        
        // If same status, sort by batch number
        const numA = extractBatchNumber(a.name)
        const numB = extractBatchNumber(b.name)
        return numA - numB
    })
    
    // Limit to 3 most relevant batches
    // Priority: available batches > coming-soon > full
    const limitedBatches = sortedBatches.slice(0, 3)
    
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

    // Helper to format session schedule
    const formatSessionSchedule = (sessions: typeof batches[0]['sessions']): string | undefined => {
        if (!sessions || sessions.length === 0) return undefined
        
        // Collect all unique schedules with day info
        const scheduleList: Array<{ day: string, dayOrder: number, start: string, end: string }> = []
        const seen = new Set<string>()
        
        sessions.forEach(session => {
            const day = getDayName(session.date)
            const start = formatTime(session.start_time)
            const end = formatTime(session.end_time)
            const key = `${day}-${start}-${end}`
            
            if (!seen.has(key)) {
                seen.add(key)
                scheduleList.push({
                    day,
                    dayOrder: getDayOrder(day),
                    start,
                    end
                })
            }
        })
        
        // Sort by day order (Senin to Minggu)
        scheduleList.sort((a, b) => a.dayOrder - b.dayOrder)
        
        // Format as "Day : HH:MM - HH:MM WIB" separated by newline
        const schedules = scheduleList.map(s => `${s.day} : ${s.start} - ${s.end} WIB`)
        
        // Use '|' as separator to be split later in the component
        return schedules.join('|')
    }

    // Convert limited batches (max 3) to schedule rows
    const scheduleRows: ScheduleRowData[] = limitedBatches.map(batch => {
        const formattedSchedule = formatSessionSchedule(batch.sessions)
        const finalClassSchedule = formattedSchedule || batch.class_schedule || undefined
        
        return {
            batchName: batch.name,
            schedule: formatDateRange(batch.start_date, batch.end_date),
            registrationRange: batch.registration_start && batch.registration_end 
                ? formatDateRange(batch.registration_start, batch.registration_end)
                : undefined,
            classSchedule: finalClassSchedule,
            originalPrice: formatOriginalPrice(batch.prices),
            finalPrice: formatPrice(batch.prices),
            discountPercent: calculateDiscount(batch.prices),
            status: getBatchStatus(batch),
            registrationUrl: batch.registration_url,
            onRegisterClick: () => {
                if (batch.registration_url) {
                    window.open(batch.registration_url, '_blank', 'noopener,noreferrer')
                } else {
                    onRegisterClick?.(batch.name)
                }
            }
        }
    })

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