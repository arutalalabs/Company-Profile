import '@/styles/global.css'
import { clsx } from 'clsx'
import { forwardRef } from 'react'
export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    size?: 'xs' | 'sm' | 'md' | 'lg'
    shape?: 'solid' | 'outline' | 'link'
    color?:
        | 'primary-900'
        | 'accent-600'
        | 'neutral-50'
        | 'neutral-950'
        | 'red-base'
        | 'green-base'
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    fullWidth?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            size = 'md',
            shape = 'solid',
            color = 'primary-900',
            leftIcon,
            rightIcon,
            className,
            disabled,
            type = 'button',
            fullWidth = false,
            ...props
        },
        ref
    ) => {
        // Base styles that apply to all buttons
        const baseStyles = [
            'inline-flex items-center justify-center',
            'transition-all duration-200',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
            'select-none',
            'leading-none', // Prevent text jumping
            fullWidth && 'w-full'
        ]
            .filter(Boolean)
            .join(' ')

        // Color styles for different themes
        const colorStyles = {
            'primary-900': {
                solid: 'font-bold bg-[var(--color-primary-900)] text-[var(--color-neutral-50)] hover:bg-[var(--color-primary-800)] focus:outline-2 focus:outline-offset-2 focus:outline-[var(--color-primary-900)] cursor-pointer',
                outline:
                    'border bg-transparent text-[var(--color-primary-900)] border-[var(--color-primary-900)] hover:bg-[var(--color-primary-900)] hover:text-[var(--color-primary-100)] focus:outline-2 focus:outline-offset-2 focus:outline-[var(--color-primary-900)] cursor-pointer',
                link: 'bg-transparent text-[var(--color-primary-900)] border-transparent hover:text-[var(--color-primary-800)] hover:underline active:underline-[var(--color-primary-900)] active:decoration-[var(--color-primary-900)] focus:underline focus:decoration-[var(--color-primary-900)] cursor-pointer'
            },
            'accent-600': {
                solid: 'font-medium bg-[var(--color-accent-600)] text-[var(--color-neutral-950)] hover:bg-[var(--color-accent-700)] focus:outline-2 focus:outline-offset-2 focus:outline-[var(--color-accent-600)] cursor-pointer',
                outline:
                    'font-medium border-2 bg-transparent text-[var(--color-neutral-50)] border-[var(--color-accent-600)] hover:bg-[var(--color-accent-700)] hover:text-[var(--color-neutral-950)] focus:outline-2 focus:outline-offset-2 focus:outline-[var(--color-accent-600)] cursor-pointer',
                link: 'bg-transparent text-[var(--color-accent-600)] border-transparent hover:text-[var(--color-accent-700)] hover:underline active:underline-[var(--color-accent-600)] active:decoration-[var(--color-accent-600)] focus:underline focus:decoration-[var(--color-accent-600)] cursor-pointer'
            },
            'neutral-50': {
                solid: 'font-medium cursor-pointer',
                outline:
                    'border bg-transparent text-[var(--color-neutral-50)] border-[var(--color-neutral-50)] hover:bg-[var(--color-neutral-50)] hover:text-[var(--color-neutral-900)] focus:outline-2 focus:outline-offset-2 focus:outline-[var(--color-accent-600)] cursor-pointer',
                link: 'font-light bg-transparent text-[var(--color-neutral-50)] border-transparent hover:text-[var(--color-neutral-200)] hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-[var(--color-accent-600)] cursor-pointer'
            },
            'neutral-950': {
                solid: 'bg-[var(--color-neutral-950)] text-[var(--color-neutral-50)] border-[var(--color-neutral-950)] hover:bg-[var(--color-neutral-800)] focus:ring-[var(--color-neutral-500)]',
                outline:
                    'border bg-transparent text-[var(--color-neutral-950)] border-[var(--color-neutral-950)] hover:bg-[var(--color-neutral-50)] focus:ring-[var(--color-neutral-500)]',
                link: 'bg-transparent text-[var(--color-neutral-950)] border-transparent hover:text-[var(--color-neutral-700)] hover:underline focus:ring-[var(--color-neutral-500)] cursor-pointer'
            },
            'red-base': {
                solid: 'bg-[var(--color-red-base)] text-[var(--color-neutral-50)] border-[var(--color-red-base)] hover:bg-[var(--color-red-hover)] focus:ring-red-300',
                outline:
                    'border bg-transparent text-[var(--color-red-base)] border-[var(--color-red-base)] hover:bg-red-50 focus:ring-red-300',
                link: 'bg-transparent text-[var(--color-red-base)] border-transparent hover:text-[var(--color-red-hover)] hover:underline focus:ring-red-300'
            },
            'green-base': {
                solid: 'bg-[var(--color-green-base)] text-[var(--color-neutral-50)] border-[var(--color-green-base)] hover:bg-green-600 focus:ring-green-300',
                outline:
                    'border bg-transparent text-[var(--color-green-base)] border-[var(--color-green-base)] hover:bg-green-50 focus:ring-green-300',
                link: 'bg-transparent text-[var(--color-green-base)] border-transparent hover:text-green-600 hover:underline focus:ring-green-300'
            }
        }

        // Size styles for responsive design
        const sizeStyles = {
            xs:
                shape === 'link'
                    ? ''
                    : 'text-xs px-1 py-1 rounded-[16px]',
            sm:
                shape === 'link'
                    ? ''
                    : 'text-xs px-3 py-2 rounded-[20px]',
            md:
                shape === 'link'
                    ? 'text-md '
                    : 'px-7 py-3 text-sm min-h-[2.5rem] gap-3 rounded-[20px]',
            lg:
                shape === 'link'
                    ? 'text-lg'
                    : 'px-8 py-4 text-lg min-h-[3rem] gap-4 rounded-[30px]'
        }

        // Shape-specific styles
        const shapeStyles = {
            solid: 'active:scale-[0.98]',
            outline: 'active:scale-[0.98]',
            link: 'p-0 h-auto min-h-0 focus:ring-offset-0'
        }

        // Get the appropriate style combination
        const getButtonStyles = () => {
            const colorStyle =
                colorStyles[color][shape] || colorStyles['primary-900'][shape]
            return clsx(
                baseStyles,
                colorStyle,
                sizeStyles[size],
                shapeStyles[shape],
                className
            )
        }

        return (
            <button
                ref={ref}
                type={type}
                disabled={disabled}
                className={getButtonStyles()}
                aria-disabled={disabled}
                {...props}
            >
                {leftIcon && <span className="shrink-0">{leftIcon}</span>}

                {children && (
                    <span
                        className={
                            shape === 'link' ? 'inline' : 'flex-1 text-center'
                        }
                    >
                        {children}
                    </span>
                )}

                {rightIcon && <span className="shrink-0">{rightIcon}</span>}
            </button>
        )
    }
)

Button.displayName = 'Button'
