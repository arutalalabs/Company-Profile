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
                            className="hidden lg:flex items-center "
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
                        <div className="hidden lg:flex items-center">
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

                        {/* Mobile Menu Button - Hamburger with Animation */}
                        <div className="lg:hidden flex items-center">
                            <button
                                onClick={handleMobileMenuToggle}
                                className="relative w-8 h-8 flex items-center justify-center text-white focus:outline-none"
                                aria-label="Toggle mobile menu"
                            >
                                <span className={clsx(
                                    "absolute block w-6 h-0.5 bg-current transform transition duration-300 ease-in-out",
                                    isMobileMenuOpen ? "rotate-45" : "-translate-y-1.5"
                                )}></span>
                                <span className={clsx(
                                    "absolute block w-6 h-0.5 bg-current transform transition duration-300 ease-in-out",
                                    isMobileMenuOpen ? "opacity-0" : ""
                                )}></span>
                                <span className={clsx(
                                    "absolute block w-6 h-0.5 bg-current transform transition duration-300 ease-in-out",
                                    isMobileMenuOpen ? "-rotate-45" : "translate-y-1.5"
                                )}></span>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation - Animated Drawer */}
                    <div 
                        className={clsx(
                            "fixed inset-0 z-[100] lg:hidden transition-opacity duration-300",
                            isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                        )}
                    >
                        {/* Backdrop */}
                        <div 
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={handleMobileMenuToggle} 
                        />

                        {/* Drawer Panel */}
                        <div 
                            className={clsx(
                                "absolute top-0 right-0 bottom-0 w-[80%] max-w-sm bg-[var(--color-primary-900)] shadow-2xl flex flex-col transition-transform duration-300 ease-out",
                                isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                            )}
                        >
                            {/* Drawer Header */}
                            <div className="flex items-center justify-between px-6 h-20 border-b border-white/10">
                                <span className="text-white font-bold text-lg">Menu</span>
                                <button 
                                    onClick={handleMobileMenuToggle}
                                    className="p-2 text-white/70 hover:text-white transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Menu Items */}
                            <div className="flex-1 overflow-y-auto py-6 px-4">
                                <nav className="space-y-1">
                                    {menuItems.map((item, index) => (
                                        <div key={index}>
                                            <Button
                                                size="lg"
                                                shape="link"
                                                color="neutral-50"
                                                className={clsx(
                                                    'w-full justify-start px-4 py-3 text-base rounded-xl transition-all duration-200',
                                                    isMenuActive(item)
                                                        ? 'bg-white/10 text-[var(--color-accent-600)] font-semibold'
                                                        : 'text-gray-100 hover:bg-white/5 hover:text-white hover:translate-x-1'
                                                )}
                                                onClick={() => {
                                                    if (item.href)
                                                        window.location.href = item.href
                                                    setInternalMobileMenu(false)
                                                }}
                                            >
                                                {item.label}
                                            </Button>

                                            {/* Mobile Submenu */}
                                            {item.children && (
                                                <div className="ml-4 pl-4 border-l border-white/10 space-y-1 mt-1 mb-2">
                                                    {item.children.map((child, childIndex) => (
                                                        <a
                                                            key={childIndex}
                                                            href={child.href}
                                                            className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-[var(--color-accent-600)] hover:translate-x-1 transition-all rounded-lg"
                                                            onClick={() => setInternalMobileMenu(false)}
                                                        >
                                                            {child.label}
                                                        </a>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </nav>
                            </div>

                            {/* Drawer Footer / Contact Button */}
                            {contactButton && (
                                <div className="p-6 border-t border-white/10 bg-black/10">
                                    {contactButton.href ? (
                                        <a href={contactButton.href} className="block w-full">
                                            <Button
                                                size="lg"
                                                shape="solid"
                                                color="accent-600"
                                                className="w-full justify-center py-3 rounded-xl shadow-lg font-bold tracking-wide"
                                            >
                                                {contactButton.label}
                                            </Button>
                                        </a>
                                    ) : (
                                        <Button
                                            size="lg"
                                            shape="solid"
                                            color="accent-600"
                                            className="w-full justify-center py-3 rounded-xl shadow-lg font-bold tracking-wide"
                                        >
                                            {contactButton.label}
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>
        )
    }
)

Header.displayName = 'Header'
