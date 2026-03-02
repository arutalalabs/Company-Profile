import { useState, useEffect } from 'react'
import { getAllCourse } from '@/lib/api/courses'
import type { CourseDetail } from '@/types/course'
import { sortCoursesByStatus } from '@/utils/courses'

export interface UseAllCoursesReturn {
    courses: CourseDetail[]
    loading: boolean
    error: string | null
    filter: string
    setFilter: (filter: string) => void
    categories: string[]
    filteredCourses: CourseDetail[]
}

export function useAllCourses(): UseAllCoursesReturn {
    const [courses, setCourses] = useState<CourseDetail[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [filter, setFilter] = useState<string>('all')
    const [categories, setCategories] = useState<string[]>([])

    useEffect(() => {
        async function fetchCourses() {
            try {
                setLoading(true)
                const response = await getAllCourse()
                if (response.success) {
                    const sortedCourses = sortCoursesByStatus(response.data)
                    setCourses(sortedCourses)
                    const uniqueCategories = [
                        ...new Set(sortedCourses.map((c) => c.course_category_name)),
                    ]
                    setCategories(uniqueCategories)
                } else {
                    setError(response.message || 'Failed to fetch courses')
                }
            } catch (err) {
                setError('Error fetching courses')
                console.error('Error fetching courses:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchCourses()
    }, [])

    const filteredCourses =
        filter === 'all'
            ? courses
            : courses.filter((course) => course.course_category_name === filter)

    return { courses, loading, error, filter, setFilter, categories, filteredCourses }
}
