import '@/styles/global.css'

import type { Meta, StoryObj } from '@storybook/react'
import { Image } from '.'
import React from 'react'

const meta: Meta<typeof Image> = {
    title: 'Components/Image',
    component: Image,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'A flexible image component with clean separation of size, shape, aspect ratio, and behavior concerns. Features loading states, error handling, and responsive design.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['xs', 'sm', 'base', 'md', 'lg', 'xl', '2xl', '3xl'],
            description: 'Image size scale'
        },
        shape: {
            control: 'select',
            options: ['none', 'square', 'rounded', 'circle'],
            description: 'Image shape/border radius'
        },
        aspectRatio: {
            control: 'select',
            options: [
                'auto',
                'square',
                'video',
                'portrait',
                'landscape',
                'wide'
            ],
            description: 'Aspect ratio constraint'
        },
        fit: {
            control: 'select',
            options: ['cover', 'contain', 'fill', 'none', 'scale-down'],
            description: 'Object fit behavior'
        },
        fullWidth: {
            control: 'boolean',
            description: 'Full width behavior'
        },
        loading: {
            control: 'select',
            options: ['lazy', 'eager'],
            description: 'Loading strategy'
        }
    },
    args: {
        src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
        alt: 'Sample image'
    }
}

export default meta
type Story = StoryObj<typeof meta>

// Size Stories
export const ExtraSmall: Story = {
    args: {
        size: 'xs',
        alt: 'Extra small image'
    }
}

export const Small: Story = {
    args: {
        size: 'sm',
        alt: 'Small image'
    }
}

export const Base: Story = {
    args: {
        size: 'base',
        alt: 'Base size image'
    }
}

export const Medium: Story = {
    args: {
        size: 'md',
        alt: 'Medium image'
    }
}

export const Large: Story = {
    args: {
        size: 'lg',
        alt: 'Large image'
    }
}

export const ExtraLarge: Story = {
    args: {
        size: 'xl',
        alt: 'Extra large image'
    }
}

export const XXLarge: Story = {
    args: {
        size: '2xl',
        alt: '2XL image'
    }
}

export const XXXLarge: Story = {
    args: {
        size: '3xl',
        alt: '3XL image'
    }
}

// Shape Stories
export const SquareShape: Story = {
    args: {
        size: 'lg',
        shape: 'square',
        alt: 'Square image'
    }
}

export const RoundedShape: Story = {
    args: {
        size: 'lg',
        shape: 'rounded',
        alt: 'Rounded image'
    }
}

export const CircleShape: Story = {
    args: {
        size: 'lg',
        shape: 'circle',
        alt: 'Circle image'
    }
}

export const NoShape: Story = {
    args: {
        size: 'lg',
        shape: 'none',
        alt: 'No shape image'
    }
}

// Aspect Ratio Stories
export const SquareAspect: Story = {
    args: {
        size: 'xl',
        aspectRatio: 'square',
        alt: 'Square aspect ratio'
    }
}

export const VideoAspect: Story = {
    args: {
        size: 'xl',
        aspectRatio: 'video',
        alt: 'Video aspect ratio (16:9)'
    },
    parameters: {
        layout: 'padded'
    }
}

export const PortraitAspect: Story = {
    args: {
        size: 'xl',
        aspectRatio: 'portrait',
        alt: 'Portrait aspect ratio (3:4)'
    }
}

export const LandscapeAspect: Story = {
    args: {
        size: 'xl',
        aspectRatio: 'landscape',
        alt: 'Landscape aspect ratio (4:3)'
    }
}

export const WideAspect: Story = {
    args: {
        size: 'xl',
        aspectRatio: 'wide',
        alt: 'Wide aspect ratio (21:9)'
    },
    parameters: {
        layout: 'padded'
    }
}

// Object Fit Stories
export const CoverFit: Story = {
    args: {
        size: 'xl',
        aspectRatio: 'square',
        fit: 'cover',
        alt: 'Cover fit - crops to fill'
    }
}

export const ContainFit: Story = {
    args: {
        size: 'xl',
        aspectRatio: 'square',
        fit: 'contain',
        alt: 'Contain fit - scales to fit entirely'
    }
}

export const FillFit: Story = {
    args: {
        size: 'xl',
        aspectRatio: 'square',
        fit: 'fill',
        alt: 'Fill fit - stretches to fill'
    }
}

// Full Width Stories
export const FullWidthImage: Story = {
    args: {
        fullWidth: true,
        aspectRatio: 'video',
        alt: 'Full width image'
    },
    parameters: {
        layout: 'padded'
    }
}

export const FullWidthHero: Story = {
    args: {
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop',
        fullWidth: true,
        aspectRatio: 'wide',
        fit: 'cover',
        alt: 'Full width hero image'
    },
    parameters: {
        layout: 'fullscreen'
    }
}

// Combination Stories
export const Avatar: Story = {
    args: {
        size: 'lg',
        shape: 'circle',
        aspectRatio: 'square',
        fit: 'cover',
        alt: 'User avatar'
    }
}

export const ProfileImage: Story = {
    args: {
        size: 'xl',
        shape: 'rounded',
        aspectRatio: 'square',
        fit: 'cover',
        alt: 'Profile image'
    }
}

export const Thumbnail: Story = {
    args: {
        size: 'md',
        shape: 'rounded',
        aspectRatio: 'square',
        fit: 'cover',
        alt: 'Thumbnail image'
    }
}

export const Banner: Story = {
    args: {
        fullWidth: true,
        aspectRatio: 'video',
        shape: 'rounded',
        fit: 'cover',
        alt: 'Banner image'
    },
    parameters: {
        layout: 'padded'
    }
}

// Loading and Error States
export const WithPlaceholder: Story = {
    args: {
        size: 'xl',
        placeholder: 'Loading...',
        alt: 'Image with placeholder',
        // Simulate slow loading
        src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&delay=3000'
    }
}

export const ErrorState: Story = {
    args: {
        size: 'xl',
        src: 'https://invalid-url-that-will-fail.jpg',
        alt: 'Image that fails to load'
    }
}

export const CustomFallback: Story = {
    args: {
        size: 'xl',
        src: 'https://invalid-url-that-will-fail.jpg',
        alt: 'Image with custom fallback',
        fallback: React.createElement(
            'div',
            {
                className:
                    'flex items-center justify-center w-32 h-32 bg-gray-100 rounded-lg'
            },
            React.createElement(
                'span',
                { className: 'text-gray-500' },
                'Custom Fallback'
            )
        )
    }
}
