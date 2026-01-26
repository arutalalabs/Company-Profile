import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Icon } from './index'

// Mock CSS imports
vi.mock('../global.css', () => ({}))

describe('Icon', () => {
    describe('Rendering', () => {
        it('renders without crashing', () => {
            render(
                <Icon
                    icon="M12 2l3 6 6 1-5 5 1 7-6-3-6 3 1-7-5-5 6-1z"
                    alt="star"
                />
            )
            expect(screen.getByRole('img')).toBeInTheDocument()
        })

        it('renders with default props', () => {
            render(<Icon icon="test-path" alt="test icon" />)
            const icon = screen.getByRole('img')
            expect(icon).toHaveAttribute('aria-label', 'test icon')
            expect(icon).toHaveClass('w-6', 'h-6') // default md size
        })

        it('renders without alt text when alt prop is not provided', () => {
            render(<Icon icon="test-path" />)
            const svg = document.querySelector('svg')
            expect(svg).toBeInTheDocument()
            expect(svg).not.toHaveAttribute('aria-label')
            expect(svg).not.toHaveAttribute('role')
        })
    })

    describe('Size Variants', () => {
        const sizes = [
            { size: 'xs' as const, classes: ['w-3', 'h-3'] },
            { size: 'sm' as const, classes: ['w-4', 'h-4'] },
            { size: 'md' as const, classes: ['w-6', 'h-6'] },
            { size: 'lg' as const, classes: ['w-8', 'h-8'] },
            { size: 'xl' as const, classes: ['w-10', 'h-10'] },
            { size: '2xl' as const, classes: ['w-12', 'h-12'] }
        ]

        sizes.forEach(({ size, classes }) => {
            it(`renders ${size} size correctly`, () => {
                render(<Icon icon="test-path" size={size} alt="test" />)
                const icon = screen.getByRole('img')
                classes.forEach((cls) => {
                    expect(icon).toHaveClass(cls)
                })
            })
        })
    })

    describe('Color Variants', () => {
        const colors = [
            'current',
            'neutral-400',
            'neutral-600',
            'neutral-900',
            'primary-600',
            'accent-600',
            'red-base',
            'green-base',
            'blue-base'
        ] as const

        colors.forEach((color) => {
            it(`renders ${color} color correctly`, () => {
                render(<Icon icon="test-path" color={color} alt="test" />)
                const icon = screen.getByRole('img')

                if (color === 'current') {
                    expect(icon).toHaveClass('text-current')
                } else {
                    expect(icon).toHaveClass(`text-[var(--color-${color})]`)
                }
            })
        })
    })

    describe('Icon Types', () => {
        it('renders SVG path string correctly', () => {
            const path = 'M12 2l3 6 6 1-5 5 1 7-6-3-6 3 1-7-5-5 6-1z'
            render(<Icon icon={path} alt="star" />)

            const svg = screen.getByRole('img')
            expect(svg.tagName).toBe('svg')
            expect(svg).toHaveAttribute('viewBox', '0 0 24 24')

            const pathElement = svg.querySelector('path')
            expect(pathElement).toHaveAttribute('d', path)
        })

        it('renders stroke-based SVG paths correctly', () => {
            const strokePath = 'M20 6L9 17l-5-5' // Contains M and L commands
            render(<Icon icon={strokePath} alt="check" />)

            const svg = screen.getByRole('img')
            expect(svg).toHaveAttribute('fill', 'none')
            expect(svg).toHaveAttribute('stroke', 'currentColor')
            expect(svg).toHaveAttribute('stroke-width', '2')
        })

        it('renders fill-based SVG paths correctly', () => {
            const fillPath = 'C1 1 1 1 1 1' // No M or L commands
            render(<Icon icon={fillPath} alt="fill icon" />)

            const svg = screen.getByRole('img')
            expect(svg).toHaveAttribute('fill', 'currentColor')
            expect(svg).toHaveAttribute('stroke', 'none')
        })

        it('renders React element icon correctly', () => {
            const reactIcon = <circle cx="12" cy="12" r="10" />
            render(<Icon icon={reactIcon} alt="circle" />)

            const svg = screen.getByRole('img')
            expect(svg.tagName).toBe('svg')
            expect(svg.querySelector('circle')).toBeInTheDocument()
        })

        it('renders font icon correctly', () => {
            render(<Icon icon="home" type="font" alt="home" />)

            const icon = screen.getByRole('img')
            expect(icon.tagName).toBe('I')
            expect(icon).toHaveClass('icon-home')
        })

        it('renders image icon correctly', () => {
            render(
                <Icon
                    icon="test"
                    type="image"
                    src="/test.png"
                    alt="test image"
                />
            )

            const img = screen.getByRole('img')
            expect(img.tagName).toBe('IMG')
            expect(img).toHaveAttribute('src', '/test.png')
            expect(img).toHaveAttribute('alt', 'test image')
        })

        it('returns null for invalid icon', () => {
            const { container } = render(<Icon icon={null as any} />)
            expect(container.firstChild).toBeNull()
        })
    })

    describe('Hover Effects', () => {
        const hoverEffects = [
            { hover: 'none' as const, expectedClass: '' },
            { hover: 'scale' as const, expectedClass: 'hover:scale-110' },
            { hover: 'rotate' as const, expectedClass: 'hover:rotate-12' },
            { hover: 'bounce' as const, expectedClass: 'hover:animate-bounce' }
        ]

        hoverEffects.forEach(({ hover, expectedClass }) => {
            it(`applies ${hover} hover effect correctly`, () => {
                render(<Icon icon="test-path" hover={hover} alt="test" />)
                const icon = screen.getByRole('img')

                if (expectedClass) {
                    expect(icon).toHaveClass(expectedClass)
                }

                if (hover === 'scale' || hover === 'rotate') {
                    expect(icon).toHaveClass(
                        'transition-transform',
                        'duration-200'
                    )
                }
            })
        })
    })

    describe('Interactive Behavior', () => {
        it('applies interactive styles when interactive is true', () => {
            render(<Icon icon="test-path" interactive alt="interactive icon" />)
            const icon = screen.getByRole('img')

            expect(icon).toHaveClass('cursor-pointer')
            expect(icon).toHaveClass('focus:outline-none')
            expect(icon).toHaveClass('focus:ring-2')
            expect(icon).toHaveClass('focus:ring-offset-1')
        })

        it('does not apply interactive styles when interactive is false', () => {
            render(
                <Icon
                    icon="test-path"
                    interactive={false}
                    alt="non-interactive icon"
                />
            )
            const icon = screen.getByRole('img')

            expect(icon).not.toHaveClass('cursor-pointer')
        })

        it('handles click events when interactive', async () => {
            const handleClick = vi.fn()
            const user = userEvent.setup()

            render(
                <Icon
                    icon="test-path"
                    interactive
                    onClick={handleClick}
                    alt="clickable icon"
                />
            )

            const icon = screen.getByRole('img')
            await user.click(icon)

            expect(handleClick).toHaveBeenCalledTimes(1)
        })
    })

    describe('Accessibility', () => {
        it('has proper ARIA attributes with alt text', () => {
            render(<Icon icon="test-path" alt="home icon" />)
            const icon = screen.getByRole('img')

            expect(icon).toHaveAttribute('aria-label', 'home icon')
            expect(icon).toHaveAttribute('role', 'img')
        })

        it('has proper ARIA attributes without alt text', () => {
            render(<Icon icon="test-path" />)
            const svg = document.querySelector('svg')

            expect(svg).not.toHaveAttribute('aria-label')
            expect(svg).not.toHaveAttribute('role')
        })

        it('is focusable when interactive', () => {
            render(<Icon icon="test-path" interactive alt="focusable icon" />)
            const icon = screen.getByRole('img')

            expect(icon).toHaveClass('focus:outline-none')
            expect(icon).toHaveClass('focus:ring-2')
        })
    })

    describe('Custom Props', () => {
        it('forwards custom className', () => {
            render(
                <Icon icon="test-path" className="custom-class" alt="test" />
            )
            const icon = screen.getByRole('img')

            expect(icon).toHaveClass('custom-class')
        })

        it('forwards other HTML attributes', () => {
            render(
                <Icon
                    icon="test-path"
                    data-testid="custom-icon"
                    title="Custom title"
                    alt="test"
                />
            )
            const icon = screen.getByRole('img')

            expect(icon).toHaveAttribute('data-testid', 'custom-icon')
            expect(icon).toHaveAttribute('title', 'Custom title')
        })

        it('combines custom styles with default styles', () => {
            render(
                <Icon
                    icon="test-path"
                    size="lg"
                    color="primary-600"
                    hover="scale"
                    className="custom-margin"
                    alt="combined styles"
                />
            )
            const icon = screen.getByRole('img')

            // Default size styles
            expect(icon).toHaveClass('w-8', 'h-8')
            // Default color styles
            expect(icon).toHaveClass('text-[var(--color-primary-600)]')
            // Default hover styles
            expect(icon).toHaveClass('hover:scale-110')
            // Custom styles
            expect(icon).toHaveClass('custom-margin')
        })
    })

    describe('Ref Forwarding', () => {
        it('forwards ref to SVG element', () => {
            const ref = { current: null }
            render(<Icon ref={ref} icon="test-path" alt="ref test" />)

            expect(ref.current).toBeInstanceOf(SVGSVGElement)
        })

        it('forwards ref to image element', () => {
            const ref = { current: null }
            render(
                <Icon
                    ref={ref}
                    icon="test"
                    type="image"
                    src="/test.png"
                    alt="img ref test"
                />
            )

            expect(ref.current).toBeInstanceOf(HTMLImageElement)
        })

        it('forwards ref to font icon element', () => {
            const ref = { current: null }
            render(
                <Icon ref={ref} icon="home" type="font" alt="font ref test" />
            )

            expect(ref.current).toBeInstanceOf(HTMLElement)
        })
    })
})
