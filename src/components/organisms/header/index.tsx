'use client'
import '@/styles/global.css'
import { Button } from '../../atoms/button'
import { Image } from '../../atoms/image'
import { clsx } from 'clsx'
import { forwardRef, useState } from 'react'
import { usePathname } from 'next/navigation'

export interface MenuItem {
    label: string
    href: string
    isActive?: boolean
    children?: MenuItem[]
}

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
    logo: {
        src: string
        alt: string
        href?: string
    }
    menuItems: MenuItem[]
    contactButton?: {
        label: string
        href?: string
    }
    mobileMenuOpen?: boolean
    onMobileMenuToggle?: () => void
}

export const Header = forwardRef<HTMLElement, HeaderProps>(
    (
        {
            logo,
            menuItems,
            contactButton,
            mobileMenuOpen = false,
            onMobileMenuToggle,
            className,
            ...props
        },
        ref
    ) => {
        const [internalMobileMenu, setInternalMobileMenu] = useState(false)
        const pathname = usePathname()

        const isMobileMenuOpen = mobileMenuOpen || internalMobileMenu
        const handleMobileMenuToggle =
            onMobileMenuToggle ||
            (() => setInternalMobileMenu(!internalMobileMenu))

        // Function to check if menu item is active
        const isMenuActive = (item: MenuItem) => {
            if (item.isActive !== undefined) return item.isActive
            return pathname === item.href
        }

        return (
            <header
                ref={ref}
                className={clsx(
                    'w-full bg-[var(--color-primary-900)] shadow-md border-b border-[var(--color-primary-900)] sticky top-0 z-50',
                    className
                )}
                {...props}
            >
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="">
                            {logo.href ? (
                                <a href={logo.href} className="">
                                    <Image
                                        src={logo.src}
                                        alt={logo.alt}
                                        size="xs"
                                        shape="square"
                                        fit="cover"
                                        className="cursor-pointer transition-all duration-300 hover:scale-90 2xl:w-12 2xl:h-12"
                                    />
                                </a>
                            ) : (
                                <Image
                                    src={logo.src}
                                    alt={logo.alt}
                                    size="xs"
                                    shape="square"
                                    fit="cover"
                                    className="transition-all duration-300 hover:scale-100 2xl:w-12 2xl:h-12"
                                />
                            )}
                        </div>

                        {/* Desktop Navigation */}
                        <nav
                            className="hidden sm:flex items-center lg:flex items-center "
                            style={{ gap: '1px' }}
                        >
                            {menuItems.map((item, index) => (
                                <Button
                                    key={index}
                                    size="sm"
                                    shape="solid"
                                    color="neutral-50"
                                    className={clsx(
                                        'transition-colors duration-200 sm:text-xs sm:px-4 py-3 sm:min-h-[1rem] sm:rounded-[20px] 2xl:text-sm 2xl:px-6 py-3 2xl:min-h-[2.5rem] 2xl:gap-3 2xl:rounded-[20px]',
                                        isMenuActive(item)
                                            ? 'text-[var(--color-neutral-50)] font-medium underline underline-offset-6 decoration-2 decoration-[var(--color-accent-600)]'
                                            : 'text-[var(--color-neutral-50)] hover:bg-[var(--color-accent-600)] hover:text-[var(--color-neutral-950)]' 
                                    )}
                                    onClick={() =>
                                        item.href &&
                                        (window.location.href = item.href)
                                    }
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </nav>

                        {/* Desktop Contact Button */}
                        <div className="hidden md:flex items-center">
                            {contactButton &&
                                (contactButton.href ? (
                                    <a href={contactButton.href}>
                                        <Button
                                            size="sm"
                                            shape="solid"
                                            color="accent-600"
                                            className='sm:text-xs sm:px-4 py-3 sm:min-h-[1rem] sm:rounded-[20px] 2xl:text-sm 2xl:px-6 py-3 2xl:min-h-[2.5rem] 2xl:gap-3 2xl:rounded-[20px]'
                                        >
                                            {contactButton.label}
                                        </Button>
                                    </a>
                                ) : (
                                    <Button
                                        size="sm"
                                        shape="solid"
                                        color="accent-600"
                                        className='sm:text-xs sm:px-4 py-3 sm:min-h-[1rem] sm:rounded-[20px] lg:text-sm lg:px-6 py-3 lg:min-h-[2.5rem] lg:gap-3 lg:rounded-[20px]'
                                    >
                                        {contactButton.label}
                                    </Button>
                                ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <Button
                                shape="link"
                                color="neutral-50"
                                size="sm"
                                onClick={handleMobileMenuToggle}
                                aria-label="Toggle mobile menu"
                                className=""
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    {isMobileMenuOpen ? (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    ) : (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    )}
                                </svg>
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden border-t border-[var(--color-neutral-200)] py-4">
                            <nav className="space-y-2">
                                {menuItems.map((item, index) => (
                                    <Button
                                        key={index}
                                        size="sm"
                                        shape="link"
                                        color="neutral-50"
                                        className={clsx(
                                            'block w-full text-left px-3 py-2 transition-colors duration-200',
                                            isMenuActive(item)
                                                ? 'text-[var(--color-accent-600)] font-medium'
                                                : 'text-[var(--color-neutral-50)] hover:text-[var(--color-accent-600)]'
                                        )}
                                        onClick={() => {
                                            if (item.href)
                                                window.location.href = item.href
                                            setInternalMobileMenu(false)
                                        }}
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </nav>

                            {contactButton && (
                                <div className="pt-4">
                                    {contactButton.href ? (
                                        <a href={contactButton.href}>
                                            <Button
                                                size="sm"
                                                shape="link"
                                                color="neutral-50"
                                                className="w-full"
                                            >
                                                {contactButton.label}
                                            </Button>
                                        </a>
                                    ) : (
                                        <Button
                                            size="sm"
                                            shape="link"
                                            color="neutral-50"
                                            className="w-full"
                                        >
                                            {contactButton.label}
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </header>
        )
    }
)

Header.displayName = 'Header'
