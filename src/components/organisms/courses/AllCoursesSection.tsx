'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Typography, Icon } from '@/components';
import { getAllCourse, generateCourseSlug, type CourseDetail } from '@/lib/api/courses';

export default function AllCoursesSection() {
    const router = useRouter();
    const handleContactClick = () => {
        router.push('/it-education');
    };

    const [courses, setCourses] = useState<CourseDetail[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<string>('all');
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        async function fetchCourses() {
            try {
                setLoading(true);
                const response = await getAllCourse();
                if (response.success) {
                    // Sort courses: Active first (by registration_end asc), then closed (by registration_end desc)
                    const sortedCourses = response.data.sort((a, b) => {
                        const batchA = Array.isArray(a.course_batch) ? a.course_batch[0] : a.course_batch;
                        const batchB = Array.isArray(b.course_batch) ? b.course_batch[0] : b.course_batch;
                        
                        const statusA = (batchA as any)?.status as string | undefined
                        const statusB = (batchB as any)?.status as string | undefined

                        // OPEN first, then SCHEDULED, then ON_GOING, then COMPLETED
                        const statusPriority: Record<string, number> = {
                            'OPEN': 1,
                            'SCHEDULED': 2,
                            'ON_GOING': 3,
                            'COMPLETED': 4
                        }
                        const priA = statusPriority[statusA ?? ''] ?? 5
                        const priB = statusPriority[statusB ?? ''] ?? 5
                        if (priA !== priB) return priA - priB

                        // Same status: sort OPEN by nearest registration_end
                        const regEndA = batchA?.registration_end ? new Date(batchA.registration_end).getTime() : Infinity;
                        const regEndB = batchB?.registration_end ? new Date(batchB.registration_end).getTime() : Infinity;
                        return regEndA - regEndB;
                    });
                    
                    setCourses(sortedCourses);
                    // Extract unique categories
                    const uniqueCategories = [...new Set(sortedCourses.map(c => c.course_category_name))];
                    setCategories(uniqueCategories);
                } else {
                    setError(response.message || 'Failed to fetch courses');
                }
            } catch (err) {
                setError('Error fetching courses');
                console.error('Error fetching courses:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchCourses();
    }, []);

    // Filter courses based on selected category
    const filteredCourses = filter === 'all' 
        ? courses 
        : courses.filter(course => course.course_category_name === filter);

    // Helper function to format price
    const formatPrice = (prices: any) => {
        if (!prices) return 'Gratis';
        
        if (prices.finalPrice === 0 || prices.basePrice === 0) {
            return 'Gratis';
        }
        
        const price = prices.finalPrice || prices.basePrice;
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    // Helper function to format date
    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    if (loading) {
        return (
            <section className="py-12 lg:py-20 bg-white">
                <div className="mx-auto max-w-xs sm:max-w-md md:max-w-xl lg:max-w-5xl 2xl:max-w-7xl px-4">
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary-600 border-t-transparent"></div>
                        <p className="text-gray-500 mt-4">Memuat data pelatihan...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-12 lg:py-20 bg-white">
                <div className="mx-auto max-w-xs sm:max-w-md md:max-w-xl lg:max-w-5xl 2xl:max-w-7xl px-4">
                    <div className="text-center py-12">
                        <p className="text-red-500">{error}</p>
                        <Button 
                            size="md" 
                            shape="solid"
                            color="primary-900"
                            className="mt-4"
                            onClick={() => window.location.reload()}
                        >
                            Coba Lagi
                        </Button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-8 lg:py-16 bg-white">
            <div className="mx-auto max-w-xs sm:max-w-md md:max-w-xl lg:max-w-5xl 2xl:max-w-7xl px-4">
                {/* Filter Section */}
                <div className="mb-8 lg:mb-12">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        {/* Breadcrumb Style */}
                        <div className="flex items-center justify-center gap-2 mb-6 text-xs text-gray-600">
                            <button 
                                onClick={() => router.push('/')}
                                className="hover:text-[var(--color-primary-900)] transition-colors cursor-pointer"
                            >
                                Beranda
                            </button>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            <button 
                                onClick={() => router.push('/it-education')}
                                className="hover:text-[var(--color-primary-900)] transition-colors cursor-pointer"
                            >
                                IT Education
                            </button>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            <span 
                                className="text-[var(--color-primary-900)] font-medium"
                            >
                                Katalog Pelatihan
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <Typography
                            as="h2"
                            size="xl"
                            weight="semibold"
                            color="neutral-950"
                            className="lg:text-2xl 2xl:text-3xl"
                        >
                            Daftar Pelatihan
                             ({filteredCourses.length})
                        </Typography>
                    </div>  
                    {/* Category Filter Pills */}
                    <div className="flex flex-wrap gap-2 lg:gap-3">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                                filter === 'all'
                                    ? 'bg-[var(--color-primary-900)] text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Semua
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setFilter(category)}
                                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                                    filter === category
                                        ? 'bg-[var(--color-primary-900)] text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Courses Grid */}
                {filteredCourses.length === 0 ? (
                    <div className="text-center py-12">
                        <Typography as="p" color="neutral-600">
                            Tidak ada pelatihan yang tersedia untuk kategori ini.
                        </Typography>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {filteredCourses.map((course) => {
                            // Handle course_batch - might be array or single object
                            const batchData = course.course_batch as any;
                            const batch = Array.isArray(batchData) ? batchData[0] : batchData;
                            const instructor = batch?.instructor;
                            
                            // Use API status to determine if registration is closed
                            // SCHEDULED → belum dibuka, OPEN → masih buka, ON_GOING → ditutup (kelas berjalan), COMPLETED → selesai
                            const batchStatus = batch?.status as string | undefined
                            const isRegistrationClosed = batchStatus === 'ON_GOING' || batchStatus === 'COMPLETED'

                            return (
                            <div 
                                key={course.course_id} 
                                className={`bg-white rounded-3xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full ${
                                    isRegistrationClosed 
                                        ? 'border-2 border-gray-300 opacity-75' 
                                        : 'border border-[var(--color-primary-900)]'
                                }`}
                            >
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
                                        <h3 className="text-lg sm:text-xl lg:text-lg 2xl:text-xl font-semibold text-navy-900 leading-tight flex-1">
                                            {course.course_title}
                                        </h3>
                                        {/* Category Badge - Next to title on lg+ */}
                                        <span className="hidden lg:inline-block bg-[var(--color-primary-900)] text-white text-[6px] 2xl:text-[8px] font-medium px-2 py-1 rounded-md uppercase tracking-wider shrink-0 ml-2 lg:mt-1">
                                            {course.course_category_name}
                                        </span>
                                    </div>

                                    <p className="text-gray-600 text-xs sm:text-sm lg:text-xs 2xl:text-sm mb-4 sm:mb-5 lg:mb-6 flex-1 line-clamp-3">
                                        {course.course_description}
                                    </p>

                                    {/* Deadline Badge */}
                                    {batch?.registration_end && (
                                        <div className="mb-4 sm:mb-5 lg:mb-6">
                                            <span className={`text-white text-[8px] sm:text-[10px] px-2 sm:px-3 py-1 sm:py-1 rounded-lg inline-block ${
                                                isRegistrationClosed 
                                                    ? 'bg-red-600' 
                                                    : 'bg-[var(--color-primary-900)]'
                                            }`}>
                                                {isRegistrationClosed 
                                                    ? '🔒 Pendaftaran Ditutup' 
                                                    : `Batas Pendaftaran: ${formatDate(batch.registration_end)}`
                                                }
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
                                            <p className="text-base sm:text-lg lg:text-base 2xl:text-lg font-bold text-navy-900">{formatPrice(batch?.prices)}</p>
                                        </div>
                                        {batch?.start_date && (
                                            <div className="text-right">
                                                <p className="text-[9px] sm:text-[10px] text-gray-500">Kelas dimulai:</p>
                                                <p className="text-[11px] sm:text-xs font-semibold text-navy-900">{formatDate(batch.start_date)}</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Button */}
                                    <Button 
                                        size="sm" 
                                        shape="solid"
                                        color="accent-600"
                                        className="sm:text-xs sm:px-4 py-3 sm:min-h-[1rem] sm:rounded-[20px] 2xl:text-sm 2xl:px-6 py-3 2xl:min-h-[2.5rem] 2xl:rounded-[20px]"
                                        onClick={() => router.push(`/courses/${generateCourseSlug(course.course_title)}`)}
                                    >
                                        {isRegistrationClosed ? 'Lihat Detail' : 'Pelajari Selengkapnya'}
                                    </Button>
                                </div>
                            </div>
                        );
                        })}
                    </div>
                )}

                {/* Back to IT Education Link */}
                <div className="mt-12 text-center">
                    <Button 
                        size="sm" 
                        shape="outline"
                        color="accent-600"
                        className="border-2 text-black sm:text-xs sm:px-4 py-3 sm:min-h-[1rem] sm:rounded-[20px] lg:text-sm lg:px-6 py-3 lg:min-h-[2.5rem] lg:gap-3 lg:rounded-[20px]"
                        onClick={handleContactClick}
                        leftIcon={
                            <Icon 
                                icon={
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                    </svg>
                                }
                                size="sm"
                                color="current"
                            />
                        }
                    >
                        Kembali
                    </Button>
                </div>
            </div>
        </section>
    );
}
