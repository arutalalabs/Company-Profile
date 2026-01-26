'use client'
import '@/styles/global.css'
import { Image } from '../../atoms/image'
import { Typography } from '../../atoms/typography'
import { Button } from '../../atoms/button'
import { clsx } from 'clsx'
import { forwardRef } from 'react'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: 'sm' | 'md' | 'lg'
    image?: {
        src: string
        alt: string
    }
    title: string
    description: string
    buttonText?: string
    onButtonClick?: () => void
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
    (
        {
            size = 'md',
            image,
            title,
            description,
            buttonText = 'Selengkapnya',
            onButtonClick,
            className,
            ...props
        },
        ref
    ) => {
        // Responsive size variants
        const sizeStyles = {
            sm: 'w-full sm:max-w-[280px] lg:max-w-[300px] min-h-[320px] sm:min-h-[340px] lg:min-h-[350px]',
            md: 'w-full sm:max-w-[320px] lg:max-w-[340px] min-h-[360px] sm:min-h-[380px] lg:min-h-[400px]',
            lg: 'w-full sm:max-w-[360px] lg:max-w-[403px] min-h-[400px] sm:min-h-[425px] lg:min-h-[450px]'
        }

        // Base card styles
        const baseStyles = [
            'bg-white',
            'rounded-xl sm:rounded-2xl',
            'shadow-sm',
            'border border-[var(--color-primary-600)]',
            'overflow-hidden',
            'transition-all duration-300',
            'hover:shadow-lg',
            'hover:border-[var(--color-primary-800)]',
            'hover:-translate-y-1',
            'flex flex-col'
        ].join(' ')

        return (
            <div
                ref={ref}
                className={clsx(baseStyles, sizeStyles[size], className)}
                {...props}
            >
                {/* Image Section - Responsive height */}
                {image && (
                    <div className="flex justify-center items-center pt-8 sm:pt-8 lg:pt-0 h-[160px] sm:h-[180px] lg:h-[200px] w-full overflow-hidden">
                        <Image
                            src={image.src}
                            alt={image.alt}
                            size="lg"
                            shape="square"
                            fit="cover"
                            className="w-24 lg:w-32 h-24 lg:h-32"
                        />
                    </div>
                )}

                {/* Content Section - Responsive padding */}
                <div className="flex flex-col flex-1 px-10 space-y-6 pt-4 sm:px-10 sm:pt-4 sm:pb-5 sm:space-y-4 lg:px-10 lg:pb-6 lg:pt-0 ">
                    {/* Title - Responsive typography */}
                    <Typography
                        as="h3"
                        size="lg"
                        weight="semibold"
                        color="neutral-950"
                        align="center"
                        className="text-lg sm:text-lg lg:text-xl"
                    >
                        {title}
                    </Typography>

                    {/* Description - Responsive typography */}
                    <Typography
                        as="p"
                        size="sm"
                        weight="normal"
                        color="neutral-950"
                        align="center"
                        leading="normal"
                        className="mb-8 sm:mb-10 sm:text-sm lg:mb-8 lg:flex-1 lg:text-base"
                    >
                        {description}
                    </Typography>

                    {/* Action Button - Responsive sizing */}
                    {onButtonClick && (
                        <div className="flex justify-center lg:mb-6">
                            <Button
                                size="md"
                                shape="outline"
                                color="accent-600"
                                onClick={onButtonClick}
                                className="text-black text-sm sm:text-base w-auto"
                            >
                                {buttonText}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        )
    }
)

Card.displayName = 'Card'
