'use client'
import '@/styles/global.css'
import { clsx } from 'clsx'
import { forwardRef, useState } from 'react'
import { Typography } from '@/components'

export interface AccordionItemProps {
    /** Unique identifier for the accordion item */
    id: string
    /** Title displayed in the header */
    title: string
    /** Content displayed when expanded */
    content: React.ReactNode
    /** Whether the item is initially expanded */
    defaultExpanded?: boolean
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Array of accordion items */
    items: AccordionItemProps[]
    /** Whether multiple items can be expanded at once */
    allowMultiple?: boolean
    /** Variant style */
    variant?: 'default' | 'bordered' | 'separated'
    /** Size variant */
    size?: 'sm' | 'md' | 'lg'
}

/**
 * AccordionItem - Individual accordion panel
 */
const AccordionItem = forwardRef<HTMLDivElement, {
    item: AccordionItemProps
    isExpanded: boolean
    onToggle: () => void
    variant: 'default' | 'bordered' | 'separated'
    size: 'sm' | 'md' | 'lg'
}>(({ item, isExpanded, onToggle, variant, size }, ref) => {
    const sizeStyles = {
        sm: 'py-2 px-3',
        md: 'py-3 px-4',
        lg: 'py-4 px-5'
    }

    const contentSizeStyles = {
        sm: 'py-2 px-3',
        md: 'py-3 px-4',
        lg: 'py-4 px-5'
    }

    const variantStyles = {
        default: 'border-b border-gray-200',
        bordered: 'border border-gray-200 rounded-lg mb-2',
        separated: 'bg-gray-50 rounded-lg mb-3'
    }

    return (
        <div 
            ref={ref}
            className={clsx(
                'w-full',
                variantStyles[variant]
            )}
        >
            {/* Header */}
            <button
                onClick={onToggle}
                className={clsx(
                    'w-full flex items-center justify-between text-left',
                    'transition-colors duration-200',
                    'hover:bg-gray-50',
                    'focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-600)] focus:ring-inset',
                    sizeStyles[size],
                    variant === 'bordered' && 'rounded-lg',
                    variant === 'separated' && 'rounded-lg'
                )}
                aria-expanded={isExpanded}
                aria-controls={`accordion-content-${item.id}`}
            >
                <Typography
                    as="span"
                    size={size === 'lg' ? 'base' : 'sm'}
                    weight="medium"
                    color="neutral-950"
                    className="flex-1 pr-4"
                >
                    {item.title}
                </Typography>
                
                {/* Chevron Icon */}
                <svg
                    className={clsx(
                        'w-5 h-5 text-gray-500 transition-transform duration-200',
                        isExpanded && 'rotate-180'
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            {/* Content */}
            <div
                id={`accordion-content-${item.id}`}
                className={clsx(
                    'overflow-hidden transition-all duration-300 ease-in-out',
                    isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                )}
            >
                <div className={clsx(
                    contentSizeStyles[size],
                    'text-gray-600'
                )}>
                    {item.content}
                </div>
            </div>
        </div>
    )
})

AccordionItem.displayName = 'AccordionItem'

/**
 * Accordion Component
 * 
 * A collapsible content component following atomic design principles.
 * Used for FAQ sections, expandable lists, and progressive disclosure.
 * 
 * @example
 * ```tsx
 * <Accordion
 *   items={[
 *     { id: '1', title: 'Question 1', content: 'Answer 1' },
 *     { id: '2', title: 'Question 2', content: 'Answer 2' },
 *   ]}
 *   variant="bordered"
 * />
 * ```
 */
export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
    ({ items, allowMultiple = false, variant = 'default', size = 'md', className, ...props }, ref) => {
        const [expandedItems, setExpandedItems] = useState<Set<string>>(() => {
            const defaultExpanded = new Set<string>()
            items.forEach(item => {
                if (item.defaultExpanded) {
                    defaultExpanded.add(item.id)
                }
            })
            return defaultExpanded
        })

        const handleToggle = (id: string) => {
            setExpandedItems(prev => {
                const newSet = new Set(prev)
                
                if (newSet.has(id)) {
                    newSet.delete(id)
                } else {
                    if (!allowMultiple) {
                        newSet.clear()
                    }
                    newSet.add(id)
                }
                
                return newSet
            })
        }

        return (
            <div
                ref={ref}
                className={clsx('w-full', className)}
                {...props}
            >
                {items.map(item => (
                    <AccordionItem
                        key={item.id}
                        item={item}
                        isExpanded={expandedItems.has(item.id)}
                        onToggle={() => handleToggle(item.id)}
                        variant={variant}
                        size={size}
                    />
                ))}
            </div>
        )
    }
)

Accordion.displayName = 'Accordion'
