'use client'
import { Typography, Image } from '@/components'
import { useProcessSection } from '@/hooks/useProcessSection'
import { PROCESS_PHASES } from '@/constants/software-services'
import { trackProcessPhaseClick } from '@/lib/analytics'

export default function ProcessSection() {
    const { activePhase, togglePhase } = useProcessSection()

    return (
        <section className="py-12 lg:py-20 px-4 bg-gray-50">
            <div className="container mx-auto px-4 py-4 sm:px-0 sm:py-0 sm:max-w-2xl lg:max-w-5xl 2xl:max-w-7xl">
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left Side - Sticky Title, Description & Image */}
                    <div className="lg:sticky lg:top-26 lg:self-start">
                        {/* Section Title & Description */}
                        <div className="mb-8 lg:mb-10">
                            <Typography
                                as="h2"
                                size="xl"
                                weight="bold"
                                color="primary-900"
                                className="mb-4 text-xl md:text-2xl lg:text-start 2xl:text-3xl"
                            >
                                Brilliant Software Services
                            </Typography>
                            <Typography
                                as="p"
                                size="sm"
                                weight="normal"
                                color="neutral-950"
                                className="lg:text-sm 2xl:text-base"
                            >
                                Software Services kami mencakup beberapa tahapan seperti perencanaan, analisis, perancangan, implementasi dan pengujian. Anda dapat memilih tahapan mana yang cocok atau menggunakan semua layanan untuk kebutuhan perangkat lunak.
                            </Typography>
                        </div>

                        {/* Image */}
                        <div className="relative w-full max-w-sm mx-auto lg:mx-0">
                            <Image
                                src="/src/software-services/high-five.png"
                                alt="Software Services"
                                fullWidth
                                fit="contain"
                                className="w-full h-[180px] sm:h-[200px] lg:h-[240px] 2xl:h-[260px]"
                            />
                        </div>
                    </div>

                    {/* Right Side - Accordion List */}
                    <div className="flex flex-col gap-4">
                        {PROCESS_PHASES.map((phase) => {
                            const isActive = activePhase === phase.id
                            return (
                                <div
                                    key={phase.id}
                                    className={`
                                        rounded-2xl border-2 transition-all duration-300
                                        ${isActive
                                            ? 'border-[var(--color-primary-400)] bg-white shadow-lg'
                                            : 'border-[var(--color-neutral-200)] bg-white hover:border-[var(--color-primary-300)] hover:shadow-md'
                                        }
                                    `}
                                >
                                    {/* Header Button */}
                                    <button
                                        onClick={() => { togglePhase(phase.id); trackProcessPhaseClick(phase.title); }}
                                        className="w-full flex items-center justify-between px-5 py-4 lg:px-6 lg:py-5"
                                    >
                                        <Typography
                                            as="span"
                                            size="base"
                                            weight="semibold"
                                            color="neutral-950"
                                            className="text-base lg:text-base 2xl:text-lg text-left"
                                        >
                                            {phase.title}
                                        </Typography>

                                        {/* Arrow Icon */}
                                        <div className={`
                                            w-5 h-5 flex-shrink-0 transition-transform duration-300
                                            ${isActive ? 'rotate-180' : ''}
                                        `}>
                                            <Image
                                                src="/src/software-services/arrow-bottom.svg"
                                                alt="Arrow"
                                                size="sm"
                                                fit="contain"
                                                className="w-full h-full"
                                            />
                                        </div>
                                    </button>

                                    {/* Dropdown Content */}
                                    <div className={`
                                        overflow-hidden transition-all duration-300 ease-in-out
                                        ${isActive ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}
                                    `}>
                                        <div className="px-5 pb-5 lg:px-6 lg:pb-6 pt-0">
                                            <div className="border-t border-[var(--color-neutral-200)] pt-4">
                                                {/* Description */}
                                                <Typography
                                                    as="p"
                                                    size="sm"
                                                    weight="normal"
                                                    color="neutral-600"
                                                    leading="relaxed"
                                                    className="text-sm mb-5"
                                                >
                                                    {phase.description}
                                                </Typography>

                                                {/* Alur Section */}
                                                <div className="mb-5">
                                                    <Typography
                                                        as="h4"
                                                        size="sm"
                                                        weight="semibold"
                                                        color="neutral-950"
                                                        className="text-sm lg:text-base mb-3"
                                                    >
                                                        {phase.alurTitle}
                                                    </Typography>
                                                    <ol className="list-decimal list-inside space-y-2 ml-1">
                                                        {phase.alurSteps.map((step, idx) => (
                                                            <li
                                                                key={idx}
                                                                className="text-sm text-gray-700 leading-relaxed pl-1"
                                                            >
                                                                {step}
                                                            </li>
                                                        ))}
                                                    </ol>
                                                </div>

                                                {/* Output Section */}
                                                <div>
                                                    <Typography
                                                        as="h4"
                                                        size="sm"
                                                        weight="semibold"
                                                        color="neutral-950"
                                                        className="text-sm lg:text-base mb-3"
                                                    >
                                                        {phase.outputTitle}
                                                    </Typography>
                                                    <ul className="list-disc list-inside space-y-2 ml-1">
                                                        {phase.outputItems.map((item, idx) => (
                                                            <li
                                                                key={idx}
                                                                className="text-sm text-gray-700 leading-relaxed pl-1"
                                                            >
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}