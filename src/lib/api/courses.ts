import { apiGet } from './client'

// ============================================
// Types untuk Upcoming Course API
// ============================================

export interface NearestBatch {
    name: string
    posterUrl: string
    start_date: string
    registration_end: string
}

export interface UpcomingCourse {
    course_id: string
    course_title: string
    course_description: string
    course_category_name: string
    nearest_batch: NearestBatch
}

export interface UpcomingCoursesResponse {
    success: boolean
    message: string
    data: UpcomingCourse[]
}

// ============================================
// Types untuk Available Courses API
// ============================================

export interface Instructor {
    name: string
    jobTitle: string
    companyName: string
    profileUrl: string
}

// ============================================
// Mock Data untuk Local Testing
// ============================================

/**
 * Mock instructor data untuk testing dengan image lokal
 */
export function getMockInstructors(): Instructor[] {
    return [
        {
            name: 'Aldy Akbarrizky',
            jobTitle: 'Senior Software Developer',
            companyName: 'PT. Padepokan Tujuh Sembilan',
            profileUrl: '/src/mentor/Aldy-Akbarrizky-Senior-Software-Developer-PT.-Padepokan-Tujuh-Sembilan.webp'
        },
        {
            name: 'Annisa Tika',
            jobTitle: 'Head of Social Media',
            companyName: 'Finansialku',
            profileUrl: '/src/mentor/Annisa-Tika-Head-of-Social-Media-at-Finansialku.webp'
        },
        {
            name: 'Asri Maspupah',
            jobTitle: 'Dosen Teknik Informatika',
            companyName: 'Politeknik Negeri Bandung',
            profileUrl: '/src/mentor/Asri-Maspupah-Dosen-Teknik-Informatika-Politeknik-Negeri-Bandung.webp'
        },
        {
            name: 'Fakhrana Paramita',
            jobTitle: 'QA Analyst',
            companyName: 'Ruang Guru',
            profileUrl: '/src/mentor/Fakhrana-Paramita-QA-Analyst-Ruang-Guru.webp'
        },
        {
            name: 'Linda Damayanti',
            jobTitle: 'Senior Software Developer',
            companyName: 'PT. Padepokan Tujuh Sembilan',
            profileUrl: '/src/mentor/Linda-Damayanti-Senior-Software-Developer-PT.-Padepokan-Tujuh-Sembilan.webp'
        },
        {
            name: 'Milzam Zihni',
            jobTitle: 'Senior QA Engineer',
            companyName: 'Eigerindo',
            profileUrl: '/src/mentor/Milzam-Zihni-Senior-QA-Engineer-Eigerindo.webp'
        },
        {
            name: 'Okiviani Amanda Sastri',
            jobTitle: 'Scrum Master',
            companyName: 'PT Smartfren Telecom, Tbk',
            profileUrl: '/src/mentor/Okiviani-Amanda-Sastri-Scrum-Master-PT-Smartfren-Telecom-Tbk.webp'
        },
        {
            name: 'Rahil Jumiyani, M. Sc',
            jobTitle: 'Dosen Jurusan Teknik Komputer dan Informatika',
            companyName: 'POLBAN',
            profileUrl: '/src/mentor/Rahil-Jumiyani-M.-Sc-Dosen-Jurusan-Teknik-Komputer-dan-Informatika-POLBAN2.png'
        },
        {
            name: 'Roma Ulina P.',
            jobTitle: 'Automated Testing Expert',
            companyName: 'PT. Padepokan Tujuh Sembilan',
            profileUrl: '/src/mentor/Roma-Ulina-P.-Automated-Testing-Expert-PT.-Padepokan-Tujuh-Sembilan.webp'
        },
        {
            name: 'Satria Pinandita Abyatarsyah',
            jobTitle: 'FE Developer',
            companyName: 'PT. Padepokan Tujuh Sembilan',
            profileUrl: '/src/mentor/Satria-Pinandita-Abyatarsyah-FE-Developer-PT.-Padepokan-Tujuh-Sembilan3.png'
        },
        {
            name: 'Zahratul Mardiyah',
            jobTitle: 'Dept. Developer',
            companyName: 'TSR Group',
            profileUrl: '/src/mentor/Zahratul-Mardiyah-Dept.-Developer-TSR-Group.webp'
        }
    ]
}

export interface Prices {
    basePrice: number
    discountType: string | null
    discountValue: number | null
    finalPrice: number | null
}

export interface CourseBatch {
    name: string
    status: string
    posterUrl: string
    registration_start: string
    registration_end: string
    start_date: string
    end_date: string
    instructor: Instructor
    prices: Prices
}

export interface AvailableCourse {
    course_id: string
    course_title: string
    course_description: string
    course_category_name: string
    course_field_name: string
    course_batch: CourseBatch
}

export interface AvailableCoursesResponse {
    success: boolean
    message: string
    data: AvailableCourse[]
}

// ============================================
// Types untuk Course Detail API
// ============================================

export interface CourseMaterial {
    title: string
    description: string
}

export interface CourseBenefit {
    title: string
    description: string
}

export interface BatchSession {
    topic: string
    date: string
    startTime: string
    endTime: string
}

export interface CourseDetailBatch {
    name: string
    posterUrl: string
    registration_start: string
    registration_end: string
    start_date: string
    end_date: string
    instructor: Instructor
    prices: Prices
    sessions: BatchSession[]
}

export interface CourseDetail {
    course_id: string
    course_title: string
    course_description: string
    course_category_name: string
    course_field_name: string
    course_material: CourseMaterial[]
    course_benefit: CourseBenefit[]
    course_batch: CourseDetailBatch[]
}

export interface CourseDetailResponse {
    success: boolean
    message: string
    data: CourseDetail[]
}

// ============================================
// API Functions
// ============================================

/**
 * Fetch upcoming courses (pelatihan mendatang)
 * 
 * @example
 * ```ts
 * const response = await getUpcomingCourses()
 * console.log(response.data) // Array of upcoming courses
 * ```
 */
export async function getUpcomingCourses(): Promise<UpcomingCoursesResponse> {
    return apiGet<UpcomingCoursesResponse>('/courses/upcoming-course')
}

/**
 * Fetch all available courses
 * 
 * @example
 * ```ts
 * const response = await getAvailableCourses()
 * console.log(response.data) // Array of available courses
 * ```
 */
export async function getAvailableCourses(): Promise<AvailableCoursesResponse> {
    return apiGet<AvailableCoursesResponse>('/courses?available=true')
}

/**
 * Fetch course detail by ID
 * 
 * @param courseId - UUID of the course
 * @example
 * ```ts
 * const response = await getCourseById('5b3010a9-534e-45e0-b882-50aa853553ab')
 * console.log(response.data[0]) // Course detail
 * ```
 */
export async function getCourseById(courseId: string): Promise<CourseDetailResponse> {
    return apiGet<CourseDetailResponse>(`/courses/${courseId}`)
}

export async function getAllCourse(): Promise<CourseDetailResponse> {
    return apiGet<CourseDetailResponse>(`/courses/`)
}

/**
 * Fetch all instructors from courses
 * Extracts unique instructors from all course batches
 * 
 * @example
 * ```ts
 * const instructors = await getAllInstructors()
 * console.log(instructors) // Array of unique instructors
 * ```
 */
export async function getAllInstructors(): Promise<Instructor[]> {
    const response = await getAllCourse()
    
    // Extract all instructors from all course batches
    const instructors: Instructor[] = []
    const instructorSet = new Set<string>() // To track unique instructors by name
    
    response.data.forEach(course => {
        // Ensure course_batch is an array
        const batches = Array.isArray(course.course_batch) 
            ? course.course_batch 
            : [course.course_batch]
        
        batches.forEach(batch => {
            // Skip if batch or instructor is undefined
            if (!batch || !batch.instructor) return
            
            const instructorKey = `${batch.instructor.name}-${batch.instructor.companyName}`
            
            // Only add if not already in set (to avoid duplicates)
            if (!instructorSet.has(instructorKey)) {
                instructorSet.add(instructorKey)
                instructors.push(batch.instructor)
            }
        })
    })
    
    return instructors
}

/**
 * Get instructors dari data lokal untuk testing
 * Menggunakan image dari folder public/src/mentor
 * 
 * @example
 * ```ts
 * const instructors = await getLocalInstructors()
 * console.log(instructors) // Array of local instructors
 * ```
 */
export async function getLocalInstructors(): Promise<Instructor[]> {
    // Simulate async operation
    return Promise.resolve(getMockInstructors())
}

/**
 * Fetch course detail by slug
 * Slug is generated from course_title by converting to lowercase and replacing spaces with dashes
 * 
 * @param slug - URL-friendly slug of the course
 * @example
 * ```ts
 * const response = await getCourseBySlug('pengetahuan-dasar-pengembangan-aplikasi-ai')
 * console.log(response.data[0]) // Course detail
 * ```
 */
export async function getCourseBySlug(slug: string): Promise<CourseDetailResponse> {
    // First get all courses, then filter by slug
    const allCourses = await getAllCourse()
    
    // Find the course that matches the slug
    const matchedCourse = allCourses.data.find(course => {
        const courseSlug = course.course_title
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .replace(/\s+/g, '-')
        return courseSlug === slug
    })
    
    if (!matchedCourse) {
        return {
            success: false,
            message: 'Course not found',
            data: []
        }
    }
    
    return {
        success: true,
        message: 'Course found',
        data: [matchedCourse]
    }
}

/**
 * Generate slug from course title
 * @param title - Course title
 * @returns URL-friendly slug
 */
export function generateCourseSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
}
