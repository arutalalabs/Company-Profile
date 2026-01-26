import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Icon } from './index'

const meta: Meta<typeof Icon> = {
    title: 'Components/Icon',
    component: Icon,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'A flexible icon component with clean separation of size, color, and behavior concerns.'
            }
        }
    },
    argTypes: {
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
            description: 'Size of the icon'
        },
        color: {
            control: 'select',
            options: [
                'primary-600',
                'primary-700',
                'primary-800',
                'accent-600',
                'accent-700',
                'accent-800',
                'neutral-400',
                'neutral-600',
                'neutral-800',
                'red-base',
                'green-base',
                'blue-base'
            ],
            description: 'Color of the icon'
        },
        type: {
            control: 'select',
            options: ['svg', 'font', 'image'],
            description: 'Type of icon rendering'
        },
        hover: {
            control: 'select',
            options: ['none', 'scale', 'rotate', 'bounce'],
            description: 'Hover animation effect'
        },
        interactive: {
            control: 'boolean',
            description: 'Make the icon interactive (clickable)'
        }
    },
    tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

// Simple paths to avoid syntax issues
const STAR = 'M12 2l3 6 6 1-5 5 1 7-6-3-6 3 1-7-5-5 6-1z'
const HEART = 'M20 4c-2-2-6-2-8 0s-6 2-8 0c-2 2-2 6 0 8l8 8 8-8c2-2 2-6 0-8z'
const CHECK = 'M20 6L9 17l-5-5'
const X = 'M18 6L6 18M6 6l12 12'

// Size Stories
export const SimpleTest: Story = {
    args: {
        icon: 'M12 2l3 6 6 1-5 5 1 7-6-3-6 3 1-7-5-5 6-1z',
        size: 'lg',
        color: 'primary-600',
        alt: 'Test star icon'
    }
}

export const ExtraSmall: Story = {
    args: {
        icon: STAR,
        size: 'xs',
        color: 'accent-600',
        alt: 'Extra small star'
    }
}

export const Small: Story = {
    args: {
        icon: STAR,
        size: 'sm',
        color: 'accent-600',
        alt: 'Small star'
    }
}

export const Medium: Story = {
    args: {
        icon: STAR,
        size: 'md',
        color: 'accent-600',
        alt: 'Medium star'
    }
}

export const Large: Story = {
    args: {
        icon: STAR,
        size: 'lg',
        color: 'accent-600',
        alt: 'Large star'
    }
}

export const ExtraLarge: Story = {
    args: {
        icon: STAR,
        size: 'xl',
        color: 'accent-600',
        alt: 'Extra large star'
    }
}

export const TwoExtraLarge: Story = {
    args: {
        icon: STAR,
        size: '2xl',
        color: 'accent-600',
        alt: 'Two extra large star'
    }
}

// Color Stories
export const PrimaryBlue: Story = {
    args: {
        icon: STAR,
        size: 'lg',
        color: 'primary-600',
        alt: 'Primary blue star'
    }
}

export const AccentGreen: Story = {
    args: {
        icon: STAR,
        size: 'lg',
        color: 'accent-600',
        alt: 'Accent green star'
    }
}

export const NeutralGray: Story = {
    args: {
        icon: STAR,
        size: 'lg',
        color: 'neutral-600',
        alt: 'Neutral gray star'
    }
}

export const RedAlert: Story = {
    args: {
        icon: STAR,
        size: 'lg',
        color: 'red-base',
        alt: 'Red alert star'
    }
}

// Icon Type Stories
export const HeartIcon: Story = {
    args: {
        icon: HEART,
        size: 'md',
        color: 'red-base',
        alt: 'Heart icon'
    }
}

export const CheckIcon: Story = {
    args: {
        icon: CHECK,
        size: 'md',
        color: 'green-base',
        alt: 'Check icon'
    }
}

export const CloseIcon: Story = {
    args: {
        icon: X,
        size: 'md',
        color: 'red-base',
        alt: 'Close icon'
    }
}

// Font Icon
export const FontIcon: Story = {
    args: {
        icon: 'home',
        type: 'font',
        size: 'md',
        color: 'primary-600',
        alt: 'Home font icon'
    }
}

// Hover Effects
export const ScaleHover: Story = {
    args: {
        icon: HEART,
        size: 'lg',
        color: 'red-base',
        hover: 'scale',
        alt: 'Heart with scale hover'
    }
}

export const RotateHover: Story = {
    args: {
        icon: STAR,
        size: 'lg',
        color: 'primary-600',
        hover: 'rotate',
        alt: 'Star with rotate hover'
    }
}

export const BounceHover: Story = {
    args: {
        icon: STAR,
        size: 'lg',
        color: 'accent-600',
        hover: 'bounce',
        alt: 'Star with bounce hover'
    }
}

// Interactive
export const InteractiveIcon: Story = {
    args: {
        icon: STAR,
        size: 'lg',
        color: 'primary-600',
        hover: 'scale',
        interactive: true,
        alt: 'Interactive star icon'
    }
}

export const CloseButton: Story = {
    args: {
        icon: X,
        size: 'sm',
        color: 'neutral-600',
        hover: 'rotate',
        interactive: true,
        alt: 'Close button'
    }
}

// Combination Stories
export const AllSizes: Story = {
    render: () =>
        React.createElement(
            'div',
            { className: 'flex items-center gap-4' },
            React.createElement(Icon, {
                icon: STAR,
                size: 'xs',
                color: 'primary-600',
                alt: 'XS'
            }),
            React.createElement(Icon, {
                icon: STAR,
                size: 'sm',
                color: 'primary-600',
                alt: 'SM'
            }),
            React.createElement(Icon, {
                icon: STAR,
                size: 'md',
                color: 'primary-600',
                alt: 'MD'
            }),
            React.createElement(Icon, {
                icon: STAR,
                size: 'lg',
                color: 'primary-600',
                alt: 'LG'
            }),
            React.createElement(Icon, {
                icon: STAR,
                size: 'xl',
                color: 'primary-600',
                alt: 'XL'
            }),
            React.createElement(Icon, {
                icon: STAR,
                size: '2xl',
                color: 'primary-600',
                alt: '2XL'
            })
        )
}

export const AllColors: Story = {
    render: () =>
        React.createElement(
            'div',
            { className: 'grid grid-cols-3 gap-4' },
            React.createElement(Icon, {
                icon: HEART,
                size: 'lg',
                color: 'primary-600',
                alt: 'Primary'
            }),
            React.createElement(Icon, {
                icon: HEART,
                size: 'lg',
                color: 'accent-600',
                alt: 'Accent'
            }),
            React.createElement(Icon, {
                icon: HEART,
                size: 'lg',
                color: 'neutral-600',
                alt: 'Neutral'
            }),
            React.createElement(Icon, {
                icon: HEART,
                size: 'lg',
                color: 'red-base',
                alt: 'Red'
            }),
            React.createElement(Icon, {
                icon: HEART,
                size: 'lg',
                color: 'green-base',
                alt: 'Green'
            }),
            React.createElement(Icon, {
                icon: HEART,
                size: 'lg',
                color: 'blue-base',
                alt: 'Blue'
            })
        )
}

export const AllHoverEffects: Story = {
    render: () =>
        React.createElement(
            'div',
            { className: 'flex gap-8' },
            React.createElement(Icon, {
                icon: STAR,
                size: 'xl',
                color: 'primary-600',
                hover: 'scale',
                alt: 'Scale'
            }),
            React.createElement(Icon, {
                icon: STAR,
                size: 'xl',
                color: 'accent-600',
                hover: 'rotate',
                alt: 'Rotate'
            }),
            React.createElement(Icon, {
                icon: STAR,
                size: 'xl',
                color: 'green-base',
                hover: 'bounce',
                alt: 'Bounce'
            })
        )
}
