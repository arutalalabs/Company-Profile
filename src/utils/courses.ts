import type { UpcomingCourse, CourseDetail } from '@/types/course'

export function filterCoursesByCategory(
    courses: UpcomingCourse[],
    category: string
): UpcomingCourse[] {
    return courses.filter(
        (course) =>
            course.course_category_name?.toLowerCase() === category.toLowerCase()
    )
}

/**
 * Status priority for sorting: OPEN → SCHEDULED → ON_GOING → COMPLETED → unknown
 */
export const COURSE_STATUS_PRIORITY: Record<string, number> = {
    OPEN: 1,
    SCHEDULED: 2,
    ON_GOING: 3,
    COMPLETED: 4,
}

/**
 * Sort courses by batch status priority, then by nearest registration_end within the same status.
 */
export function sortCoursesByStatus(courses: CourseDetail[]): CourseDetail[] {
    return [...courses].sort((a, b) => {
        const batchA = Array.isArray(a.course_batch) ? a.course_batch[0] : a.course_batch
        const batchB = Array.isArray(b.course_batch) ? b.course_batch[0] : b.course_batch

        const statusA = (batchA as any)?.status as string | undefined
        const statusB = (batchB as any)?.status as string | undefined

        const priA = COURSE_STATUS_PRIORITY[statusA ?? ''] ?? 5
        const priB = COURSE_STATUS_PRIORITY[statusB ?? ''] ?? 5
        if (priA !== priB) return priA - priB

        // Same status: sort by nearest registration_end
        const regEndA = (batchA as any)?.registration_end
            ? new Date((batchA as any).registration_end).getTime()
            : Infinity
        const regEndB = (batchB as any)?.registration_end
            ? new Date((batchB as any).registration_end).getTime()
            : Infinity
        return regEndA - regEndB
    })
}

