import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

import { Button } from '.'

describe('ui/button', () => {
    it('renders with text', () => {
        render(<Button>Click me</Button>)
        expect(screen.getByText('Click me')).toBeDefined()
    })

    it('calls onClick when clicked', () => {
        const handleClick = vi.fn()
        render(<Button onClick={handleClick}>Click</Button>)

        fireEvent.click(screen.getByText('Click'))
        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('applies color and shape styles', () => {
        render(
            <Button color="red-base" shape="solid">
                Delete
            </Button>
        )
        const button = screen.getByRole('button', { name: 'Delete' })
        expect(button.className).toContain('bg-[var(--color-red-base)]')
    })

    it('disables button when disabled prop is true', () => {
        render(<Button disabled>Disabled</Button>)
        const button = screen.getByRole('button', { name: 'Disabled' })
        expect(button).toHaveProperty('disabled', true)
    })

    it('applies size styles correctly', () => {
        render(<Button size="lg">Large Button</Button>)
        const button = screen.getByRole('button', { name: 'Large Button' })
        expect(button.className).toContain('px-6 py-3')
    })

    it('applies shape-specific styles', () => {
        render(<Button shape="outline">Outline Button</Button>)
        const button = screen.getByRole('button', { name: 'Outline Button' })
        expect(button.className).toContain('bg-transparent')
    })

    it('renders with left icon', () => {
        const icon = <span data-testid="left-icon">Icon</span>
        render(<Button leftIcon={icon}>Button with icon</Button>)
        expect(screen.getByTestId('left-icon')).toBeDefined()
    })

    it('renders with right icon', () => {
        const icon = <span data-testid="right-icon">Icon</span>
        render(<Button rightIcon={icon}>Button with icon</Button>)
        expect(screen.getByTestId('right-icon')).toBeDefined()
    })

    it('applies fullWidth correctly', () => {
        render(<Button fullWidth>Full Width</Button>)
        const button = screen.getByRole('button', { name: 'Full Width' })
        expect(button.className).toContain('w-full')
    })
})
