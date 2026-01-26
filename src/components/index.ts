// ============================================
// ATOMS - Komponen terkecil dan paling dasar
// ============================================
export { Button } from './atoms/button'
export type { ButtonProps } from './atoms/button'

export { Tag } from './atoms/tag'
export type { TagProps } from './atoms/tag'

export { Typography } from './atoms/typography'
export type { TypographyProps } from './atoms/typography'

export { Image } from './atoms/image'
export type { ImageProps } from './atoms/image'

export { Icon } from './atoms/icon'
export type { IconProps } from './atoms/icon'

// ============================================
// MOLECULES - Kombinasi dari beberapa atoms
// ============================================
export { Card } from './molecules/card-services'
export type { CardProps } from './molecules/card-services'

export { CTA } from './molecules/cta'

export { MitraCard } from './molecules/mitra-card'
export type { MitraCardProps } from './molecules/mitra-card'

// ============================================
// ORGANISMS - Komponen kompleks (header, footer, sections)
// ============================================
export { Header } from './organisms/header'
export type { HeaderProps, MenuItem } from './organisms/header'

export { Footer } from './organisms/footer'
export type { FooterProps, FooterNavItem } from './organisms/footer'

export { MitraHero } from './organisms/mitra/MitraHero'
export { MitraSection } from './organisms/mitra/MitraSection'
export type { MitraSectionProps } from './organisms/mitra/MitraSection'

// Page Sections
export { default as HeroSection } from './organisms/landing/HeroSection'
export { default as ServicesSection } from './organisms/landing/ServicesSection'
export { default as ArticlesSection } from './organisms/landing/ArticlesSection'
export { default as TestimonialSection } from './organisms/landing/TestimonialSection'
export { default as WhyArutalaLabSection } from './organisms/landing/WhyArutalaLabSection'
export { default as MitrasSection } from './organisms/landing/MitrasSection'
export { default as ComingSoonLearningSection } from './organisms/landing/ComingSoonLearningSection'

// Kontak Components
export { ContactInfo, ContactForm } from './organisms/kontak'

// ============================================
// Re-export common types and utilities
// ============================================
export type { ComponentPropsWithoutRef, ElementRef } from 'react'
