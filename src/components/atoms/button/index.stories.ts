import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '.'
import React from 'react'

const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'A flexible button component with configurable size, shape, and color combinations. Supports icons and responsive design.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Size of the button'
        },
        shape: {
            control: 'select',
            options: ['solid', 'outline', 'link'],
            description: 'Shape/style of the button'
        },
        color: {
            control: 'select',
            options: [
                'primary-900',
                'accent-600',
                'neutral-50',
                'neutral-950',
                'red-base',
                'green-base'
            ],
            description: 'Color theme of the button'
        },
        fullWidth: {
            control: 'boolean',
            description: 'Make button full width'
        },
        disabled: {
            control: 'boolean',
            description: 'Disabled state'
        },
        onClick: {
            action: 'clicked'
        }
    },
    args: {
        children: 'Button'
    }
}

export default meta
type Story = StoryObj<typeof meta>

// Color Stories
export const PrimaryDark: Story = {
    args: {
        color: 'primary-900',
        children: 'Primary Dark'
    }
}

export const Accent: Story = {
    args: {
        color: 'accent-600',
        children: 'Accent Button'
    }
}

export const NeutralLight: Story = {
    args: {
        color: 'neutral-50',
        children: 'Light Button'
    }
}

export const NeutralDark: Story = {
    args: {
        color: 'neutral-950',
        children: 'Dark Button'
    }
}

export const Danger: Story = {
    args: {
        color: 'red-base',
        children: 'Delete'
    }
}

export const Success: Story = {
    args: {
        color: 'green-base',
        children: 'Save'
    }
}

// Shape Stories
export const Solid: Story = {
    args: {
        shape: 'solid',
        children: 'Solid Button'
    }
}

export const Outline: Story = {
    args: {
        shape: 'outline',
        children: 'Outline Button'
    }
}

export const Link: Story = {
    args: {
        shape: 'link',
        children: 'Link Button'
    }
}

// Size Stories
export const Small: Story = {
    args: {
        size: 'sm',
        children: 'Small'
    }
}

export const Medium: Story = {
    args: {
        size: 'md',
        children: 'Medium Button'
    }
}

export const Large: Story = {
    args: {
        size: 'lg',
        children: 'Large'
    }
}

// State Stories
export const Disabled: Story = {
    args: {
        disabled: true,
        children: 'Disabled'
    }
}

export const FullWidth: Story = {
    args: {
        fullWidth: true,
        children: 'Full Width Button'
    },
    parameters: {
        layout: 'padded'
    }
}

// Combination Stories
export const LargeOutlineRed: Story = {
    args: {
        size: 'lg',
        shape: 'outline',
        color: 'red-base',
        children: 'Large Outline Red'
    }
}

export const SmallLinkGreen: Story = {
    args: {
        size: 'sm',
        shape: 'link',
        color: 'green-base',
        children: 'Small Link Green'
    }
}

// Icon Stories
export const WithLeftIcon: Story = {
    args: {
        leftIcon: React.createElement(
            'svg',
            {
                className: 'w-4 h-4',
                fill: 'none',
                stroke: 'currentColor',
                viewBox: '0 0 24 24'
            },
            React.createElement('path', {
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeWidth: 2,
                d: 'M12 4v16m8-8H4'
            })
        ),
        children: 'Add Item'
    }
}

export const WithRightIcon: Story = {
    args: {
        rightIcon: React.createElement(
            'svg',
            {
                className: 'w-4 h-4',
                fill: 'none',
                stroke: 'currentColor',
                viewBox: '0 0 24 24'
            },
            React.createElement('path', {
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeWidth: 2,
                d: 'M9 5l7 7-7 7'
            })
        ),
        children: 'Next'
    }
}
