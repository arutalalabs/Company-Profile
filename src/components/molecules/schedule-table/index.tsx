'use client'
import '@/styles/global.css'
import { clsx } from 'clsx'
import { forwardRef } from 'react'
import { Typography, Button } from '@/components'

export interface ScheduleRowData {
    /** Batch name/label */
    batchName: string
    /** Schedule date or period */
    schedule: string
    /** Original price (before discount) */
    originalPrice?: string
    /** Final price after discount */
    finalPrice: string
    /** Status of the batch */
    status?: 'available' | 'full' | 'coming-soon'
    /** Registration date (single date - deprecated, use registrationRange) */
    registrationDate?: string
    /** Registration date range */
    registrationRange?: string
    /** Class schedule (days and time) */
    classSchedule?: string
    /** Discount percentage */
    discountPercent?: number
    /** Action button handler */
    onRegisterClick?: () => void
}

export interface ScheduleTableProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Table title */
    title?: string
    /** Array of schedule rows */
    rows: ScheduleRowData[]
    /** Size variant */
    size?: 'sm' | 'md' | 'lg'
}

/**
 * ScheduleTable Component
 * 
 * Displays course schedule and pricing information in a card format.
 * Following the design with detailed batch information.
 * 
 * @example
 * ```tsx
 * <ScheduleTable
 *   title="Jadwal & Biaya"
 *   rows={[
 *     { 
 *       batchName: 'Batch 2', 
 *       schedule: '16 Nov 2025 - 15 Des 2025',
 *       registrationRange: '1 Nov 2025 - 15 Nov 2025',
 *       classSchedule: 'Rabu: 19.00 - 21.00 WIB, Kamis: 19.00 - 21.00 WIB',
 *       originalPrice: 'Rp. 2.000.000',
 *       finalPrice: 'Rp. 200.000',
 *       discountPercent: 90,
 *       status: 'available'
 *     }
 *   ]}
 * />
 * ```
 */
export const ScheduleTable = forwardRef<HTMLDivElement, ScheduleTableProps>(
    ({ title = 'Jadwal & Biaya', rows, size = 'md', className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={clsx('w-full flex flex-col items-center', className)}
                {...props}
            >
                {/* Title */}
                {title && (
                    <Typography
                        as="h2"
                        size="xl"
                        weight="bold"
                        color="neutral-950"
                        className="mb-8 text-center sm:text-xl lg:text-lg 2xl:text-2xl"
                    >
                        {title}
                    </Typography>
                )}

                {/* Cards Container */}
                <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rows.map((row, index) => (
                        <div 
                            key={index} 
                            className="bg-white border border-[var(--color-primary-900)] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                        >
                            {/* Card Header - Batch Name & Status */}
                            <div className="px-6 py-4 border-b border-[var(--color-primary-400)] flex items-center justify-between">
                                <Typography
                                    as="h3"
                                    size="lg"
                                    weight="bold"
                                    color="neutral-950"
                                    className="text-lg"
                                >
                                    {row.batchName}
                                </Typography>
                                {row.status === 'available' && (
                                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                                        Tersedia
                                    </span>
                                )}
                                {row.status === 'full' && (
                                    <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                                        Penuh
                                    </span>
                                )}
                                {row.status === 'coming-soon' && (
                                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
                                        Segera
                                    </span>
                                )}
                            </div>

                            {/* Card Body - Details */}
                            <div className="px-6 py-4 space-y-3">
                                {/* Registration Range */}
                                {(row.registrationRange || row.registrationDate) && (
                                    <div className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                        </svg>
                                        <div className="flex-1">
                                            <Typography
                                                as="p"
                                                size="sm"
                                                weight="semibold"
                                                color="neutral-950"
                                                className="text-sm mb-0.5"
                                            >
                                                Periode Pendaftaran
                                            </Typography>
                                            <Typography
                                                as="p"
                                                size="sm"
                                                color="neutral-600"
                                                className="text-sm"
                                            >
                                                {row.registrationRange || row.registrationDate}
                                            </Typography>
                                        </div>
                                    </div>
                                )}

                                {/* Class Date */}
                                {row.schedule && (
                                    <div className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <div className="flex-1">
                                            <Typography
                                                as="p"
                                                size="sm"
                                                weight="semibold"
                                                color="neutral-950"
                                                className="text-sm mb-0.5"
                                            >
                                                Kelas Dimulai
                                            </Typography>
                                            <Typography
                                                as="p"
                                                size="sm"
                                                color="neutral-600"
                                                className="text-sm"
                                            >
                                                {row.schedule}
                                            </Typography>
                                        </div>
                                    </div>
                                )}

                                {/* Class Schedule */}
                                {row.classSchedule && (
                                    <div className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div className="flex-1">
                                            <Typography
                                                as="p"
                                                size="sm"
                                                weight="semibold"
                                                color="neutral-950"
                                                className="text-sm mb-0.5"
                                            >
                                                Jadwal
                                            </Typography>
                                            <Typography
                                                as="p"
                                                size="sm"
                                                color="neutral-600"
                                                className="text-sm leading-relaxed"
                                            >
                                                {row.classSchedule}
                                            </Typography>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Card Footer - Price & Button */}
                            <div className="px-6 py-4 bg-gray-50 border-t border-[var(--color-primary-400)]">
                                <div className="mb-4">
                                    <Typography
                                        as="p"
                                        size="sm"
                                        weight="semibold"
                                        color="neutral-950"
                                        className="text-sm mb-2"
                                    >
                                        Harga
                                    </Typography>
                                    <div className="flex items-center gap-3">
                                        {row.discountPercent && row.discountPercent > 0 && (
                                            <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-bold rounded">
                                                Discount {row.discountPercent}%
                                            </span>
                                        )}
                                        {row.originalPrice && row.originalPrice !== row.finalPrice && (
                                            <Typography
                                                as="span"
                                                size="sm"
                                                color="neutral-600"
                                                className="line-through text-sm"
                                            >
                                                {row.originalPrice}
                                            </Typography>
                                        )}
                                        <Typography
                                            as="span"
                                            size="lg"
                                            weight="bold"
                                            className="text-lg text-[#3B5998] ml-auto"
                                        >
                                            {row.finalPrice}
                                        </Typography>
                                    </div>
                                </div>

                                {/* Register Button */}
                                <Button
                                    size="md"
                                    onClick={row.onRegisterClick}
                                    className="w-full bg-[#FFA500] hover:bg-[#FF8C00] text-white font-semibold rounded-lg"
                                    disabled={row.status === 'full'}
                                >
                                    {row.status === 'full' ? 'Penuh' : 'Daftar Sekarang'}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
)

ScheduleTable.displayName = 'ScheduleTable'