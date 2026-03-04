// types/software-services.ts — Domain types for the Software Services page

// ============================================
// ProcessSection
// ============================================

export interface ProcessPhase {
    id: string
    title: string
    description: string
    illustration: string
    alurTitle: string
    alurSteps: string[]
    outputTitle: string
    outputItems: string[]
}

// ============================================
// ContactFlowSection
// ============================================

export interface ContactStep {
    id: string
    icon: string
    title: string
    description: string
}

// ============================================
// WhyChooseSection
// ============================================

export interface WhyChooseCard {
    title: string
    description: string
}

// ============================================
// AdvantagesSection
// ============================================

export interface Advantage {
    icon: string
    title: string
}
