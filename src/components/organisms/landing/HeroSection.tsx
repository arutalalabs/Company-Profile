'use client'
import { Tag, Typography, Button } from '@/components'
import { scrollToElement } from '@/utils/scroll'
import { ROUTES } from '@/constants/routes'
import { HERO_STARS, HERO_GLOW_STARS, HERO_SHOOTING_STARS } from '@/constants/landing'
import { useMounted } from '@/hooks/useMounted'
import Link from 'next/link'
import { trackHeroContactClick, trackHeroUpcomingCourseClick } from '@/lib/analytics'

function ShootingStar({ style }: { style: React.CSSProperties }) {
    return (
        <div
            className="absolute h-px bg-gradient-to-r from-transparent via-white to-transparent"
            style={style}
        />
    )
}

function Star({ x, y, size, delay, duration, opacity }: {
    x: number; y: number; size: number;
    delay: number; duration: number; opacity: number
}) {
    return (
        <div
            className="absolute rounded-full bg-white"
            style={{
                left: `${x}%`,
                top: `${y}%`,
                width: `${size}px`,
                height: `${size}px`,
                opacity,
                animation: `twinkle ${duration}s ease-in-out ${delay}s infinite`,
            }}
        />
    )
}

function GlowStar({ x, y, delay }: { x: number; y: number; delay: number }) {
    const duration = `${3 + delay}s`
    const delayStr = `${delay}s`
    return (
        <div
            className="absolute"
            style={{
                left: `${x}%`,
                top: `${y}%`,
                width: '20px',
                height: '20px',
                animation: `twinkle ${duration} ease-in-out ${delayStr} infinite`,
            }}
        >
            {/* Salib vertikal — gradient dari atas ke bawah */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 h-full bg-gradient-to-b from-transparent via-white/80 to-transparent blur-[1px]"
                style={{ width: '1.5px' }}
            />
            {/* Salib horizontal — gradient dari kiri ke kanan */}
            <div
                className="absolute top-1/2 left-0 -translate-y-1/2 w-full bg-gradient-to-r from-transparent via-white/80 to-transparent blur-[1px]"
                style={{ height: '1.5px' }}
            />
            {/* Outer glow core */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-[3px]"
                style={{ width: '8px', height: '8px' }}
            />
            {/* Inner bright core */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-[1px]"
                style={{ width: '3px', height: '3px' }}
            />
        </div>
    )
}

export default function HeroSection() {
    const mounted = useMounted()

    const handleScrollToLearning = () => {
        trackHeroUpcomingCourseClick()
        scrollToElement('coming-soon-learning')
    }

    return (
        <>
            {/* Keyframes for star/nebula animations — kept inline so they survive CSS build tree-shaking */}
            <style>{`
                @keyframes twinkle {
                    0%, 100% { opacity: var(--tw-opacity, 0.4); transform: scale(1); }
                    50%       { opacity: 1;                     transform: scale(1.3); }
                }
                @keyframes shoot {
                    0%   { transform: var(--shoot-rotate, rotate(20deg)) translateX(0);      opacity: 0; }
                    5%   { opacity: 1; }
                    80%  { opacity: 1; }
                    100% { transform: var(--shoot-rotate, rotate(20deg)) translateX(110vw);  opacity: 0; }
                }
                @keyframes nebulaPulse {
                    0%, 100% { opacity: 0.18; transform: scale(1); }
                    50%      { opacity: 0.28; transform: scale(1.06); }
                }
                @keyframes nebulaShift {
                    0%, 100% { opacity: 0.12; transform: scale(1) translate(0, 0); }
                    33%      { opacity: 0.20; transform: scale(1.04) translate(8px, -6px); }
                    66%      { opacity: 0.16; transform: scale(0.97) translate(-6px, 4px); }
                }
            `}</style>

            <section className="bg-white w-full sm:px-4 sm:pt-2 lg:pt-6 lg:px-8">
                <div className="relative bg-[#050a18] w-full min-h-[614px] flex justify-center items-center overflow-hidden sm:rounded-2xl sm:min-h-[520px] md:min-h-[580px] lg:min-h-[480px] 2xl:min-h-[614px] lg:rounded-3xl">

                    {/* ── Background Layers ── */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">

                        {/* Deep space gradient */}
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,#0d1a3a_0%,#050a18_70%,#020408_100%)]" />

                        {/* Nebula glow — blue */}
                        <div
                            className="absolute rounded-full"
                            style={{
                                width: '55%', height: '70%',
                                top: '10%', left: '25%',
                                background: 'radial-gradient(ellipse, rgba(59,130,246,0.22) 0%, transparent 70%)',
                                filter: 'blur(40px)',
                                animation: 'nebulaPulse 8s ease-in-out infinite',
                            }}
                        />

                        {/* Nebula glow — indigo */}
                        <div
                            className="absolute rounded-full"
                            style={{
                                width: '40%', height: '50%',
                                top: '30%', left: '5%',
                                background: 'radial-gradient(ellipse, rgba(99,102,241,0.15) 0%, transparent 70%)',
                                filter: 'blur(50px)',
                                animation: 'nebulaShift 12s ease-in-out infinite',
                            }}
                        />

                        {/* Nebula glow — cyan accent */}
                        <div
                            className="absolute rounded-full"
                            style={{
                                width: '35%', height: '45%',
                                top: '20%', right: '5%',
                                background: 'radial-gradient(ellipse, rgba(34,211,238,0.10) 0%, transparent 70%)',
                                filter: 'blur(45px)',
                                animation: 'nebulaPulse 10s ease-in-out 2s infinite',
                            }}
                        />

                        {/* ── Small twinkling stars (client-only to avoid hydration mismatch from PRNG) ── */}
                        {mounted && HERO_STARS.map((s, i) => (
                            <Star key={i} {...s} />
                        ))}

                        {/* ── Glow cross-stars (client-only) ── */}
                        {mounted && HERO_GLOW_STARS.map((s, i) => (
                            <GlowStar key={i} {...s} />
                        ))}

                        {/* ── Shooting stars ── */}
                        {HERO_SHOOTING_STARS.map((s, i) => (
                            <ShootingStar
                                key={i}
                                style={{
                                    top: s.top,
                                    left: s.left,
                                    width: s.width,
                                    animation: `shoot ${s.animationDuration} linear ${s.animationDelay} infinite`,
                                    ['--shoot-rotate' as string]: s.transform,
                                }}
                            />
                        ))}

                        {/* Horizon mist at bottom */}
                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050a18] to-transparent" />
                    </div>

                    {/* ── Content Layer ── */}
                    <div className="relative z-10 w-[350px] flex items-center py-4 justify-center sm:w-[480px] md:w-[600px] lg:h-[322px] lg:w-[800px]">
                        <div className="text-center text-white space-y-6">

                            {/* Tag */}
                            <div className="flex justify-center mb-8">
                                <Tag size="md" variant="solid">
                                    Belajar atau Temukan Talent untuk Team Anda
                                </Tag>
                            </div>

                            {/* Title */}
                            <div className="flex flex-col justify-center mb-8">
                                <Typography
                                    as="h1"
                                    size="xl"
                                    weight="semibold"
                                    color="neutral-50"
                                    align="center"
                                    leading="tight"
                                    className="mb-2 text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl drop-shadow-[0_0_20px_rgba(147,197,253,0.4)]"
                                >
                                    Tingkatkan Skill & Solusi Digital Anda
                                    Bersama ArutalaLab
                                </Typography>

                                {/* Description */}
                                <Typography
                                    as="p"
                                    size="sm"
                                    weight="light"
                                    color="neutral-50"
                                    align="center"
                                    className="max-w-2xl lg:max-w-3xl mx-auto mb-0 lg:mb-1 text-sm sm:text-base md:text-md 2xl:text-lg opacity-80"
                                >
                                    ArutalaLab merupakan platform untuk IT
                                    Education, Resources, dan Software Services
                                    yang mendukung pertumbuhan individu dan
                                    perusahaan.
                                </Typography>
                            </div>

                            {/* Buttons */}
                            <div className="flex sm:flex-row gap-3 justify-center items-center sm:gap-4 lg:gap-4">
                                {/* onClick dipasang di span karena <Link> tidak menerima onClick langsung untuk tracking */}
                                <span onClick={() => trackHeroContactClick()}>
                                    <Link href={ROUTES.KONTAK}>
                                        <Button
                                            size="sm"
                                            shape="solid"
                                            color="accent-600"
                                            className="sm:text-xs sm:px-4 py-3 sm:min-h-[1rem] sm:rounded-[20px] lg:text-sm lg:px-6 py-3 lg:min-h-[2.5rem] lg:gap-3 lg:rounded-[20px]"
                                        >
                                            Contact Us
                                        </Button>
                                    </Link>
                                </span>
                                <Button
                                    size="sm"
                                    shape="outline"
                                    color="accent-600"
                                    className="sm:text-xs sm:px-4 py-3 sm:min-h-[1rem] sm:rounded-[20px] lg:text-sm lg:px-6 py-3 lg:min-h-[2.5rem] lg:gap-3 lg:rounded-[20px]"
                                    onClick={handleScrollToLearning}
                                >
                                    Pelatihan Mendatang
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}