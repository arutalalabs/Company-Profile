'use client'
import '@/styles/global.css'
import { clsx } from 'clsx'
import { forwardRef } from 'react'
import { Typography } from '@/components'

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
 * Displays course schedule and pricing information in a table format.
 * Following atomic design as a molecule component.
 * 
 * @example
 * ```tsx
 * <ScheduleTable
 *   title="Jadwal & Biaya"
 *   rows={[
 *     { batchName: 'Batch 1', schedule: '15 Jan - 20 Feb 2024', originalPrice: 'Rp 1.000.000', finalPrice: 'Rp 500.000' }
 *   ]}
 * />
 * ```
 */
export const ScheduleTable = forwardRef<HTMLDivElement, ScheduleTableProps>(
    ({ title = 'Jadwal & Biaya', rows, size = 'md', className, ...props }, ref) => {
        const sizeStyles = {
            sm: {
                padding: 'p-2 sm:p-3',
                text: 'text-xs sm:text-sm'
            },
            md: {
                padding: 'p-3 sm:p-4',
                text: 'text-sm sm:text-base'
            },
            lg: {
                padding: 'p-4 sm:p-5',
                text: 'text-base sm:text-lg'
            }
        }

        return (
            <div
                ref={ref}
                className={clsx('w-full', className)}
                {...props}
            >
                {/* Title */}
                {title && (
                    <Typography
                        as="h3"
                        size="lg"
                        weight="bold"
                        color="neutral-950"
                        className="mb-4 text-base sm:text-lg lg:text-xl 2xl:text-2xl"
                    >
                        {title}
                    </Typography>
                )}

                {/* Table Container */}
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                    {/* Table Header */}
                    <div className="bg-[var(--color-primary-900)] text-white">
                        <div className="grid grid-cols-3 gap-2">
                            <div className={clsx(sizeStyles[size].padding, sizeStyles[size].text, 'font-semibold')}>
                                Batch
                            </div>
                            <div className={clsx(sizeStyles[size].padding, sizeStyles[size].text, 'font-semibold text-center')}>
                                Jadwal
                            </div>
                            <div className={clsx(sizeStyles[size].padding, sizeStyles[size].text, 'font-semibold text-right')}>
                                Biaya
                            </div>
                        </div>
                    </div>

                    {/* Table Body */}
                    <div className="bg-white divide-y divide-gray-200">
                        {rows.map((row, index) => (
                            <div 
                                key={index} 
                                className={clsx(
                                    'grid grid-cols-3 gap-2',
                                    'hover:bg-gray-50 transition-colors duration-150'
                                )}
                            >
                                {/* Batch Name */}
                                <div className={clsx(sizeStyles[size].padding, 'flex items-center')}>
                                    <Typography
                                        as="span"
                                        size="sm"
                                        weight="medium"
                                        color="neutral-950"
                                        className={sizeStyles[size].text}
                                    >
                                        {row.batchName}
                                    </Typography>
                                    {row.status === 'full' && (
                                        <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-medium rounded-full">
                                            Penuh
                                        </span>
                                    )}
                                    {row.status === 'coming-soon' && (
                                        <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-600 text-[10px] font-medium rounded-full">
                                            Segera
                                        </span>
                                    )}
                                </div>

                                {/* Schedule */}
                                <div className={clsx(sizeStyles[size].padding, 'flex items-center justify-center')}>
                                    <Typography
                                        as="span"
                                        size="sm"
                                        color="neutral-950"
                                        className={clsx(sizeStyles[size].text, 'text-center')}
                                    >
                                        {row.schedule}
                                    </Typography>
                                </div>

                                {/* Price */}
                                <div className={clsx(sizeStyles[size].padding, 'flex flex-col items-end justify-center')}>
                                    {row.originalPrice && row.originalPrice !== row.finalPrice && (
                                        <Typography
                                            as="span"
                                            size="xs"
                                            color="neutral-600"
                                            className="line-through text-[10px] sm:text-xs"
                                        >
                                            {row.originalPrice}
                                        </Typography>
                                    )}
                                    <Typography
                                        as="span"
                                        size="sm"
                                        weight="bold"
                                        color="neutral-950"
                                        className={clsx(sizeStyles[size].text, 'text-[var(--color-primary-900)]')}
                                    >
                                        {row.finalPrice}
                                    </Typography>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
)

ScheduleTable.displayName = 'ScheduleTable'
