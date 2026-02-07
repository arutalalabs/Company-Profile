import { Typography } from '@/components'

/**
 * Loading state for article detail page
 */
export default function ArticleDetailLoading() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Skeleton */}
            <section className="w-full bg-gradient-to-b from-[var(--color-primary-100)] to-[var(--color-primary-300)] py-8 sm:py-10 lg:py-16">
                <div className="mx-auto max-w-full sm:max-w-md md:max-w-xl lg:max-w-6xl 2xl:max-w-7xl px-6 sm:px-6 md:px-8">
                    <div className="animate-pulse">
                        {/* Back button skeleton */}
                        <div className="h-6 w-40 bg-white/50 rounded-lg mb-6"></div>

                        {/* Date skeleton */}
                        <div className="h-4 w-32 bg-white/50 rounded mb-3"></div>

                        {/* Title skeleton */}
                        <div className="h-10 w-3/4 bg-white/50 rounded-lg mb-4"></div>
                        <div className="h-10 w-1/2 bg-white/50 rounded-lg mb-8"></div>

                        {/* Subtitle skeleton */}
                        <div className="h-6 w-full bg-white/50 rounded mb-2"></div>
                        <div className="h-6 w-5/6 bg-white/50 rounded mb-8"></div>

                        {/* Cover image skeleton */}
                        <div className="w-full max-w-4xl aspect-video bg-white/50 rounded-2xl"></div>
                    </div>
                </div>
            </section>

            {/* Content Skeleton */}
            <section className="w-full bg-white py-10 sm:py-12 lg:py-16">
                <div className="mx-auto max-w-full sm:max-w-md md:max-w-xl lg:max-w-6xl 2xl:max-w-7xl px-6 sm:px-6 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 lg:gap-12">
                        {/* Main Content Skeleton */}
                        <div className="order-2 lg:order-1 animate-pulse space-y-6">
                            <div className="h-8 w-1/3 bg-gray-200 rounded"></div>
                            <div className="h-4 w-full bg-gray-200 rounded"></div>
                            <div className="h-4 w-full bg-gray-200 rounded"></div>
                            <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                            <div className="h-4 w-full bg-gray-200 rounded"></div>
                            <div className="h-8 w-1/4 bg-gray-200 rounded mt-8"></div>
                            <div className="h-4 w-full bg-gray-200 rounded"></div>
                            <div className="h-4 w-4/5 bg-gray-200 rounded"></div>
                        </div>

                        {/* TOC Skeleton */}
                        <aside className="order-1 lg:order-2">
                            <div className="sticky top-24 bg-[var(--color-primary-50)] p-6 rounded-2xl animate-pulse">
                                <div className="h-6 w-24 bg-gray-200 rounded mb-4"></div>
                                <div className="space-y-3">
                                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                                    <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                                    <div className="h-4 w-4/5 bg-gray-200 rounded"></div>
                                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </main>
    )
}
