'use client'
import '@/styles/global.css'
import { Typography } from '../../atoms/typography'
import { Button } from '../../atoms/button'
import { Icon } from '../../atoms/icon'
import { Image } from '../../atoms/image'
import { clsx } from 'clsx'
import { forwardRef } from 'react'

export interface FooterNavItem {
    label: string
    href: string
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
    logo: {
        src: string
        alt: string
        href?: string
    }
    layananItems: FooterNavItem[]
    lainnyaItems: FooterNavItem[]
    socialIcons?: {
        icon: string | React.ReactNode
        href?: string
        alt?: string
    }[]
}

export const Footer = forwardRef<HTMLElement, FooterProps>(
    (
        {
            logo,
            layananItems,
            lainnyaItems,
            socialIcons = [
                { icon: '', alt: 'Instagram' },
                { icon: '', alt: 'Twitter' },
                { icon: '', alt: 'LinkedIn' }
            ],
            className,
            ...props
        },
        ref
    ) => {
        return (
            <footer
                ref={ref}
                className={clsx(
                    'w-full bg-[var(--color-primary-900)] text-[var(--color-neutral-50)]',
                    className
                )}
                {...props}
            >
                <div className="max-w-xs md:max-w-2xl lg:max-w-5xl 2xl:max-w-7xl mx-auto py-8">
                    {/* Header Section with Logo and Social Icons */}
                    <div className="flex items-center justify-between mb-2 mt-6">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            {logo.href ? (
                                <a href={logo.href} className="">
                                    <Image
                                        src={logo.src}
                                        alt={logo.alt}
                                        size="sm"
                                        shape="square"
                                        fit="cover"
                                        className="cursor-pointer"
                                    />
                                </a>
                            ) : (
                                <Image
                                    src={logo.src}
                                    alt={logo.alt}
                                    size="sm"
                                    shape="square"
                                    fit="cover"
                                />
                            )}
                        </div>

                        {/* Social Icons */}
                        <div className="flex items-center gap-4">
                            {socialIcons.map((social, index) => (
                                <div key={index}>
                                    {social.href ? (
                                        <a
                                            href={social.href}
                                            className="text-[var(--color-neutral-50)] hover:text-[var(--color-accent-600)] transition-colors duration-200"
                                        >
                                            <Icon
                                                icon=""
                                                type="image"
                                                src={typeof social.icon === 'string' ? social.icon : ''}
                                                size="lg"
                                                color="current"
                                                alt={social.alt}
                                                interactive
                                                hover="scale"
                                            />
                                        </a>
                                    ) : (
                                        <Icon
                                            icon=""
                                            type="image"
                                            src={typeof social.icon === 'string' ? social.icon : ''}
                                            size="lg"
                                            color="current"
                                            alt={social.alt}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Divider Line */}
                    <div className="w-full size-0.5 bg-[var(--color-accent-600)] mt-8 mb-8"></div>

                    {/* Navigation Sections */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        {/* Layanan Section */}
                        <div>
                            <Typography
                                as="h3"
                                size="base"
                                weight="normal"
                                color="neutral-50"
                                className="mb-4 md:text-lg"
                            >
                                Layanan
                            </Typography>
                            <div className="flex flex-col gap-2">
                                {layananItems.map((item, index) => (
                                    <Button
                                        key={index}
                                        shape="link"
                                        color="neutral-50"
                                        size="sm"
                                        className="justify-start text-left transition-colors duration-200 text-sm md:text-md"
                                        onClick={() =>
                                            item.href &&
                                            (window.location.href = item.href)
                                        }
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Lainnya Section */}
                        <div>
                            <Typography
                                as="h3"
                                size="base"
                                weight="normal"
                                color="neutral-50"
                                className="mb-4 md:text-lg"
                            >
                                Lainnya
                            </Typography>
                            <div className="flex flex-col gap-2">
                                {lainnyaItems.map((item, index) => (
                                    <Button
                                        key={index}
                                        shape="link"
                                        color="neutral-50"
                                        size="sm"
                                        className="justify-start text-left transition-colors duration-200 text-sm md:text-md"
                                        onClick={() =>
                                            item.href &&
                                            (window.location.href = item.href)
                                        }
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </div>
                        </div>
                        {/* Copyright Section */}
                        <div className="flex justify-center md:justify-end items-center md:items-end ">
                            <Typography
                                as="p"
                                size="sm"
                                color="neutral-50"
                                align="center"
                                weight="light"
                                
                            >
                                © Arutala Mitra Mandiri 2026 | All Rights Reserved
                            </Typography>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
)

Footer.displayName = 'Footer'
