import '@/styles/global.css'
import { clsx } from 'clsx'
import { forwardRef } from 'react'

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
    children: React.ReactNode
    size?: 'sm' | 'md' | 'lg'
    variant?: 'solid' | 'outline'
    color?:
        | 'primary-900'
        | 'accent-600'
        | 'neutral-50'
        | 'neutral-950'
        | 'red-base'
        | 'green-base'
        | 'gray-base'
        | 'yellow-base'
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    closable?: boolean
    onClose?: () => void
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
    (
        {
            children,
            size = 'md',
            variant = 'solid',
            color = 'primary-900',
            leftIcon,
            rightIcon,
            closable = false,
            onClose,
            className,
            ...props
        },
        ref
    ) => {
        // Base styles that apply to all tags
        const baseStyles = [
            'inline-flex items-center justify-center',
            'font-medium transition-all duration-200',
            'select-none',
            'leading-none',
            'whitespace-nowrap'
        ]
            .filter(Boolean)
            .join(' ')

        // Color styles for different themes
        const colorStyles = {
            'primary-900': {
                solid: 'bg-[var(--color-primary-900)] text-[var(--color-neutral-50)]',
                outline:
                    'border bg-transparent text-[var(--color-primary-900)] border-[var(--color-primary-900)]'
            },
            'accent-600': {
                solid: 'bg-[var(--color-accent-600)] text-[var(--color-neutral-950)]',
                outline:
                    'border bg-transparent text-[var(--color-accent-600)] border-[var(--color-accent-600)]'
            },
            'neutral-50': {
                solid: 'bg-[var(--color-neutral-50)] text-[var(--color-neutral-900)]',
                outline:
                    'border bg-transparent text-[var(--color-neutral-50)] border-[var(--color-neutral-50)]'
            },
            'neutral-950': {
                solid: 'bg-[var(--color-neutral-950)] text-[var(--color-neutral-50)]',
                outline:
                    'border bg-transparent text-[var(--color-neutral-950)] border-[var(--color-neutral-950)]'
            },
            'red-base': {
                solid: 'bg-[var(--color-red-base)] text-[var(--color-neutral-50)]',
                outline:
                    'border bg-transparent text-[var(--color-red-base)] border-[var(--color-red-base)]'
            },
            'green-base': {
                solid: 'bg-[var(--color-green-base)] text-[var(--color-neutral-50)]',
                outline:
                    'border bg-transparent text-[var(--color-green-base)] border-[var(--color-green-base)]'
            },
            'gray-base': {
                solid: 'bg-[var(--color-gray-base)] text-[var(--color-neutral-50)]',
                outline:
                    'border bg-transparent text-[var(--color-gray-base)] border-[var(--color-gray-base)]'
            },
            'yellow-base': {
                solid: 'bg-[var(--color-yellow-base)] text-[var(--color-neutral-950)]',
                outline:
                    'border bg-transparent text-[var(--color-yellow-base)] border-[var(--color-yellow-base)]'
            }
        }

        // Size styles for responsive design
        const sizeStyles = {
            sm: 'px-4 py-1.5 text-xs min-h-[1rem] rounded-lg gap-1.5 2xl:min-h-[2rem] 2xl:text-sm',
            md: 'px-2 py-1.5 text-xs rounded-sm sm:text-sm sm:px-4 sm:py-2 sm:rounded-md 2xl:px-6 2xl:py-2.5 2xl:text-base 2xl:rounded-lg',
            lg: 'px-6 py-2 text-base min-h-[2.5rem] rounded-xl gap-2'
        }

        // Get the appropriate style combination
        const getTagStyles = () => {
            const colorStyle =
                colorStyles[color][variant] || colorStyles['gray-base'][variant]
            return clsx(baseStyles, colorStyle, sizeStyles[size], className)
        }

        // Close button component
        const CloseButton = () => (
            <button
                type="button"
                onClick={onClose}
                className={clsx(
                    'ml-1 inline-flex items-center justify-center rounded-full hover:bg-black/10 transition-colors',
                    size === 'sm'
                        ? 'w-3 h-3'
                        : size === 'md'
                          ? 'w-4 h-4'
                          : 'w-5 h-5'
                )}
                aria-label="Remove tag"
            >
                <svg
                    className={clsx(
                        'fill-current',
                        size === 'sm'
                            ? 'w-2 h-2'
                            : size === 'md'
                              ? 'w-3 h-3'
                              : 'w-4 h-4'
                    )}
                    viewBox="0 0 20 20"
                >
                    <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                </svg>
            </button>
        )

        return (
            <span ref={ref} className={getTagStyles()} {...props}>
                {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}

                {children && <span className="truncate">{children}</span>}

                {/* Show right icon only if not closable */}
                {rightIcon && !closable && (
                    <span className="flex-shrink-0">{rightIcon}</span>
                )}

                {closable && <CloseButton />}
            </span>
        )
    }
)

Tag.displayName = 'Tag'
