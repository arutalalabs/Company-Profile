import type { UpcomingCourse } from '@/types/course'

export function filterCoursesByCategory(
    courses: UpcomingCourse[],
    category: string
): UpcomingCourse[] {
    return courses.filter(
        (course) =>
            course.course_category_name?.toLowerCase() === category.toLowerCase()
    )
}

