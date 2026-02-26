import { useState, useMemo } from 'react'
import type { UpcomingCourse } from '@/types/course'
import { COURSE_CATEGORIES } from '@/constants/landing'

export interface UseCourseSelectionReturn {
    categories: typeof COURSE_CATEGORIES
    selectedIndex: number
    selectedCategory: string
    currentCourse: UpcomingCourse | null
    isDropdownOpen: boolean
    setSelectedIndex: (index: number) => void
    setIsDropdownOpen: (open: boolean) => void
}

export function useCourseSelection(courses: UpcomingCourse[]): UseCourseSelectionReturn {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const selectedCategory = COURSE_CATEGORIES[selectedIndex]

    const currentCourse = useMemo(() => {
        if (!courses || courses.length === 0) return null
        return (
            courses.find(
                (c) => c.course_category_name === selectedCategory
            ) ?? null
        )
    }, [courses, selectedCategory])

    return {
        categories: COURSE_CATEGORIES,
        selectedIndex,
        selectedCategory,
        currentCourse,
        isDropdownOpen,
        setSelectedIndex,
        setIsDropdownOpen,
    }
}
