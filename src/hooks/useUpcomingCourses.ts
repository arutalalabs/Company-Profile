
import { useState, useEffect } from 'react'
import { getUpcomingCourses, generateCourseSlug } from '@/lib/api/courses'
import type { UpcomingCourse } from '@/types/course'

interface UseUpcomingCoursesReturn {
    courses: UpcomingCourse[]
    loading: boolean
    error: string | null
}

export function useUpcomingCourses(): UseUpcomingCoursesReturn {
    const [courses, setCourses] = useState<UpcomingCourse[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchCourses() {
            try {
                setLoading(true)
                const response = await getUpcomingCourses()
                const coursesWithSlugs = response.data.map(course => ({
                    ...course,
                    slug: generateCourseSlug(course.course_title)
                }))
                setCourses(coursesWithSlugs)
                setError(null)
            } catch (err) {
                console.error('Error fetching upcoming courses', err)
                setError(err instanceof Error ? err.message : 'Gagal memuat data pelatihan')
            } finally {
                setLoading(false)
            }
        }
        fetchCourses()
    }, [])

    return { courses, loading, error }
}