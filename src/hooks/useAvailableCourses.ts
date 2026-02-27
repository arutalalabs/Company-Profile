import { useState, useEffect } from 'react'
import { getAvailableCourses } from '@/lib/api/courses'
import type { AvailableCourse } from '@/types/course'

export interface UseAvailableCoursesReturn {
    courses: AvailableCourse[]
    loading: boolean
    error: string | null
}

export function useAvailableCourses(): UseAvailableCoursesReturn {
    const [courses, setCourses] = useState<AvailableCourse[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchCourses() {
            try {
                setLoading(true)
                const response = await getAvailableCourses()
                if (response.success) {
                    // Sort by registration end date ascending (most urgent first)
                    const sortedCourses = response.data.sort((a, b) => {
                        const batchA = Array.isArray(a.course_batch) ? a.course_batch[0] : a.course_batch
                        const batchB = Array.isArray(b.course_batch) ? b.course_batch[0] : b.course_batch

                        const dateA = batchA?.registration_end
                            ? new Date(batchA.registration_end).getTime()
                            : batchA?.start_date
                              ? new Date(batchA.start_date).getTime()
                              : Infinity
                        const dateB = batchB?.registration_end
                            ? new Date(batchB.registration_end).getTime()
                            : batchB?.start_date
                              ? new Date(batchB.start_date).getTime()
                              : Infinity

                        return dateA - dateB
                    })
                    setCourses(sortedCourses)
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

    return { courses, loading, error }
}
