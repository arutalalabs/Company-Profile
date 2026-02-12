import React from 'react'
import { clsx } from 'clsx'
import '@/styles/global.css'

/**
 * Typography component props interface
 * Clean architecture with separate concerns for size, weight, color, and spacing
 */
export interface TypographyProps {
    /** Text content */
    children: React.ReactNode
    /** Typography size scale */
    size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
    /** Font weight */
    weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'
    /** Text color theme */
    color?:
    | 'neutral-950'
    | 'neutral-600'
    | 'neutral-50'
    | 'primary-600'
    | 'primary-900'
    | 'accent-600'
    | 'red-base'
    | 'green-base'
    /** Line height for better readability */
    leading?: 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose'
    /** Letter spacing */
    tracking?: 'tighter' | 'tight' | 'normal' | 'wide' | 'wider'
    /** Text alignment */
    align?: 'left' | 'center' | 'right' | 'justify'
    /** HTML element to render as */
    as?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'span'
    | 'div'
    | 'label'
    /** Additional CSS classes */
    className?: string
}

/**
 * Typography component with flexible styling options
 *
 * @example
 * ```tsx
 * <Typography size="2xl" weight="bold" color="primary-600">
 *   Main Heading
 * </Typography>
 *
 * <Typography size="base" weight="normal" color="neutral-600" leading="relaxed">
 *   Body text content
 * </Typography>
 * ```
 */
export function Typography({
    children,
    size = 'base',
    weight = 'normal',
    color = 'neutral-950',
    leading = 'normal',
    tracking = 'normal',
    align = 'left',
    as = 'p',
    className
}: TypographyProps) {
    // Base typography styles
    const baseStyles = 'font-sans'

    // Size styles for responsive typography
    const sizeStyles = {
        xs: 'text-xs', // 12px
        sm: 'text-sm', // 14px
        base: 'text-base', // 16px
        lg: 'text-lg', // 18px
        xl: 'text-xl', // 20px
        '2xl': 'text-2xl', // 24px
        '3xl': 'text-3xl', // 30px
        '4xl': 'text-4xl', // 36px
        '5xl': 'text-5xl' // 48px
    }

    // Font weight styles
    const weightStyles = {
        light: 'font-light', // 300
        normal: 'font-normal', // 400
        medium: 'font-medium', // 500
        semibold: 'font-semibold', // 600
        bold: 'font-bold', // 700
        extrabold: 'font-extrabold' // 800
    }

    // Color styles using CSS variables
    const colorStyles = {
        'neutral-950': 'text-[var(--color-neutral-950)]',
        'neutral-600': 'text-[var(--color-neutral-600)]',
        'neutral-50': 'text-[var(--color-neutral-50)]',
        'primary-600': 'text-[var(--color-primary-600)]',
        'primary-900': 'text-[var(--color-primary-900)]',
        'accent-600': 'text-[var(--color-accent-600)]',
        'red-base': 'text-[var(--color-red-base)]',
        'green-base': 'text-[var(--color-green-base)]'
    }

    // Line height styles
    const leadingStyles = {
        tight: 'leading-tight', // 1.25
        snug: 'leading-snug', // 1.375
        normal: 'leading-normal', // 1.5
        relaxed: 'leading-relaxed', // 1.625
        loose: 'leading-loose' // 2
    }

    // Letter spacing styles
    const trackingStyles = {
        tighter: 'tracking-tighter',
        tight: 'tracking-tight',
        normal: 'tracking-normal',
        wide: 'tracking-wide',
        wider: 'tracking-wider'
    }

    // Text alignment styles
    const alignStyles = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify'
    }

    // Combine all style classes
    const getTypographyStyles = () => {
        return clsx(
            baseStyles,
            sizeStyles[size],
            weightStyles[weight],
            colorStyles[color],
            leadingStyles[leading],
            trackingStyles[tracking],
            alignStyles[align],
            className
        )
    }

    return React.createElement(
        as,
        {
            className: getTypographyStyles()
        },
        children
    )
}

Typography.displayName = 'Typography'
