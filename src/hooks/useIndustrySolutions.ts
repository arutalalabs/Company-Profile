import { useState } from 'react'
import type { ServiceTab } from '@/types/profile'

export interface UseIndustrySolutionsReturn {
    activeTab: string
    setActiveTab: (id: string) => void
    isDropdownOpen: boolean
    setIsDropdownOpen: (open: boolean) => void
    currentTab: ServiceTab
}

export function useIndustrySolutions(tabs: ServiceTab[]): UseIndustrySolutionsReturn {
    const [activeTab, setActiveTab] = useState(tabs[0].id)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const currentTab = tabs.find((tab) => tab.id === activeTab) ?? tabs[0]

    return { activeTab, setActiveTab, isDropdownOpen, setIsDropdownOpen, currentTab }
}
