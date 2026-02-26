'use client'
import { Typography, Icon } from '@/components'
import { MentorDetailCard } from '@/components/molecules/mentor-detail-card'
import type { CourseMaterial, Instructor } from '@/types/course'

interface CourseLearningProps {
    materials: CourseMaterial[]
    instructor?: Instructor
    masterOfCeremony?: Instructor
}

/**
 * CourseLearning - Section showing what students will learn and the mentor
 */
export function CourseLearning({ materials, instructor, masterOfCeremony }: CourseLearningProps) {
    // Default materials if none provided
    const defaultMaterials: CourseMaterial[] = [
        {
            description: 'Memahami konsep fundamental pemrograman dan logika dasar'
        },
        {
            description: 'Mempelajari berbagai struktur data dan implementasinya'
        },
        {
            description: 'Menguasai algoritma sorting, searching, dan optimization'
        },
        {
            description: 'Menerapkan clean code dan design patterns'
        }
    ]

    // Software QA specific materials
    const qaMaterials: CourseMaterial[] = [
        {
            description: 'Memahami konsep dasar Software Quality Assurance dan pentingnya testing dalam SDLC'
        },
        {
            description: 'Menguasai berbagai jenis testing: Unit, Integration, System, dan Acceptance Testing'
        },
        {
            description: 'Mempelajari test case design techniques dan best practices dalam membuat test scenarios'
        },
        {
            description: 'Praktik langsung dengan tools testing seperti Postman, Selenium, dan JMeter'
        },
        {
            description: 'Memahami bug life cycle, bug reporting, dan tracking menggunakan Jira'
        },
        {
            description: 'Menerapkan automation testing dan continuous testing dalam CI/CD pipeline'
        },
        {
            description: 'Mempelajari API testing, performance testing, dan security testing fundamentals'
        },
        {
            description: 'Membuat test documentation lengkap termasuk test plan dan test report'
        }
    ]

    // Uncomment line below to use QA materials instead of default
    // const displayMaterials = materials.length > 0 ? materials : qaMaterials
    const displayMaterials = materials.length > 0 ? materials : defaultMaterials

    return (
        <section className="py-10 lg:py-16 bg-white">
            <div className="mx-auto max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-5xl 2xl:max-w-7xl px-4">
                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 lg:gap-12">
                    {/* Left Side - Learning Materials */}
                    <div>
                        {/* Section Title */}
                        <Typography
                            as="h2"
                            size="base"
                            weight="bold"
                            color="neutral-950"
                            className="sm:text-xl lg:text-lg 2xl:text-2xl mb-8"
                        >
                            Yang akan kamu pelajari
                        </Typography>

                        {/* Materials Grid - 2 columns */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {displayMaterials.map((material, index) => (
                                <div 
                                    key={index}
                                    className="flex items-start gap-3"
                                >
                                    {/* Check Icon */}
                                    <div className="flex-shrink-0 mt-0.5">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="12" cy="12" r="12" fill="#3B5998"/>
                                            <path d="M17.0833 8.08125L10.7417 15.9012C10.6633 16.0128 10.5592 16.1024 10.4387 16.1627C10.3182 16.2229 10.1849 16.2522 10.0496 16.2482C9.91425 16.2443 9.78283 16.2073 9.66596 16.1401C9.54909 16.073 9.44998 15.9775 9.37713 15.8607L6.91667 12.0742C6.78445 11.8922 6.91667 11.6405 7.13485 11.6405H8.23218C8.50325 11.6405 8.75878 11.7836 8.91171 12.0205L10.0322 13.8066L15.0678 8.09875C15.2207 7.88276 15.4745 7.73725 15.7469 7.73725H16.8442C17.0624 7.73725 17.1946 7.98908 17.0833 8.08125Z" fill="white"/>
                                        </svg>
                                    </div>

                                    {/* Material Content */}
                                    <div className="flex-1">
                                        <Typography
                                            as="p"
                                            size="sm"
                                            color="neutral-950"
                                            className="text-sm sm:text-base lg:text-sm 2xl:text-lg leading-relaxed"
                                        >
                                            {material.description}
                                        </Typography>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Mentor Cards */}
                    <div className="space-y-6">
                        
                        {/* Mentor Section */}
                        {instructor && (
                            <div className="p-0 lg:pt-6 2xl:p-6 sm:flex sm:flex-col sm:items-center lg:items-start">
                                <Typography
                                    as="h3"
                                    size="base"
                                    weight="bold"
                                    color="neutral-950"
                                    className="sm:text-sm lg:text-base 2xl:text-xl mb-4"
                                >
                                    Mentor
                                </Typography>
                                
                                {/* Mobile & Tablet - size sm */}
                                <div className="sm:max-w-md w-full lg:hidden">
                                    <MentorDetailCard
                                        name={instructor.name}
                                        jobTitle={instructor.jobTitle}
                                        companyName={instructor.companyName}
                                        profileUrl={instructor.profileUrl}
                                        variant="horizontal"
                                        size="sm"
                                    />
                                </div>
                                
                                {/* Desktop (lg & 2xl) - size md */}
                                <div className="hidden lg:block lg:max-w-none w-full">
                                    <MentorDetailCard
                                        name={instructor.name}
                                        jobTitle={instructor.jobTitle}
                                        companyName={instructor.companyName}
                                        profileUrl={instructor.profileUrl}
                                        variant="horizontal"
                                        size="md"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Master of Ceremony Section
                        {masterOfCeremony && (
                            <div className="bg-white p-6 sm:flex sm:flex-col sm:items-center lg:items-start">
                                <Typography
                                    as="h3"
                                    size="base"
                                    weight="bold"
                                    color="neutral-950"
                                    className="text-base lg:text-2xl mb-4"
                                >
                                    Mentor
                                </Typography>
                                <div className="sm:max-w-md lg:max-w-none w-full">
                                    <MentorDetailCard
                                        name={masterOfCeremony.name}
                                        jobTitle={masterOfCeremony.jobTitle}
                                        companyName={masterOfCeremony.companyName}
                                        profileUrl={masterOfCeremony.profileUrl}
                                        variant="horizontal"
                                        size="md"
                                    />
                                </div>
                            </div>
                        )} */}
                    </div>
                </div>
            </div>
        </section>
    )
}