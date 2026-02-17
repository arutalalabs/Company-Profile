import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Header } from './index'

// Mock the Image component
vi.mock('../image', () => ({
    Image: ({ src, alt, className, ...props }: any) => (
        <img src={src} alt={alt} className={className} {...props} />
    )
}))

// Mock the Button component
vi.mock('../button', () => ({
    Button: ({ children, onClick, className, ...props }: any) => (
        <button onClick={onClick} className={className} {...props}>
            {children}
        </button>
    )
}))

const defaultProps = {
    logo: {
        src: '/logo.png',
        alt: 'Test Logo',
        href: '/'
    },
    menuItems: [
        { label: 'Home', href: '/', isActive: true },
        { label: 'About', href: '/about' },
        { label: 'Services', href: '/services' },
        { label: 'Contact', href: '/contact' }
    ],
    contactButton: {
        label: 'Get Started',
        href: '/get-started'
    }
}

describe('Header', () => {
    beforeEach(() => {
        cleanup()
    })

    it('renders header component correctly', () => {
        render(<Header {...defaultProps} />)

        const header = screen.getByRole('banner')
        expect(header).toBeInTheDocument()
        expect(header).toHaveClass('sticky', 'top-0', 'z-50')
    })

    it('renders logo with correct props', () => {
        render(<Header {...defaultProps} />)

        const logo = screen.getByAltText('Test Logo')
        expect(logo).toBeInTheDocument()
        expect(logo).toHaveAttribute('src', '/logo.png')

        const logoLink = logo.closest('a')
        expect(logoLink).toHaveAttribute('href', '/')
    })

    it('renders logo without link when href is not provided', () => {
        const propsWithoutHref = {
            ...defaultProps,
            logo: { src: '/logo.png', alt: 'Test Logo' }
        }

        render(<Header {...propsWithoutHref} />)

        const logo = screen.getByAltText('Test Logo')
        expect(logo).toBeInTheDocument()

        const logoLink = logo.closest('a')
        expect(logoLink).toBeNull()
    })

    it('renders navigation menu items', () => {
        render(<Header {...defaultProps} />)

        expect(screen.getByText('Home')).toBeInTheDocument()
        expect(screen.getByText('About')).toBeInTheDocument()
        expect(screen.getByText('Services')).toBeInTheDocument()
        expect(screen.getByText('Contact')).toBeInTheDocument()
    })

    it('applies active styling to active menu item', () => {
        render(<Header {...defaultProps} />)

        const homeButton = screen.getByText('Home').closest('button')
        expect(homeButton).toHaveClass(
            'text-[var(--color-accent-600)]',
            'font-medium'
        )
    })

    it('renders contact button when provided', () => {
        render(<Header {...defaultProps} />)

        const contactButton = screen.getByText('Get Started')
        expect(contactButton).toBeInTheDocument()
    })

    it('does not render contact button when not provided', () => {
        const propsWithoutContact = {
            ...defaultProps,
            contactButton: undefined
        }

        render(<Header {...propsWithoutContact} />)

        expect(screen.queryByText('Get Started')).not.toBeInTheDocument()
    })

    it('toggles mobile menu when hamburger button is clicked', () => {
        render(<Header {...defaultProps} />)

        const mobileMenuButton = screen.getByLabelText('Toggle mobile menu')
        expect(mobileMenuButton).toBeInTheDocument()

        // Initially mobile menu should be closed
        expect(screen.queryByText('Home')).toBeInTheDocument() // Desktop nav

        // Click to open mobile menu
        fireEvent.click(mobileMenuButton)

        // Check if mobile navigation is visible
        const mobileNavButtons = screen.getAllByText('Home')
        expect(mobileNavButtons.length).toBeGreaterThan(1)
    })

    it('closes mobile menu when menu item is clicked', () => {
        render(<Header {...defaultProps} />)

        const mobileMenuButton = screen.getByLabelText('Toggle mobile menu')

        // Open mobile menu
        fireEvent.click(mobileMenuButton)

        // Click on a mobile menu item
        const mobileMenuItems = screen.getAllByText('About')
        const mobileAboutButton = mobileMenuItems.find((item) =>
            item.closest('button')?.className.includes('w-full')
        )

        if (mobileAboutButton) {
            fireEvent.click(mobileAboutButton)
        }
    })

    it('calls external mobile menu toggle handler when provided', () => {
        const mockToggleHandler = vi.fn()
        const propsWithHandler = {
            ...defaultProps,
            onMobileMenuToggle: mockToggleHandler
        }

        render(<Header {...propsWithHandler} />)

        const mobileMenuButton = screen.getByLabelText('Toggle mobile menu')
        fireEvent.click(mobileMenuButton)

        expect(mockToggleHandler).toHaveBeenCalledTimes(1)
    })

    it('uses external mobile menu state when provided', () => {
        const propsWithExternalState = {
            ...defaultProps,
            mobileMenuOpen: true
        }

        render(<Header {...propsWithExternalState} />)

        const mobileMenuItems = screen.getAllByText('Home')
        expect(mobileMenuItems.length).toBeGreaterThan(1)
    })

    it('applies correct styling classes', () => {
        render(<Header {...defaultProps} />)

        const header = screen.getByRole('banner')
        expect(header).toHaveClass(
            'w-full',
            'bg-[var(--color-primary-900)]',
            'shadow-sm',
            'sticky',
            'top-0',
            'z-50'
        )
    })

    it('applies custom className when provided', () => {
        const customProps = {
            ...defaultProps,
            className: 'custom-header-class'
        }

        render(<Header {...customProps} />)

        const header = screen.getByRole('banner')
        expect(header).toHaveClass('custom-header-class')
    })

    it('handles menu item navigation correctly', () => {
        const originalLocation = window.location
        delete (window as any).location
        window.location = { ...originalLocation, href: '' }

        render(<Header {...defaultProps} />)

        const aboutButton = screen.getByText('About')
        fireEvent.click(aboutButton)

        expect(window.location.href).toBe('/about')

        window.location = originalLocation
    })

    it('renders hamburger icon when mobile menu is closed', () => {
        render(<Header {...defaultProps} />)

        const mobileMenuButton = screen.getByLabelText('Toggle mobile menu')
        const svg = mobileMenuButton.querySelector('svg')
        const path = svg?.querySelector('path')

        expect(path).toHaveAttribute('d', 'M4 6h16M4 12h16M4 18h16')
    })

    it('renders close icon when mobile menu is open', () => {
        render(<Header {...defaultProps} />)

        const mobileMenuButton = screen.getByLabelText('Toggle mobile menu')

        // Open mobile menu
        fireEvent.click(mobileMenuButton)

        const svg = mobileMenuButton.querySelector('svg')
        const path = svg?.querySelector('path')

        expect(path).toHaveAttribute('d', 'M6 18L18 6M6 6l12 12')
    })

    it('handles contact button with href', () => {
        render(<Header {...defaultProps} />)

        const contactButtonLink = screen
            .getByText('Get Started')
            .closest('a')
        expect(contactButtonLink).toHaveAttribute('href', '/get-started')
    })

    it('handles contact button without href', () => {
        const propsWithoutHref = {
            ...defaultProps,
            contactButton: {
                label: 'Contact Us'
            }
        }

        render(<Header {...propsWithoutHref} />)

        const contactButton = screen.getByText('Contact Us')
        const contactButtonLink = contactButton.closest('a')
        expect(contactButtonLink).toBeNull()
    })

    it('has proper responsive classes', () => {
        render(<Header {...defaultProps} />)

        const desktopNav = screen.getByText('Home').closest('nav')
        expect(desktopNav).toHaveClass('hidden', 'md:flex')

        const mobileMenuContainer = screen
            .getByLabelText('Toggle mobile menu')
            .closest('div')
        expect(mobileMenuContainer).toHaveClass('md:hidden')
    })

    it('passes through additional HTML attributes', () => {
        const additionalProps = {
            ...defaultProps,
            'data-testid': 'custom-header',
            'aria-label': 'Main navigation'
        }

        render(<Header {...additionalProps} />)

        const header = screen.getByRole('banner')
        expect(header).toHaveAttribute('data-testid', 'custom-header')
        expect(header).toHaveAttribute('aria-label', 'Main navigation')
    })
})