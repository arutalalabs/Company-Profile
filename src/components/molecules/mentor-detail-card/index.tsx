'use client'
import '@/styles/global.css'
import { clsx } from 'clsx'
import { forwardRef } from 'react'
import { Typography, Image } from '@/components'

export interface MentorDetailCardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Mentor's name */
    name: string
    /** Mentor's job title */
    jobTitle: string
    /** Mentor's company name */
    companyName?: string
    /** Profile image URL */
    profileUrl?: string
    /** Role in the course (e.g., "Master of Ceremony", "Instructor") */
    role?: string
    /** Size variant */
    size?: 'sm' | 'md' | 'lg'
    /** Layout variant */
    variant?: 'horizontal' | 'vertical'
}

/**
 * MentorDetailCard Component
 * 
 * Displays mentor information in a card format.
 * Used in course detail pages to show instructor information.
 * 
 * @example
 * ```tsx
 * <MentorDetailCard
 *   name="Asri Maspupah"
 *   jobTitle="Senior Developer"
 *   companyName="Arutala Tech"
 *   role="Master of Ceremony"
 *   profileUrl="/mentor.jpg"
 * />
 * ```
 */
export const MentorDetailCard = forwardRef<HTMLDivElement, MentorDetailCardProps>(
    ({ 
        name, 
        jobTitle, 
        companyName, 
        profileUrl, 
        role = 'Mentor',
        size = 'md', 
        variant = 'horizontal',
        className, 
        ...props 
    }, ref) => {
        const sizeStyles = {
            sm: {
                container: 'p-3',
                image: 'w-12 h-12',
                name: 'text-sm',
                title: 'text-xs',
                role: 'text-[10px]'
            },
            md: {
                container: 'p-4',
                image: 'w-16 h-16',
                name: 'text-sm 2xl:text-base',
                title: 'text-xs 2xl:text-sm',
                role: 'text-xs'
            },
            lg: {
                container: 'p-5',
                image: 'w-20 h-20',
                name: 'text-lg',
                title: 'text-base',
                role: 'text-sm'
            }
        }

        const isHorizontal = variant === 'horizontal'

        return (
            
            <div
                ref={ref}
                className={clsx(
                    'bg-white rounded-xl overflow-hidden border-2 border-[var(--color-primary-900)]',
                    sizeStyles[size].container,
                    isHorizontal ? 'flex items-center gap-4' : 'flex flex-col items-center text-center gap-3',
                    className
                )}
                {...props}
            >
                {/* Profile Image */}
                <div className="rounded-full flex-shrink-0 border-2 border-[var(--color-primary-900)] p-1">
                <div className={clsx(
                    sizeStyles[size].image,
                    'rounded-full overflow-hidden bg-gray-200'
                )}>
                    {profileUrl ? (
                        <img 
                            src={profileUrl} 
                            alt={name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                            <svg className="w-1/2 h-1/2 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                        </div>
                    )}
                </div>
                </div>

                {/* Mentor Info */}
                <div className={clsx(
                    'flex flex-col',
                    isHorizontal ? 'items-start' : 'items-center'
                )}>

                    {/* Name */}
                    <Typography
                        as="p"
                        weight="bold"
                        color="neutral-950"
                        className={sizeStyles[size].name}
                    >
                        {name}
                    </Typography>

                    {/* Job Title & Company */}
                    {(jobTitle || companyName) && (
                        <Typography
                            as="p"
                            color="neutral-600"
                            className={clsx(sizeStyles[size].title, 'mt-1')}
                        >
                            {jobTitle}{companyName && ` at ${companyName}`}
                        </Typography>
                    )}
                </div>
            </div>
        )
    }
)

MentorDetailCard.displayName = 'MentorDetailCard'
