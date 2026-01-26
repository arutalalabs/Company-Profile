import '@/styles/global.css'

import type { Meta, StoryObj } from '@storybook/react'
import { Typography } from '.'

const meta: Meta<typeof Typography> = {
    title: 'Components/Typography',
    component: Typography,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'A flexible typography component with clean separation of size, weight, color, and spacing concerns. Perfect for creating consistent text styles across your application.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: [
                'xs',
                'sm',
                'base',
                'lg',
                'xl',
                '2xl',
                '3xl',
                '4xl',
                '5xl'
            ],
            description: 'Typography size scale'
        },
        weight: {
            control: 'select',
            options: [
                'light',
                'normal',
                'medium',
                'semibold',
                'bold',
                'extrabold'
            ],
            description: 'Font weight'
        },
        color: {
            control: 'select',
            options: [
                'neutral-950',
                'neutral-600',
                'neutral-400',
                'primary-600',
                'accent-600',
                'red-base',
                'green-base'
            ],
            description: 'Text color theme'
        },
        leading: {
            control: 'select',
            options: ['tight', 'snug', 'normal', 'relaxed', 'loose'],
            description: 'Line height for better readability'
        },
        tracking: {
            control: 'select',
            options: ['tighter', 'tight', 'normal', 'wide', 'wider'],
            description: 'Letter spacing'
        },
        align: {
            control: 'select',
            options: ['left', 'center', 'right', 'justify'],
            description: 'Text alignment'
        },
        as: {
            control: 'select',
            options: [
                'h1',
                'h2',
                'h3',
                'h4',
                'h5',
                'h6',
                'p',
                'span',
                'div',
                'label'
            ],
            description: 'HTML element to render as'
        }
    },
    args: {
        children: 'Typography Text'
    }
}

export default meta
type Story = StoryObj<typeof meta>

// Size Stories
export const ExtraSmall: Story = {
    args: {
        size: 'xs',
        children: 'Extra small text'
    }
}

export const Small: Story = {
    args: {
        size: 'sm',
        children: 'Small text'
    }
}

export const Base: Story = {
    args: {
        size: 'base',
        children: 'Base text size'
    }
}

export const Large: Story = {
    args: {
        size: 'lg',
        children: 'Large text'
    }
}

export const ExtraLarge: Story = {
    args: {
        size: 'xl',
        children: 'Extra large text'
    }
}

export const Heading2XL: Story = {
    args: {
        size: '2xl',
        children: 'Heading 2XL'
    }
}

export const Heading3XL: Story = {
    args: {
        size: '3xl',
        children: 'Heading 3XL'
    }
}

export const Heading4XL: Story = {
    args: {
        size: '4xl',
        children: 'Heading 4XL'
    }
}

export const Heading5XL: Story = {
    args: {
        size: '5xl',
        children: 'Heading 5XL'
    }
}

// Weight Stories
export const Light: Story = {
    args: {
        weight: 'light',
        children: 'Light weight text'
    }
}

export const Normal: Story = {
    args: {
        weight: 'normal',
        children: 'Normal weight text'
    }
}

export const Medium: Story = {
    args: {
        weight: 'medium',
        children: 'Medium weight text'
    }
}

export const Semibold: Story = {
    args: {
        weight: 'semibold',
        children: 'Semibold weight text'
    }
}

export const Bold: Story = {
    args: {
        weight: 'bold',
        children: 'Bold weight text'
    }
}

export const ExtraBold: Story = {
    args: {
        weight: 'extrabold',
        children: 'Extra bold weight text'
    }
}

// Color Stories
export const DefaultDark: Story = {
    args: {
        color: 'neutral-950',
        children: 'Default dark text'
    }
}

export const Muted: Story = {
    args: {
        color: 'neutral-600',
        children: 'Muted gray text'
    }
}

export const LightColor: Story = {
    args: {
        color: 'neutral-600',
        children: 'Light gray text'
    }
}

export const Primary: Story = {
    args: {
        color: 'primary-600',
        children: 'Primary color text'
    }
}

export const Accent: Story = {
    args: {
        color: 'accent-600',
        children: 'Accent color text'
    }
}

export const Danger: Story = {
    args: {
        color: 'red-base',
        children: 'Danger red text'
    }
}

export const Success: Story = {
    args: {
        color: 'green-base',
        children: 'Success green text'
    }
}

// Leading (Line Height) Stories
export const TightLeading: Story = {
    args: {
        leading: 'tight',
        children:
            'This is text with tight line height. Multiple lines will have less spacing between them.'
    },
    parameters: {
        layout: 'padded'
    }
}

export const RelaxedLeading: Story = {
    args: {
        leading: 'relaxed',
        children:
            'This is text with relaxed line height. Multiple lines will have more spacing between them for better readability.'
    },
    parameters: {
        layout: 'padded'
    }
}

// Combination Stories
export const MainHeading: Story = {
    args: {
        size: '4xl',
        weight: 'bold',
        color: 'neutral-950',
        leading: 'tight',
        tracking: 'tight',
        as: 'h1',
        children: 'Main Page Heading'
    }
}

export const SectionHeading: Story = {
    args: {
        size: '2xl',
        weight: 'semibold',
        color: 'primary-600',
        leading: 'snug',
        as: 'h2',
        children: 'Section Heading'
    }
}

export const BodyText: Story = {
    args: {
        size: 'base',
        weight: 'normal',
        color: 'neutral-600',
        leading: 'relaxed',
        as: 'p',
        children:
            'This is body text with optimal readability settings. It uses relaxed line height and neutral color for comfortable reading experience.'
    },
    parameters: {
        layout: 'padded'
    }
}

export const Caption: Story = {
    args: {
        size: 'xs',
        weight: 'medium',
        color: 'neutral-600',
        leading: 'normal',
        as: 'span',
        children: 'Caption text for images or small descriptions'
    }
}

export const CenteredHeading: Story = {
    args: {
        size: '3xl',
        weight: 'bold',
        color: 'primary-600',
        align: 'center',
        leading: 'tight',
        as: 'h2',
        children: 'Centered Heading'
    }
}
