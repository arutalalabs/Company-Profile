import { useState } from 'react'

export interface UseProcessSectionReturn {
    activePhase: string | null
    togglePhase: (id: string) => void
}

export function useProcessSection(): UseProcessSectionReturn {
    const [activePhase, setActivePhase] = useState<string | null>(null)

    const togglePhase = (id: string) => {
        setActivePhase((prev) => (prev === id ? null : id))
    }

    return { activePhase, togglePhase }
}
