import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { Tag } from '.'

describe('Tag', () => {
    it('renders with default props', () => {
        render(<Tag>Test Tag</Tag>)
        const tag = screen.getByText('Test Tag')
        expect(tag).toBeInTheDocument()
    })

    it('renders with different sizes', () => {
        const { rerender } = render(<Tag size="sm">Small Tag</Tag>)
        const parentElement = screen.getByText('Small Tag').parentElement
        expect(parentElement).toHaveClass('px-2', 'py-1', 'text-xs')

        rerender(<Tag size="md">Medium Tag</Tag>)
        const medParentElement = screen.getByText('Medium Tag').parentElement
        expect(medParentElement).toHaveClass('px-3', 'py-1.5', 'text-sm')

        rerender(<Tag size="lg">Large Tag</Tag>)
        const lgParentElement = screen.getByText('Large Tag').parentElement
        expect(lgParentElement).toHaveClass('px-4', 'py-2', 'text-base')
    })

    it('renders with different variants', () => {
        const { rerender } = render(<Tag variant="solid">Solid Tag</Tag>)
        const solidParent = screen.getByText('Solid Tag').parentElement
        expect(solidParent).toHaveClass('bg-[var(--color-gray-base)]')

        rerender(<Tag variant="outline">Outline Tag</Tag>)
        const outlineParent = screen.getByText('Outline Tag').parentElement
        expect(outlineParent).toHaveClass('border', 'bg-transparent')
    })

    it('renders with different colors', () => {
        const { rerender } = render(<Tag color="gray-base">Gray Tag</Tag>)
        const grayParent = screen.getByText('Gray Tag').parentElement
        expect(grayParent).toHaveClass('bg-[var(--color-gray-base)]')

        rerender(<Tag color="yellow-base">Yellow Tag</Tag>)
        const yellowParent = screen.getByText('Yellow Tag').parentElement
        expect(yellowParent).toHaveClass('bg-[var(--color-yellow-base)]')

        rerender(<Tag color="red-base">Red Tag</Tag>)
        const redParent = screen.getByText('Red Tag').parentElement
        expect(redParent).toHaveClass('bg-[var(--color-red-base)]')
    })

    it('renders with left icon', () => {
        const leftIcon = <span data-testid="left-icon">Icon</span>
        render(<Tag leftIcon={leftIcon}>Tag with Icon</Tag>)

        expect(screen.getByTestId('left-icon')).toBeInTheDocument()
        expect(screen.getByText('Tag with Icon')).toBeInTheDocument()
    })

    it('renders with right icon', () => {
        const rightIcon = <span data-testid="right-icon">Icon</span>
        render(<Tag rightIcon={rightIcon}>Tag with Icon</Tag>)

        expect(screen.getByTestId('right-icon')).toBeInTheDocument()
        expect(screen.getByText('Tag with Icon')).toBeInTheDocument()
    })

    it('renders as closable', () => {
        render(<Tag closable>Closable Tag</Tag>)

        const closeButton = screen.getByRole('button', { name: /remove tag/i })
        expect(closeButton).toBeInTheDocument()
    })

    it('calls onClose when close button is clicked', async () => {
        const user = userEvent.setup()
        const onClose = vi.fn()

        render(
            <Tag closable onClose={onClose}>
                Closable Tag
            </Tag>
        )

        const closeButton = screen.getByRole('button', { name: /remove tag/i })
        await user.click(closeButton)

        expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('does not render right icon when closable is true', () => {
        const rightIcon = <span data-testid="right-icon">Icon</span>
        render(
            <Tag rightIcon={rightIcon} closable>
                Tag
            </Tag>
        )

        expect(screen.queryByTestId('right-icon')).not.toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: /remove tag/i })
        ).toBeInTheDocument()
    })

    it('applies custom className', () => {
        render(<Tag className="custom-class">Test Tag</Tag>)
        const parentElement = screen.getByText('Test Tag').parentElement
        expect(parentElement).toHaveClass('custom-class')
    })

    it('forwards ref correctly', () => {
        const ref = vi.fn()
        render(<Tag ref={ref}>Test Tag</Tag>)
        expect(ref).toHaveBeenCalledWith(expect.any(HTMLSpanElement))
    })

    it('passes through other props', () => {
        render(
            <Tag data-testid="custom-tag" title="Custom Title">
                Test Tag
            </Tag>
        )
        const tag = screen.getByTestId('custom-tag')
        expect(tag).toHaveAttribute('title', 'Custom Title')
    })
})
