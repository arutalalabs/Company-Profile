import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './index'

const meta: Meta<typeof Card> = {
    title: 'Components/Card',
    component: Card,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg']
        }
    }
}

export default meta
type Story = StoryObj<typeof meta>

// Default Service Card
export const Default: Story = {
    args: {
        title: 'Web Development',
        description:
            'We create modern, responsive websites using the latest technologies to help your business grow online.',
        buttonText: 'Learn More',
        onButtonClick: () => console.log('Learn More clicked')
    }
}

// Service Card with Image
export const WithImage: Story = {
    args: {
        title: 'Mobile App Development',
        description:
            'Custom mobile applications for iOS and Android platforms using React Native and Flutter technologies.',
        image: {
            src: '/mentor/mobile-dev.jpg',
            alt: 'Mobile Development Service'
        },
        buttonText: 'Get Started',
        onButtonClick: () => console.log('Get Started clicked')
    }
}

// Small Size Service Card
export const SmallSize: Story = {
    args: {
        size: 'sm',
        title: 'UI/UX Design',
        description:
            'Beautiful and functional design solutions for your digital products.',
        image: {
            src: '/mentor/design-service.jpg',
            alt: 'Design Service'
        },
        buttonText: 'View Portfolio',
        onButtonClick: () => console.log('View Portfolio clicked')
    }
}

// Large Size Service Card
export const LargeSize: Story = {
    args: {
        size: 'lg',
        title: 'Digital Marketing',
        description:
            'Comprehensive digital marketing strategies to boost your online presence and reach your target audience effectively.',
        image: {
            src: '/mentor/marketing-service.jpg',
            alt: 'Marketing Service'
        },
        buttonText: 'Start Campaign',
        onButtonClick: () => console.log('Start Campaign clicked')
    }
}

// Without Button
export const WithoutButton: Story = {
    args: {
        title: 'Consultation Service',
        description:
            'Expert consultation to help you make informed decisions about your technology stack and business strategy.',
        image: {
            src: '/mentor/consultation.jpg',
            alt: 'Consultation Service'
        }
    }
}

// Long Description
export const LongDescription: Story = {
    args: {
        title: 'Full-Stack Development',
        description:
            'End-to-end web application development services including frontend, backend, database design, and deployment. We use modern technologies like React, Node.js, PostgreSQL, and cloud infrastructure to build scalable and maintainable applications.',
        image: {
            src: '/mentor/fullstack-dev.jpg',
            alt: 'Full-Stack Development'
        },
        buttonText: 'Request Quote',
        onButtonClick: () => console.log('Request Quote clicked')
    }
}
