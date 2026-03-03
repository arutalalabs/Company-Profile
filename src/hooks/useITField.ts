import { useState } from 'react'

export interface UseITFieldReturn {
    activeField: string | null
    toggleField: (id: string) => void
    handleMouseEnter: (id: string) => void
    handleMouseLeave: () => void
}

export function useITField(): UseITFieldReturn {
    const [activeField, setActiveField] = useState<string | null>(null)

    const toggleField = (id: string) => {
        setActiveField((prev) => (prev === id ? null : id))
    }

    const handleMouseEnter = (id: string) => {
        setActiveField(id)
    }

    const handleMouseLeave = () => {
        setActiveField(null)
    }

    return { activeField, toggleField, handleMouseEnter, handleMouseLeave }
}
