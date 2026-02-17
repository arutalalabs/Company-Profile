import { Typography } from '@/components'

/**
 * Loading state for course detail page
 * Shown via Suspense boundary while server component fetches data
 */
export default function CourseDetailLoading() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Skeleton */}
            <section className="w-full bg-gradient-to-b from-[var(--color-primary-100)] to-[var(--color-primary-300)] py-8 sm:py-10 lg:py-16">
                <div className="mx-auto max-w-full sm:max-w-md md:max-w-xl lg:max-w-6xl 2xl:max-w-7xl px-6 sm:px-6 md:px-8">
                    <div className="animate-pulse">
                        {/* Category badge skeleton */}
                        <div className="h-6 w-24 bg-white/50 rounded-full mb-4"></div>

                        {/* Title skeleton */}
                        <div className="h-10 w-3/4 bg-white/50 rounded-lg mb-4"></div>
                        <div className="h-10 w-1/2 bg-white/50 rounded-lg mb-6"></div>

                        {/* Description skeleton */}
                        <div className="h-5 w-full bg-white/50 rounded mb-2"></div>
                        <div className="h-5 w-5/6 bg-white/50 rounded mb-8"></div>

                        {/* Buttons skeleton */}
                        <div className="flex gap-4">
                            <div className="h-12 w-36 bg-white/50 rounded-full"></div>
                            <div className="h-12 w-36 bg-white/50 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Skeleton */}
            <section className="w-full bg-white py-10 sm:py-12 lg:py-16">
                <div className="mx-auto max-w-full sm:max-w-md md:max-w-xl lg:max-w-6xl 2xl:max-w-7xl px-6 sm:px-6 md:px-8">
                    <div className="animate-pulse space-y-8">
                        {/* Features skeleton */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="h-24 bg-gray-100 rounded-xl"></div>
                            ))}
                        </div>

                        {/* About skeleton */}
                        <div className="space-y-4">
                            <div className="h-8 w-1/4 bg-gray-200 rounded"></div>
                            <div className="h-4 w-full bg-gray-200 rounded"></div>
                            <div className="h-4 w-full bg-gray-200 rounded"></div>
                            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                        </div>

                        {/* Materials skeleton */}
                        <div className="space-y-4">
                            <div className="h-8 w-1/3 bg-gray-200 rounded"></div>
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="h-16 bg-gray-100 rounded-lg"></div>
                            ))}
                        </div>

                        {/* Schedule skeleton */}
                        <div className="space-y-4">
                            <div className="h-8 w-1/4 bg-gray-200 rounded"></div>
                            <div className="h-48 bg-gray-100 rounded-xl"></div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
