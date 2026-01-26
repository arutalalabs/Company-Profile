import type { Meta, StoryObj } from '@storybook/react'
import { Tag } from '.'

const meta: Meta<typeof Tag> = {
    title: 'Components/Tag',
    component: Tag,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'A flexible tag component with configurable size, variant, and color combinations. Supports closable functionality.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Size of the tag'
        },
        variant: {
            control: 'select',
            options: ['solid', 'outline'],
            description: 'Variant/style of the tag'
        },
        color: {
            control: 'select',
            options: [
                'primary-900',
                'accent-600',
                'neutral-50',
                'neutral-950',
                'red-base',
                'green-base',
                'gray-base',
                'yellow-base'
            ],
            description: 'Color theme of the tag'
        },
        closable: {
            control: 'boolean',
            description: 'Whether the tag can be closed'
        },
        onClose: {
            action: 'closed'
        }
    },
    args: {
        children: 'Tag'
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
        children: 'Accent Tag'
    }
}

export const NeutralLight: Story = {
    args: {
        color: 'neutral-50',
        children: 'Light Tag'
    }
}

export const NeutralDark: Story = {
    args: {
        color: 'neutral-950',
        children: 'Dark Tag'
    }
}

export const Danger: Story = {
    args: {
        color: 'red-base',
        children: 'Error'
    }
}

export const Success: Story = {
    args: {
        color: 'green-base',
        children: 'Success'
    }
}

export const Gray: Story = {
    args: {
        color: 'gray-base',
        children: 'Gray Tag'
    }
}

export const Yellow: Story = {
    args: {
        color: 'yellow-base',
        children: 'Yellow Tag'
    }
}

// Variant Stories
export const Solid: Story = {
    args: {
        variant: 'solid',
        children: 'Solid Tag'
    }
}

export const Outline: Story = {
    args: {
        variant: 'outline',
        children: 'Outline Tag'
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
        children: 'Medium Tag'
    }
}

export const Large: Story = {
    args: {
        size: 'lg',
        children: 'Large'
    }
}

// Closable Stories
export const Closable: Story = {
    args: {
        closable: true,
        children: 'Closable Tag'
    }
}

export const ClosableGray: Story = {
    args: {
        closable: true,
        color: 'gray-base',
        children: 'Close Me'
    }
}

export const ClosableYellow: Story = {
    args: {
        closable: true,
        color: 'yellow-base',
        children: 'Yellow Closable'
    }
}

// Combination Stories
export const LargeOutlineGray: Story = {
    args: {
        size: 'lg',
        variant: 'outline',
        color: 'gray-base',
        children: 'Large Outline Gray'
    }
}

export const SmallSolidYellow: Story = {
    args: {
        size: 'sm',
        variant: 'solid',
        color: 'yellow-base',
        children: 'Small Yellow'
    }
}

export const MediumClosableGray: Story = {
    args: {
        size: 'md',
        variant: 'solid',
        color: 'gray-base',
        closable: true,
        children: 'Closable Gray'
    }
}

export const LargeClosableYellow: Story = {
    args: {
        size: 'lg',
        variant: 'outline',
        color: 'yellow-base',
        closable: true,
        children: 'Large Yellow Closable'
    }
}

// Group of Tags Story
export const TagGroup: Story = {
    render: () => {
        const React = require('react')
        return React.createElement(
            'div',
            { className: 'flex flex-wrap gap-2' },
            React.createElement(
                Tag,
                { color: 'gray-base', size: 'sm' },
                'React'
            ),
            React.createElement(
                Tag,
                { color: 'yellow-base', size: 'sm' },
                'TypeScript'
            ),
            React.createElement(
                Tag,
                { color: 'green-base', size: 'sm', closable: true },
                'Frontend'
            ),
            React.createElement(
                Tag,
                { color: 'red-base', size: 'sm', variant: 'outline' },
                'Urgent'
            ),
            React.createElement(
                Tag,
                { color: 'primary-900', size: 'sm' },
                'Featured'
            )
        )
    },
    parameters: {
        layout: 'padded'
    }
}
