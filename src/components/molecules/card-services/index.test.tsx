import { render, screen, fireEvent } from '@testing-library/react'
import { Card } from './index'

describe('Card', () => {
    // Basic rendering tests
    it('renders card with title and description', () => {
        render(
            <Card title="Test Service" description="Test service description" />
        )

        expect(screen.getByText('Test Service')).toBeInTheDocument()
        expect(screen.getByText('Test service description')).toBeInTheDocument()
    })

    // Button tests
    it('renders button with default text when onButtonClick is provided', () => {
        const mockClick = jest.fn()
        render(
            <Card
                title="Service Card"
                description="Service description"
                onButtonClick={mockClick}
            />
        )

        const button = screen.getByText('Learn More')
        expect(button).toBeInTheDocument()

        fireEvent.click(button)
        expect(mockClick).toHaveBeenCalledTimes(1)
    })

    it('renders button with custom text', () => {
        const mockClick = jest.fn()
        render(
            <Card
                title="Service Card"
                description="Service description"
                buttonText="Get Started"
                onButtonClick={mockClick}
            />
        )

        const button = screen.getByText('Get Started')
        expect(button).toBeInTheDocument()

        fireEvent.click(button)
        expect(mockClick).toHaveBeenCalledTimes(1)
    })

    it('does not render button when onButtonClick is not provided', () => {
        render(<Card title="Service Card" description="Service description" />)

        expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    // Size tests
    it('applies correct size classes', () => {
        const { container: smallContainer } = render(
            <Card size="sm" title="Small Card" description="Description" />
        )
        const { container: mediumContainer } = render(
            <Card size="md" title="Medium Card" description="Description" />
        )
        const { container: largeContainer } = render(
            <Card size="lg" title="Large Card" description="Description" />
        )

        expect(smallContainer.firstChild).toHaveClass('max-w-[300px]')
        expect(mediumContainer.firstChild).toHaveClass('max-w-[340px]')
        expect(largeContainer.firstChild).toHaveClass('max-w-[380px]')
    })

    it('uses medium size as default', () => {
        const { container } = render(
            <Card title="Default Card" description="Description" />
        )

        expect(container.firstChild).toHaveClass('max-w-[340px]')
    })

    // Image tests
    it('renders image when provided', () => {
        render(
            <Card
                title="Card with Image"
                description="Description"
                image={{
                    src: '/test-image.jpg',
                    alt: 'Test image'
                }}
            />
        )

        const image = screen.getByAltText('Test image')
        expect(image).toBeInTheDocument()
        expect(image).toHaveAttribute('src', '/test-image.jpg')
    })

    it('does not render image section when image is not provided', () => {
        render(<Card title="Card without Image" description="Description" />)

        expect(screen.queryByRole('img')).not.toBeInTheDocument()
    })

    // Layout and styling tests
    it('applies base card styles', () => {
        const { container } = render(
            <Card title="Styled Card" description="Description" />
        )

        const card = container.firstChild
        expect(card).toHaveClass('bg-white')
        expect(card).toHaveClass('rounded-2xl')
        expect(card).toHaveClass('shadow-sm')
        expect(card).toHaveClass('border')
        expect(card).toHaveClass('flex-col')
    })

    it('applies hover animations', () => {
        const { container } = render(
            <Card title="Animated Card" description="Description" />
        )

        const card = container.firstChild
        expect(card).toHaveClass('hover:shadow-lg')
        expect(card).toHaveClass('hover:-translate-y-1')
        expect(card).toHaveClass('transition-all')
    })

    // Accessibility tests
    it('has proper heading structure', () => {
        render(
            <Card
                title="Accessible Card"
                description="Accessible description"
            />
        )

        const heading = screen.getByRole('heading', { level: 3 })
        expect(heading).toBeInTheDocument()
        expect(heading).toHaveTextContent('Accessible Card')
    })

    it('button has proper type attribute', () => {
        render(
            <Card
                title="Card with Button"
                description="Description"
                onButtonClick={jest.fn()}
            />
        )

        const button = screen.getByRole('button')
        expect(button).toHaveAttribute('type', 'button')
    })

    // Content structure tests
    it('applies line-clamp to title and description', () => {
        render(
            <Card
                title="Very Long Title That Should Be Clamped To Two Lines Maximum"
                description="Very long description that should be clamped to three lines maximum to maintain consistent card heights and improve readability"
            />
        )

        const title = screen.getByRole('heading')
        const description = screen.getByText(/Very long description/)

        expect(title).toHaveClass('line-clamp-2')
        expect(description).toHaveClass('line-clamp-3')
    })

    // Props forwarding tests
    it('forwards additional props to the container', () => {
        render(
            <Card
                title="Card with Props"
                description="Description"
                data-testid="custom-card"
                aria-label="Custom card"
            />
        )

        const card = screen.getByTestId('custom-card')
        expect(card).toHaveAttribute('aria-label', 'Custom card')
    })

    it('applies custom className', () => {
        const { container } = render(
            <Card
                title="Custom Class Card"
                description="Description"
                className="custom-card-class"
            />
        )

        expect(container.firstChild).toHaveClass('custom-card-class')
    })

    // Edge cases
    it('handles missing required props gracefully', () => {
        // This would be a TypeScript error in real usage, but testing runtime behavior
        expect(() => {
            render(<Card title="" description="" />)
        }).not.toThrow()
    })

    it('handles very long content', () => {
        const longTitle = 'A'.repeat(200)
        const longDescription = 'B'.repeat(1000)

        render(<Card title={longTitle} description={longDescription} />)

        expect(screen.getByText(longTitle)).toBeInTheDocument()
        expect(screen.getByText(longDescription)).toBeInTheDocument()
    })
})
