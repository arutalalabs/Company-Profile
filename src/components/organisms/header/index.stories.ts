import type { Meta, StoryObj } from '@storybook/react'
import { Header } from './index'

const meta = {
    title: 'Components/Header',
    component: Header,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'A responsive header component with logo, navigation menu, and contact button. Features sticky positioning and mobile-responsive navigation.'
            }
        }
    },
    argTypes: {
        logo: {
            description: 'Logo configuration with src, alt, and optional href',
            control: { type: 'object' }
        },
        menuItems: {
            description: 'Array of navigation menu items',
            control: { type: 'object' }
        },
        contactButton: {
            description: 'Optional contact button configuration',
            control: { type: 'object' }
        },
        mobileMenuOpen: {
            description: 'Controls mobile menu visibility (external control)',
            control: { type: 'boolean' }
        },
        onMobileMenuToggle: {
            description: 'Callback function for mobile menu toggle',
            action: 'mobileMenuToggled'
        }
    },
    tags: ['autodocs']
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

const defaultLogo = {
    src: '/stories/assets/logo.png',
    alt: 'Company Logo',
    href: '/'
}

const defaultMenuItems = [
    { label: 'Home', href: '/', isActive: true },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' }
]

const defaultContactButton = {
    label: 'Get Started',
    href: '/contact'
}

// Default header story
export const Default: Story = {
    args: {
        logo: defaultLogo,
        menuItems: defaultMenuItems,
        contactButton: defaultContactButton
    }
}

// Header without contact button
export const WithoutContactButton: Story = {
    args: {
        logo: defaultLogo,
        menuItems: defaultMenuItems
    }
}

// Header with fewer menu items
export const SimpleNavigation: Story = {
    args: {
        logo: defaultLogo,
        menuItems: [
            { label: 'Home', href: '/', isActive: true },
            { label: 'About', href: '/about' },
            { label: 'Contact', href: '/contact' }
        ],
        contactButton: defaultContactButton
    }
}

// Header with different active item
export const DifferentActiveItem: Story = {
    args: {
        logo: defaultLogo,
        menuItems: [
            { label: 'Home', href: '/' },
            { label: 'About', href: '/about', isActive: true },
            { label: 'Services', href: '/services' },
            { label: 'Contact', href: '/contact' }
        ],
        contactButton: defaultContactButton
    }
}

// Header without logo link
export const LogoWithoutLink: Story = {
    args: {
        logo: {
            src: '/stories/assets/logo.png',
            alt: 'Company Logo'
            // No href property
        },
        menuItems: defaultMenuItems,
        contactButton: defaultContactButton
    }
}

// Header with controlled mobile menu (external state)
export const ControlledMobileMenu: Story = {
    args: {
        logo: defaultLogo,
        menuItems: defaultMenuItems,
        contactButton: defaultContactButton,
        mobileMenuOpen: true,
        onMobileMenuToggle: () => console.log('Mobile menu toggled')
    }
}

// Header with custom styling
export const CustomStyling: Story = {
    args: {
        logo: defaultLogo,
        menuItems: defaultMenuItems,
        contactButton: defaultContactButton,
        className: 'border-b-4 border-accent-600'
    }
}

// Responsive demonstration (different viewport)
export const MobileView: Story = {
    args: {
        logo: defaultLogo,
        menuItems: defaultMenuItems,
        contactButton: defaultContactButton
    },
    parameters: {
        viewport: {
            defaultViewport: 'mobile1'
        },
        docs: {
            description: {
                story: 'Header component displayed in mobile viewport to demonstrate responsive behavior. The navigation items are hidden and replaced with a hamburger menu.'
            }
        }
    }
}

// Tablet view
export const TabletView: Story = {
    args: {
        logo: defaultLogo,
        menuItems: defaultMenuItems,
        contactButton: defaultContactButton
    },
    parameters: {
        viewport: {
            defaultViewport: 'tablet'
        }
    }
}

// Long menu items to test responsive behavior
export const LongMenuItems: Story = {
    args: {
        logo: defaultLogo,
        menuItems: [
            { label: 'Home', href: '/', isActive: true },
            { label: 'About Our Company', href: '/about' },
            { label: 'Professional Services', href: '/services' },
            { label: 'Portfolio & Case Studies', href: '/portfolio' },
            { label: 'Industry Blog', href: '/blog' },
            { label: 'Contact & Support', href: '/contact' },
            { label: 'Customer Resources', href: '/resources' }
        ],
        contactButton: {
            label: 'Schedule Consultation',
            href: '/contact'
        }
    }
}
