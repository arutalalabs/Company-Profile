'use client'
import '@/styles/global.css'
import { clsx } from 'clsx'
import { forwardRef, useState } from 'react'

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string
    alt: string
    size?: 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
    shape?: 'square' | 'rounded' | 'circle' | 'none'
    aspectRatio?:
        | 'square'
        | 'video'
        | 'portrait'
        | 'landscape'
        | 'wide'
        | 'auto'
    fit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
    fullWidth?: boolean
    placeholder?: string
    fallback?: React.ReactNode
    loading?: 'lazy' | 'eager'
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(
    (
        {
            src,
            alt,
            size = 'base',
            shape = 'square',
            aspectRatio = 'auto',
            fit = 'cover',
            fullWidth = false,
            placeholder,
            fallback,
            loading = 'lazy',
            className,
            onError,
            ...props
        },
        ref
    ) => {
        const [hasError, setHasError] = useState(false)
        const [isLoading, setIsLoading] = useState(true)

        const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
            console.error('Image failed to load:', src, e)
            setHasError(true)
            setIsLoading(false)
            onError?.(e)
        }

        const handleLoad = () => {
            console.log('Image loaded successfully:', src)
            setIsLoading(false)
        }

        const sizeStyles = {
            xs: 'w-10 h-10', // 32px
            sm: 'w-12 h-12', // 48px
            base: 'w-16 h-16', // 64px
            md: 'w-20 h-20', // 80px
            lg: 'w-24 h-24', // 96px
            xl: 'w-32 h-32', // 128px
            '2xl': 'w-40 h-40', // 160px
            '3xl': 'w-48 h-48' // 192px
        }

        const shapeStyles = {
            none: '',
            square: 'rounded-none',
            rounded: '',
            circle: 'rounded-full'
        }

        const aspectRatioStyles = {
            auto: '',
            square: 'aspect-square', // 1:1
            video: 'aspect-video', // 16:9
            portrait: 'aspect-[3/4]', // 3:4
            landscape: 'aspect-[4/3]', // 4:3
            wide: 'aspect-[21/9]' // 21:9
        }

        const fitStyles = {
            cover: 'object-cover',
            contain: 'object-contain',
            fill: 'object-fill',
            none: 'object-none',
            'scale-down': 'object-scale-down'
        }

        const containerStyles = clsx(
            'relative overflow-hidden',
            fullWidth ? 'w-full' : sizeStyles[size],
            aspectRatioStyles[aspectRatio],
            shapeStyles[shape]
        )

        if (hasError && fallback) {
            return <>{fallback}</>
        }

        if (hasError) {
            return (
                <div
                    className={clsx(
                        'flex items-center justify-center bg-[var(--color-neutral-100)] text-[var(--color-neutral-500)] rounded-3xl',
                        containerStyles,
                        className
                    )}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                </div>
            )
        }

        return (
            <div className={clsx(containerStyles, className)}>
                {isLoading && placeholder && (
                    <div
                        className={clsx(
                            'absolute inset-0 flex items-center justify-center bg-[var(--color-neutral-100)]',
                            'animate-pulse'
                        )}
                    >
                        <span className="text-[var(--color-neutral-500)] text-sm">
                            {placeholder}
                        </span>
                    </div>
                )}

                <img
                    ref={ref}
                    src={src}
                    alt={alt}
                    loading={loading}
                    onError={handleError}
                    onLoad={handleLoad}
                    className={clsx(
                        'w-full h-full transition-opacity duration-200',
                        fitStyles[fit],
                        isLoading && !hasError ? '' : 'opacity-100'
                    )}
                    {...props}
                />
            </div>
        )
    }
)

Image.displayName = 'Image'
