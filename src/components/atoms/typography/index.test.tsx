import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Typography } from '.'

describe('ui/typography', () => {
    it('renders with text content', () => {
        render(<Typography>Hello World</Typography>)
        expect(screen.getByText('Hello World')).toBeDefined()
    })

    it('applies default props correctly', () => {
        render(<Typography>Default text</Typography>)
        const element = screen.getByText('Default text')
        expect(element.className).toContain('text-base')
        expect(element.className).toContain('font-normal')
        expect(element.className).toContain('leading-normal')
    })

    it('applies size styles correctly', () => {
        render(<Typography size="2xl">Large heading</Typography>)
        const element = screen.getByText('Large heading')
        expect(element.className).toContain('text-2xl')
    })

    it('applies weight styles correctly', () => {
        render(<Typography weight="bold">Bold text</Typography>)
        const element = screen.getByText('Bold text')
        expect(element.className).toContain('font-bold')
    })

    it('applies color styles correctly', () => {
        render(<Typography color="primary-600">Primary text</Typography>)
        const element = screen.getByText('Primary text')
        expect(element.className).toContain('text-[var(--color-primary-600)]')
    })

    it('applies leading styles correctly', () => {
        render(<Typography leading="tight">Tight leading</Typography>)
        const element = screen.getByText('Tight leading')
        expect(element.className).toContain('leading-tight')
    })

    it('applies tracking styles correctly', () => {
        render(<Typography tracking="wide">Wide tracking</Typography>)
        const element = screen.getByText('Wide tracking')
        expect(element.className).toContain('tracking-wide')
    })

    it('applies alignment styles correctly', () => {
        render(<Typography align="center">Centered text</Typography>)
        const element = screen.getByText('Centered text')
        expect(element.className).toContain('text-center')
    })

    it('renders with correct HTML element', () => {
        render(<Typography as="h1">Heading</Typography>)
        const element = screen.getByRole('heading', { level: 1 })
        expect(element.tagName).toBe('H1')
    })

    it('renders as paragraph by default', () => {
        render(<Typography>Paragraph text</Typography>)
        const element = screen.getByText('Paragraph text')
        expect(element.tagName).toBe('P')
    })

    it('applies custom className', () => {
        render(<Typography className="custom-class">Custom</Typography>)
        const element = screen.getByText('Custom')
        expect(element.className).toContain('custom-class')
    })

    it('combines multiple style props correctly', () => {
        render(
            <Typography
                size="xl"
                weight="semibold"
                color="accent-600"
                leading="snug"
                tracking="tight"
                align="right"
            >
                Combined styles
            </Typography>
        )
        const element = screen.getByText('Combined styles')
        expect(element.className).toContain('text-xl')
        expect(element.className).toContain('font-semibold')
        expect(element.className).toContain('text-[var(--color-accent-600)]')
        expect(element.className).toContain('leading-snug')
        expect(element.className).toContain('tracking-tight')
        expect(element.className).toContain('text-right')
    })

    it('renders different color variations', () => {
        const colors = [
            'neutral-950',
            'neutral-600',
            'primary-600',
            'red-base',
            'green-base'
        ]

        colors.forEach((color) => {
            const { unmount } = render(
                <Typography color={color as any}>{color} text</Typography>
            )
            const element = screen.getByText(`${color} text`)
            expect(element.className).toContain(`text-[var(--color-${color})]`)
            unmount()
        })
    })

    it('renders all size variants correctly', () => {
        const sizes = [
            'xs',
            'sm',
            'base',
            'lg',
            'xl',
            '2xl',
            '3xl',
            '4xl',
            '5xl'
        ]

        sizes.forEach((size) => {
            const { unmount } = render(
                <Typography size={size as any}>{size} text</Typography>
            )
            const element = screen.getByText(`${size} text`)
            expect(element.className).toContain(`text-${size}`)
            unmount()
        })
    })
})
