import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Image } from '.'

describe('ui/image', () => {
    it('renders with src and alt', () => {
        render(<Image src="/test.jpg" alt="Test image" />)
        const image = screen.getByAltText('Test image')
        expect(image).toBeDefined()
        expect(image.getAttribute('src')).toBe('/test.jpg')
    })

    it('applies default props correctly', () => {
        render(<Image src="/test.jpg" alt="Test" />)
        const container = screen.getByAltText('Test').parentElement
        expect(container?.className).toContain('w-16 h-16') // base size
        expect(container?.className).toContain('rounded-none') // square shape
    })

    it('applies size styles correctly', () => {
        render(<Image src="/test.jpg" alt="Large image" size="lg" />)
        const container = screen.getByAltText('Large image').parentElement
        expect(container?.className).toContain('w-24 h-24')
    })

    it('applies shape styles correctly', () => {
        render(<Image src="/test.jpg" alt="Circle image" shape="circle" />)
        const container = screen.getByAltText('Circle image').parentElement
        expect(container?.className).toContain('rounded-full')
    })

    it('applies aspect ratio styles correctly', () => {
        render(
            <Image src="/test.jpg" alt="Square aspect" aspectRatio="square" />
        )
        const container = screen.getByAltText('Square aspect').parentElement
        expect(container?.className).toContain('aspect-square')
    })

    it('applies object fit styles correctly', () => {
        render(<Image src="/test.jpg" alt="Contain fit" fit="contain" />)
        const image = screen.getByAltText('Contain fit')
        expect(image.className).toContain('object-contain')
    })

    it('applies full width correctly', () => {
        render(<Image src="/test.jpg" alt="Full width" fullWidth />)
        const container = screen.getByAltText('Full width').parentElement
        expect(container?.className).toContain('w-full')
    })

    it('shows placeholder when loading', () => {
        render(
            <Image
                src="/test.jpg"
                alt="Loading image"
                placeholder="Loading..."
            />
        )
        expect(screen.getByText('Loading...')).toBeDefined()
    })

    it('applies custom className', () => {
        render(<Image src="/test.jpg" alt="Custom" className="custom-class" />)
        const container = screen.getByAltText('Custom').parentElement
        expect(container?.className).toContain('custom-class')
    })

    it('handles loading attribute', () => {
        render(<Image src="/test.jpg" alt="Eager loading" loading="eager" />)
        const image = screen.getByAltText('Eager loading')
        expect(image.getAttribute('loading')).toBe('eager')
    })

    it('shows error state on image load failure', async () => {
        render(<Image src="/invalid.jpg" alt="Broken image" />)
        const image = screen.getByAltText('Broken image')

        // Simulate image load error
        fireEvent.error(image)

        // Should show error icon
        await waitFor(() => {
            const errorIcon = screen.getByRole('img', { hidden: true })
            expect(errorIcon).toBeDefined()
        })
    })

    it('shows custom fallback on error', async () => {
        const customFallback = <div>Custom Error</div>
        render(
            <Image
                src="/invalid.jpg"
                alt="Broken image"
                fallback={customFallback}
            />
        )
        const image = screen.getByAltText('Broken image')

        // Simulate image load error
        fireEvent.error(image)

        await waitFor(() => {
            expect(screen.getByText('Custom Error')).toBeDefined()
        })
    })

    it('calls onError handler when image fails', () => {
        const handleError = vi.fn()
        render(
            <Image src="/invalid.jpg" alt="Error test" onError={handleError} />
        )
        const image = screen.getByAltText('Error test')

        fireEvent.error(image)
        expect(handleError).toHaveBeenCalledTimes(1)
    })

    it('combines multiple style props correctly', () => {
        render(
            <Image
                src="/test.jpg"
                alt="Combined styles"
                size="xl"
                shape="rounded"
                aspectRatio="video"
                fit="cover"
                fullWidth
            />
        )
        const container = screen.getByAltText('Combined styles').parentElement
        const image = screen.getByAltText('Combined styles')

        expect(container?.className).toContain('w-full')
        expect(container?.className).toContain('rounded-lg')
        expect(container?.className).toContain('aspect-video')
        expect(image.className).toContain('object-cover')
    })

    it('renders all size variants correctly', () => {
        const sizes = ['xs', 'sm', 'base', 'md', 'lg', 'xl', '2xl', '3xl']
        const expectedClasses = [
            'w-8',
            'w-12',
            'w-16',
            'w-20',
            'w-24',
            'w-32',
            'w-40',
            'w-48'
        ]

        sizes.forEach((size, index) => {
            const { unmount } = render(
                <Image
                    src="/test.jpg"
                    alt={`${size} image`}
                    size={size as any}
                />
            )
            const container = screen.getByAltText(`${size} image`).parentElement
            expect(container?.className).toContain(expectedClasses[index])
            unmount()
        })
    })

    it('renders all shape variants correctly', () => {
        const shapes = ['none', 'square', 'rounded', 'circle']
        const expectedClasses = [
            '',
            'rounded-none',
            'rounded-lg',
            'rounded-full'
        ]

        shapes.forEach((shape, index) => {
            const { unmount } = render(
                <Image
                    src="/test.jpg"
                    alt={`${shape} shape`}
                    shape={shape as any}
                />
            )
            const container = screen.getByAltText(
                `${shape} shape`
            ).parentElement
            if (expectedClasses[index]) {
                expect(container?.className).toContain(expectedClasses[index])
            }
            unmount()
        })
    })

    it('renders all aspect ratio variants correctly', () => {
        const ratios = [
            'auto',
            'square',
            'video',
            'portrait',
            'landscape',
            'wide'
        ]
        const expectedClasses = [
            '',
            'aspect-square',
            'aspect-video',
            'aspect-[3/4]',
            'aspect-[4/3]',
            'aspect-[21/9]'
        ]

        ratios.forEach((ratio, index) => {
            const { unmount } = render(
                <Image
                    src="/test.jpg"
                    alt={`${ratio} ratio`}
                    aspectRatio={ratio as any}
                />
            )
            const container = screen.getByAltText(
                `${ratio} ratio`
            ).parentElement
            if (expectedClasses[index]) {
                expect(container?.className).toContain(expectedClasses[index])
            }
            unmount()
        })
    })
})
