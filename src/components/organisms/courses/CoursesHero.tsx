'use client'

import { Typography } from '@/components'

/**
 * CoursesHero - Organism Component
 * 
 * Hero section dengan design modern dan clean
 */
export function CoursesHero() {
    return (
        <section className="w-full bg-gradient-to-b from-[var(--color-primary-900)] via-[var(--color-primary-900)] to-[var(--color-primary-900)] relative overflow-hidden">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-[0.15]">
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent-600)]/20 via-[var(--color-accent-600)]/20 to-[var(--color-accent-600)]/40 bg-[length:300%_100%] animate-[wave_8s_ease-in-out_infinite]"></div>
            </div>
            
            {/* Geometric Shapes - Responsive */}
            <div className="absolute top-12 left-4 w-8 h-8 sm:top-16 sm:left-6 sm:w-10 sm:h-10 lg:top-20 lg:left-10 lg:w-16 lg:h-16 bg-[var(--color-accent-600)]/20 sm:bg-[var(--color-accent-600)]/30 lg:bg-[var(--color-accent-600)]/100 rounded-full animate-[float_3s_ease-in-out_infinite]"></div>
            <div className="absolute top-20 right-4 w-6 h-6 sm:top-28 sm:right-8 sm:w-8 sm:h-8 lg:top-40 lg:right-20 lg:w-12 lg:h-12 bg-[var(--color-accent-600)]/20 sm:bg-[var(--color-accent-600)]/30 lg:bg-[var(--color-accent-600)]/100 rounded-full animate-[float_4s_ease-in-out_infinite_0.5s]"></div>
            <div className="hidden sm:block absolute bottom-20 left-1/4 w-8 h-8 lg:bottom-32 lg:w-14 lg:h-14 bg-[var(--color-accent-600)]/30 lg:bg-[var(--color-accent-600)]/100 rounded-full animate-[float_5s_ease-in-out_infinite_1s]"></div>
            <div className="hidden lg:block absolute bottom-90 right-1/3 w-18 h-18 bg-[var(--color-accent-600)]/100 rounded-full animate-[float_3.5s_ease-in-out_infinite_1.5s]"></div>
            
            {/* Moving Particles - Responsive */}
            <div className="hidden sm:block absolute top-1/4 left-1/3 w-1 h-1 sm:w-1.5 sm:h-1.5 lg:w-2 lg:h-2 bg-[var(--color-accent-600)]/40 sm:bg-[var(--color-accent-600)]/60 lg:bg-[var(--color-accent-600)]/100 rounded-full animate-[particle_8s_linear_infinite]"></div>
            <div className="absolute top-1/2 right-1/4 w-1 h-1 sm:w-1.5 sm:h-1.5 lg:w-2 lg:h-2 bg-[var(--color-accent-600)]/40 sm:bg-[var(--color-accent-600)]/60 lg:bg-[var(--color-accent-600)]/100 rounded-full animate-[particle_10s_linear_infinite_2s]"></div>
            <div className="hidden lg:block absolute bottom-1/3 left-1/2 w-2 h-2 bg-[var(--color-accent-600)]/100 rounded-full animate-[particle_12s_linear_infinite_4s]"></div>
            
            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes wave {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px) scale(1); }
                    50% { transform: translateY(-10px) scale(1.05); }
                }
                @media (min-width: 768px) {
                    @keyframes float {
                        0%, 100% { transform: translateY(0px) scale(1); }
                        50% { transform: translateY(-15px) scale(1.08); }
                    }
                }
                @media (min-width: 1024px) {
                    @keyframes float {
                        0%, 100% { transform: translateY(0px) scale(1); }
                        50% { transform: translateY(-20px) scale(1.1); }
                    }
                }
                @keyframes particle {
                    0% { transform: translateY(100vh) translateX(0); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translateY(-10vh) translateX(50px); opacity: 0; }
                }
            `}</style>
            
            <div className="relative z-10 w-full flex justify-center items-center py-16 lg:py-20">
                <div className="mx-auto max-w-xs sm:max-w-md md:max-w-xl lg:max-w-5xl 2xl:max-w-7xl px-4 text-center">
                    {/* Main Title */}
                    <Typography
                        as="h1"
                        size="2xl"
                        weight="bold"
                        color="neutral-50"
                        className="text-3xl sm:text-3xl lg:text-4xl 2xl:text-5xl mb-6"
                    >
                        Katalog Pelatihan
                    </Typography>

                    {/* Subtitle with highlight */}
                    <Typography
                        as="p"
                        size="base"
                        weight="normal"
                        color="neutral-50"
                        className="text-base lg:text-lg 2xl:text-xl max-w-3xl mx-auto leading-relaxed opacity-90"
                    >
                        Jelajahi <span className="text-[var(--color-accent-600)] font-semibold">berbagai pelatihan IT</span> yang dirancang untuk mengembangkan keterampilan dan <span className="text-orange-300 font-semibold">memajukan karir Anda</span> di industri teknologi
                    </Typography>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto mt-8">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:bg-white/15 transition-all duration-300">
                            <div className="text-3xl font-bold text-[var(--color-accent-600)] mb-2">15+</div>
                            <div className="text-sm font-medium text-white/90">Pelatihan Tersedia</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:bg-white/15 transition-all duration-300">
                            <div className="text-3xl font-bold text-orange-300 mb-2">50+</div>
                            <div className="text-sm font-medium text-white/90">Mentor Expert</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:bg-white/15 transition-all duration-300">
                            <div className="text-3xl font-bold text-[var(--color-accent-600)] mb-2">1000+</div>
                            <div className="text-sm font-medium text-white/90">Alumni Sukses</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
