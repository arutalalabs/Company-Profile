'use client'
import { useRouter } from 'next/navigation';
import { Button, Typography } from '@/components';
import { generateCourseSlug } from '@/lib/api/courses';
import { ROUTES } from '@/constants/routes';
import { formatDateIndonesia } from '@/utils/date';
import { formatPriceIDR } from '@/utils/format';
import { useAvailableCourses } from '@/hooks/useAvailableCourses';
import { useBreakpointCount } from '@/hooks/useBreakpointCount';


export default function AvailableCourseSection() {
    const router = useRouter()
    const handleContactClick = () => {
        router.push(ROUTES.COURSES)
    }

    const { courses, loading, error } = useAvailableCourses()
    const visibleCount = useBreakpointCount({ default: 1, sm: 2, lg: 2, '2xl': 3 })

    if (loading) {
        return (
            <section className="py-20 bg-white">
                <div className="mx-auto max-w-xs sm:max-w-md md:max-w-xl lg:max-w-5xl 2xl:max-w-7xl px-4">
                    <div className="mb-12 border-l-4 border-primary-600 pl-4">
                        <Typography 
                            as="h2" 
                            size='xs'
                            weight='semibold'
                            color='neutral-950'
                            className=""
                        >
                            Available Course
                        </Typography>
                        <Typography 
                            as='p'
                            className="text-gray-500"
                        >
                            Beberapa pelatihan tersedia dalam 3 bulan kedepan
                        </Typography>
                    </div>
                    <div className="text-center">
                        <Typography 
                            as='p'
                            className="text-red-500"
                        >
                            {error}
                            
                        </Typography>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-20 bg-white">
                <div className="mx-auto max-w-xs sm:max-w-md md:max-w-xl lg:max-w-5xl 2xl:max-w-7xl px-4">
                    <div className="mb-12 border-l-4 border-primary-600 pl-4">
                        <Typography 
                            as="h2" 
                            size='base'
                            weight='semibold'
                            color='neutral-950'
                            className=""
                        >
                            Available Course
                        </Typography>
                        <Typography 
                            as='p'
                            className="text-gray-500"
                        >
                            Beberapa pelatihan tersedia dalam 3 bulan kedepan
                        </Typography>
                    </div>
                    <div className="text-center">
                        <Typography 
                            as='p'
                            className="text-red-500"
                        >
                            {error}
                            
                        </Typography>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-white">
            <div className="mx-auto max-w-xs sm:max-w-md md:max-w-xl lg:max-w-5xl 2xl:max-w-7xl px-4">
                {/* Header */}
                <div className="mb-12 border-l-4 border-[var(--color-primary-900)] pl-4">
                    <Typography
                        as="h2"
                        size="lg"
                        weight="semibold"
                        color="neutral-950"
                        className="text-base sm:text-lg md:text-xl lg:text-2xl 2xl:text-3xl"
                    >
                        Available Courses
                    </Typography>
                    <Typography 
                        as='p'
                        className="lg:text-sm 2xl:text-base"
                    >
                        Beberapa pelatihan tersedia dalam 3 bulan kedepan
                    </Typography>
                </div>
                <div className="text-center">
                    <Typography 
                        as='p'
                        className="text-red-500 lg:text-sm 2xl:text-base"
                    >
                        {error}
                        
                    </Typography>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-8 mb-12">
                    {courses.slice(0, visibleCount).map((course) => {
                        // Handle generic type where course_batch might be an array or object
                        const batchData = course.course_batch as any;
                        const batch = Array.isArray(batchData) ? batchData[0] : batchData;
                        const instructor = batch?.instructor;
                        
                        return (
                            <div key={course.course_id} className="bg-white rounded-3xl border border-[var(--color-primary-900)] overflow-hidden hover:scale-105 transition-all duration-300 flex flex-col h-full">
                                {/* Course Image Header */}
                                <div className="h-24 bg-gradient-to-r from-cyan-500 to-blue-600 relative overflow-hidden">
                                    {batch?.posterUrl ? (
                                        <img 
                                        //     src={batch.posterUrl} 
                                        //     alt={course.course_title}
                                        //     className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <>
                                            {/* Tech pattern overlay */}
                                            <div className="absolute inset-0 opacity-30">
                                                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                                    <path d="M0 0 L100 0 L100 100 L0 100 Z" fill="url(#grid-pattern)" />
                                                    <defs>
                                                        <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                                                            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                                                        </pattern>
                                                    </defs>
                                                </svg>
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-4 sm:p-5 lg:p-6 flex-1 flex flex-col">
                                    {/* Category Badge - Above title on mobile/sm */}
                                    <div className="mb-3 sm:mb-3 lg:hidden">
                                        <span className="bg-[var(--color-primary-900)] text-white text-[9px] font-medium px-3 py-1 rounded-md uppercase tracking-wider inline-block">
                                            {course.course_category_name}
                                        </span>
                                    </div>

                                    {/* Title with badge on lg+ */}
                                    <div className="flex justify-between items-start mb-3 sm:mb-4">
                                        <h3 className="text-lg sm:text-xl lg:text-lg 2xl:text-xl font-bold text-navy-900 leading-tight flex-1">
                                            {course.course_title}
                                        </h3>
                                        {/* Category Badge - Next to title on lg+ */}
                                        <span className="hidden lg:inline-block bg-[var(--color-primary-900)] text-white text-[9px] font-medium px-3 py-1 rounded-md uppercase tracking-wider shrink-0 ml-2">
                                            {course.course_category_name}
                                        </span>
                                    </div>

                                    <p className="text-gray-600 text-xs sm:text-sm lg:text-xs 2xl:text-sm mb-4 sm:mb-5 lg:mb-6 flex-1 line-clamp-3">
                                        {course.course_description}
                                    </p>

                                    {/* Deadline Badge */}
                                    {batch?.registration_end && (
                                        <div className="mb-4 sm:mb-5 lg:mb-6">
                                            <span className="bg-[var(--color-primary-900)] text-white text-[10px] sm:text-xs px-3 sm:px-4 py-1 sm:py-1.5 rounded-lg inline-block">
                                                Batas Pendaftaran: {formatDateIndonesia(batch.registration_end)}
                                            </span>
                                        </div>
                                    )}

                                    {/* Instructor Card */}
                                    {instructor && (
                                        <div className="bg-gradient-to-r from-[#1e3a8a] to-[#172554] rounded-r-xl overflow-hidden flex items-center mb-4 sm:mb-5 lg:mb-6">
                                            <div className="w-14 h-11 sm:w-16 sm:h-12 lg:w-16 lg:h-12 2xl:w-20 2xl:h-14 border-white shrink-0">
                                                {instructor.profileUrl ? (
                                                    <img 
                                                        src={instructor.profileUrl} 
                                                        alt={instructor.name}
                                                        className="w-full h-auto object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                        <svg className="w-6 h-6 sm:w-7 sm:h-7 2xl:w-8 2xl:h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 py-1.5 px-2.5 sm:py-2 sm:px-3 lg:py-2 lg:px-3 2xl:py-2.5 2xl:px-3.5 overflow-hidden">
                                                <p className="text-white text-[10px] sm:text-xs lg:text-[11px] 2xl:text-sm font-bold truncate">{instructor.name}</p>
                                                <p className="text-gray-300 text-[8px] sm:text-[9px] lg:text-[9px] 2xl:text-[10px] truncate">
                                                    {instructor.jobTitle} at {instructor.companyName}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Footer Info */}
                                    <div className="flex justify-between items-end mb-4 sm:mb-5 lg:mb-6">
                                        <div>
                                            <p className="text-base sm:text-lg lg:text-base 2xl:text-lg font-bold text-navy-900">{formatPriceIDR(batch?.prices)}</p>
                                        </div>
                                        {batch?.start_date && (
                                            <div className="text-right">
                                                <p className="text-[9px] sm:text-[10px] text-gray-500">Kelas dimulai:</p>
                                                <p className="text-[11px] sm:text-xs font-semibold text-navy-900">{formatDateIndonesia(batch.start_date)}</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Button */}
                                    <Button 
                                        size="sm" 
                                        shape="solid"
                                        color="accent-600"
                                        className="sm:text-xs sm:px-4 py-3 sm:min-h-[1rem] sm:rounded-[20px] 2xl:text-sm 2xl:px-6 py-3 2xl:min-h-[2.5rem] 2xl:rounded-[20px]"
                                        onClick={() => router.push(`${ROUTES.COURSES}/${generateCourseSlug(course.course_title)}`)}
                                    >
                                        Pelajari Selengkapnya
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* View All Button */}
                <div className="flex justify-end">
                        <Button 
                            size="sm" 
                            shape="outline"
                            color="accent-600"
                            className="border-2 text-black sm:text-xs sm:px-4 py-3 sm:min-h-[1rem] sm:rounded-[20px] lg:text-sm lg:px-6 py-3 lg:min-h-[2.5rem] lg:gap-3 lg:rounded-[20px]"
                            onClick={handleContactClick}
                        >
                            Lihat Semua
                        </Button>
                </div>
            </div>
        </section>
    );
}


