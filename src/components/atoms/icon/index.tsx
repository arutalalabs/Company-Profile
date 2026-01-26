import '@/styles/global.css'
import { clsx } from 'clsx'
import React, { forwardRef } from 'react'

export interface IconProps extends React.HTMLAttributes<HTMLElement> {
    icon: string | React.ReactNode
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
    color?:
        | 'current'
        | 'neutral-400'
        | 'neutral-600'
        | 'neutral-900'
        | 'primary-600'
        | 'accent-600'
        | 'red-base'
        | 'green-base'
        | 'blue-base'
    type?: 'svg' | 'font' | 'image'
    hover?: 'none' | 'scale' | 'rotate' | 'bounce'
    interactive?: boolean
    alt?: string
    src?: string
}

export const Icon = forwardRef<HTMLElement, IconProps>(
    (
        {
            icon,
            size = 'md',
            color = 'current',
            type = 'svg',
            hover = 'none',
            interactive = false,
            alt,
            src,
            className,
            ...props
        },
        ref
    ) => {
        const sizeStyles = {
            xs: 'w-3 h-3', // 12px
            sm: 'w-4 h-4', // 16px
            md: 'w-6 h-6', // 24px
            lg: 'w-8 h-8', // 32px
            xl: 'w-10 h-10', // 40px
            '2xl': 'w-12 h-12' // 48px
        }

        const colorStyles = {
            current: 'text-current',
            'neutral-400': 'text-[var(--color-neutral-400)]',
            'neutral-600': 'text-[var(--color-neutral-600)]',
            'neutral-900': 'text-[var(--color-neutral-900)]',
            'primary-600': 'text-[var(--color-primary-600)]',
            'accent-600': 'text-[var(--color-accent-600)]',
            'red-base': 'text-[var(--color-red-base)]',
            'green-base': 'text-[var(--color-green-base)]',
            'blue-base': 'text-[var(--color-blue-base)]'
        }

        const hoverStyles = {
            none: '',
            scale: 'hover:scale-110 transition-transform duration-200',
            rotate: 'hover:rotate-12 transition-transform duration-200',
            bounce: 'hover:animate-bounce'
        }

        const interactiveStyles = interactive
            ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[var(--color-primary-500)] rounded-sm'
            : ''

        const baseStyles = clsx(
            'inline-flex items-center justify-center shrink-0',
            sizeStyles[size],
            colorStyles[color],
            hoverStyles[hover],
            interactiveStyles,
            className
        )
        if (type === 'image' && src) {
            return (
                <img
                    ref={ref as React.Ref<HTMLImageElement>}
                    src={src}
                    alt={alt || ''}
                    className={baseStyles}
                    {...props}
                />
            )
        }

        if (type === 'font' && typeof icon === 'string') {
            return (
                <i
                    ref={ref as React.Ref<HTMLElement>}
                    className={clsx(`icon-${icon}`, baseStyles)}
                    aria-label={alt}
                    role={alt ? 'img' : undefined}
                    {...props}
                />
            )
        }

        if (React.isValidElement(icon)) {
            const svgProps = {
                ...props,
                className: baseStyles,
                fill: 'currentColor',
                viewBox: '0 0 24 24',
                'aria-label': alt,
                role: alt ? 'img' : undefined
            } as React.SVGProps<SVGSVGElement>

            return (
                <svg ref={ref as React.Ref<SVGSVGElement>} {...svgProps}>
                    {icon}
                </svg>
            )
        }

        if (typeof icon === 'string') {
            // Check if the path contains stroke commands (M, L, etc.)
            const hasStroke = /[ML]/.test(icon)

            const svgProps = {
                ...props,
                className: baseStyles,
                fill: hasStroke ? 'none' : 'currentColor',
                stroke: hasStroke ? 'currentColor' : 'none',
                strokeWidth: hasStroke ? 2 : 0,
                strokeLinecap: 'round' as const,
                strokeLinejoin: 'round' as const,
                viewBox: '0 0 24 24',
                'aria-label': alt,
                role: alt ? 'img' : undefined
            } as React.SVGProps<SVGSVGElement>

            return (
                <svg ref={ref as React.Ref<SVGSVGElement>} {...svgProps}>
                    <path d={icon} />
                </svg>
            )
        }

        return null
    }
)
