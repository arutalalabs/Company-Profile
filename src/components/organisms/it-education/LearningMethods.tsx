'use client'
import { Image, Icon, Button, Typography } from "@/components"
import { useState } from "react"
import { IT_EDUCATION_CATEGORY_DATA as categoryData } from '@/constants/it-education'

export default function LearningMethods() {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const categories = categoryData.map(cat => cat.name)
    const currentCategory = categoryData[selectedIndex]

    return (
        <section className="w-full py-8 lg:py-12">
            <div className="max-w-xs md:max-w-md lg:max-w-3xl 2xl:max-w-4xl mx-auto space-y-6 lg:space-y-8">
                {/* Title */}
                <Typography
                    as="h2"
                    size="lg"
                    weight="semibold"
                    align="center"
                    color="neutral-950"
                    className="text-base sm:text-lg md:text-xl lg:text-2xl 2xl:text-3xl px-2"
                >
                    Pilih Kategori dan Metode Belajar yang Cocok Untukmu
                </Typography>

                {/* Category Buttons */}
                <div className="flex justify-center">
                    {/* Mobile: Dropdown */}
                    <div className="sm:hidden relative w-auto max-w-xs">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-full bg-[var(--color-primary-900)] text-[var(--color-neutral-50)] rounded-full px-4 py-2.5 text-sm gap-4 font-medium flex items-center justify-between"
                        >
                            <span>{currentCategory.name}</span>
                            <svg
                                className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {isDropdownOpen && (
                            <>
                                {/* Backdrop */}
                                <div
                                    className="fixed inset-0 z-10"
                                    onClick={() => setIsDropdownOpen(false)}
                                />

                                {/* Dropdown Menu */}
                                <div className="absolute top-full left-0 right-0 mt-2 bg-[var(--color-primary-900)] rounded-2xl shadow-lg z-20 overflow-hidden">
                                    {categories.map((category, index) => (
                                        <button
                                            key={category}
                                            onClick={() => {
                                                setSelectedIndex(index);
                                                setIsDropdownOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${selectedIndex === index
                                                    ? 'bg-[var(--color-accent-600)] text-[var(--color-neutral-950)]'
                                                    : 'text-[var(--color-neutral-50)] hover:bg-[var(--color-accent-600)] hover:text-[var(--color-neutral-950)]'
                                                }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Desktop: Button Group */}
                    <div className="bg-[var(--color-primary-900)] rounded-full p-1.5 hidden gap-1 sm:flex">
                        {categories.map((category, index) => (
                            <Button
                                key={category}
                                size="md"
                                shape="solid"
                                color="neutral-50"
                                className={`flex-auto h-auto font-medium transition-all duration-200 border-0 sm:px-4 sm:py-1 sm:min-h-[1rem] lg:text-sm lg:px-6 lg:py-2 lg:min-h-[1rem] 2xl:text-sm 2xl:px-6 2xl:py-3 ${selectedIndex === index
                                        ? 'bg-[var(--color-accent-600)] text-[var(--color-neutral-950)] hover:bg-[var(--color-accent-700)]'
                                        : 'bg-transparent text-[var(--color-neutral-50)] hover:bg-[var(--color-accent-600)] hover:text-[var(--color-neutral-950)]'
                                    }`}
                                onClick={() => setSelectedIndex(index)}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Content Layout: Image + Info Boxes */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 2xl:gap-6 items-center">
                    {/* Left: Image */}
                    <div className="w-full hidden lg:block ml-6">
                        <Image
                            src={currentCategory.image}
                            alt={`${currentCategory.name} illustration`}
                            fullWidth={true}
                            shape="rounded"
                            fit="cover"
                            className="w-full lg:w-[340px] lg:h-[340px] 2xl:w-[400px] 2xl:h-[430px] rounded-2xl"
                        />
                    </div>

                    {/* Right: Info Boxes */}
                    <div className="flex flex-col gap-4 sm:gap-5 lg:gap-4 2xl:gap-6">
                        {/* Top Box: Field Info */}
                        <div className="bg-[var(--color-primary-50)] rounded-xl space-y-0 border-2 border-[var(--color-primary-900)] py-4 px-4 sm:py-5 sm:px-6 lg:mx-6 lg:py-3 lg:px-4 2xl:mx-0 2xl:py-6 2xl:px-8">
                            <Typography
                                as="h3"
                                size="base"
                                weight="semibold"
                                color="neutral-950"
                                className="text-sm sm:text-base 2xl:text-lg mb-3 sm:mb-3"
                            >
                                Informasi {currentCategory.name}
                            </Typography>

                            {/* Duration */}
                            <div className="flex items-center justify-between pb-2 sm:pb-2.5 lg:pb-2 2xl:pb-3 border-b border-[var(--color-primary-900)]">
                                <Typography
                                    as="p"
                                    size="sm"
                                    weight="medium"
                                    color="neutral-950"
                                    className="text-xs sm:text-sm md:text-sm 2xl:text-base"
                                >
                                    Durasi
                                </Typography>
                                <Typography
                                    as="p"
                                    size="base"
                                    weight="normal"
                                    color="neutral-950"
                                    className="text-xs sm:text-sm md:text-sm 2xl:text-base"
                                >
                                    {currentCategory.fieldInfo.duration}
                                </Typography>
                            </div>

                            {/* Schedule */}
                            <div className="flex items-center justify-between py-2 sm:py-2.5 lg:py-2 2xl:py-3 border-b border-[var(--color-primary-900)]">
                                <Typography
                                    as="p"
                                    size="xs"
                                    weight="medium"
                                    color="neutral-950"
                                    className="text-xs sm:text-sm md:text-sm 2xl:text-base"
                                >
                                    Jadwal
                                </Typography>
                                <Typography
                                    as="p"
                                    size="xs"
                                    weight="normal"
                                    color="neutral-950"
                                    className="text-xs sm:text-sm md:text-sm 2xl:text-base"
                                >
                                    {currentCategory.fieldInfo.schedule.join(' & ')}
                                </Typography>
                            </div>

                            {/* Level */}
                            <div className="flex items-center justify-between pt-2 sm:pt-2.5 lg:pt-2 2xl:pt-3">
                                <Typography
                                    as="p"
                                    size="xs"
                                    weight="medium"
                                    color="neutral-950"
                                    className="text-xs sm:text-sm md:text-sm 2xl:text-base"
                                >
                                    Materi
                                </Typography>
                                <Typography
                                    as="p"
                                    size="xs"
                                    weight="normal"
                                    color="neutral-950"
                                    className="text-xs sm:text-sm md:text-sm 2xl:text-base"
                                >
                                    {currentCategory.fieldInfo.level}
                                </Typography>
                            </div>
                        </div>

                        {/* Bottom Box: Learning Methods */}
                        <div className="bg-white rounded-xl space-y-3 border-2 border-[var(--color-primary-900)] py-4 px-4 sm:py-5 sm:px-6 lg:mx-6 lg:py-3 lg:px-4 2xl:mx-0 2xl:py-6 2xl:px-8">
                            <Typography
                                as="h3"
                                size="base"
                                weight="semibold"
                                color="neutral-950"
                                className="text-sm sm:text-base 2xl:text-lg mb-3 sm:mb-4"
                            >
                                Metode Pembelajaran
                            </Typography>

                            <div className="grid grid-cols-1 gap-1 sm:gap-1.5">
                                {currentCategory.learningMethods.map((method, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 sm:gap-3 pb-2 sm:pb-2 lg:pb-2 2xl:pb-3"
                                    >
                                        <Icon
                                            icon={method.type}
                                            type="image"
                                            src={method.icon}
                                            size="md"
                                            color="accent-600"
                                            alt={method.type}
                                            className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5 flex-shrink-0"
                                        />
                                        <Typography
                                            as="p"
                                            size="sm"
                                            weight="medium"
                                            color="neutral-950"
                                            className="text-xs sm:text-sm md:text-sm 2xl:text-base"
                                        >
                                            {method.type}
                                        </Typography>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}