'use client'
import { Typography, Button, Icon, Image } from '@/components'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function ComingSoonLearningSection() {
    const router = useRouter()
    const [selectedField, setSelectedField] = useState('bootcamp')
    const [showPosterModal, setShowPosterModal] = useState(false)

    const handlePosterClick = () => {
        setShowPosterModal(true)
    }

    const closePosterModal = () => {
        setShowPosterModal(false)
    }

    // Data field pelatihan
    const trainingFields = [
        {
            id: 'bootcamp',
            title: 'Bootcamp',
            poster: '/src/poster/sqaintensif.png'
        },
        {
            id: 'online-offline-class',
            title: 'Online/Offline Class',
            poster: '/src/poster/sqa.png'
        },
        {
            id: 'workshop',
            title: 'Workshop',
            poster: '/src/poster/aiapps.png'
        },
        {
            id: 'webinar',
            title: 'Webinar',
            poster: '/src/poster/bestqa.png'
        }
    ]

    // Data pelatihan berdasarkan field yang dipilih
    const trainingData: Record<string, { title: string; description: string }> = {
        'bootcamp': {
            title: 'Software Quality Assurance',
            description: 'Peserta memahami fundamental software testing dan menerapkannya dalam pengujian software, baik skala kecil, menengah maupun skala besar'
        },
        'online-offline-class': {
            title: 'Software Quality Assurance',
            description: 'Peserta memahami fundamental software testing dan menerapkannya dalam pengujian software, baik skala kecil, menengah maupun skala besar'
        },
        'workshop': {
            title: 'Build Your First AI Apps',
            description: 'AI Development: Dari python dasar hingga membangun aplikasi AI pertamamu'
        },
        'webinar': {
            title: 'Software Quality Assurance: Best Practice',
            description: 'Membuka cakrawala pengetahuan seputar software quality assurance dan software testing'
        }
    }

    const currentTraining = trainingData[selectedField]
    const currentPoster = trainingFields.find(field => field.id === selectedField)?.poster || ''

    return (
        <>
            <section className="w-full py-12 px-4 sm:px-6 lg:px-8 lg:py-20">
                <div className="max-w-7xl mx-auto rounded-2xl bg-gradient-to-b from-[var(--color-primary-100)] to-[var(--color-primary-300)] relative overflow-hidden lg:h-[500px]">
                    {/* Container untuk layout 60-40 */}
                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 relative z-10">
                        {/* Konten Detail Pelatihan - 60% */}
                        <div className="w-full lg:w-[60%] space-y-6 lg:space-y-8 p-6 md:p-8 lg:p-12 lg:">
                            {/* Section Title & Description */}
                            <div className="space-y-4">
                                <Typography
                                    as="h2"
                                    size="xl"
                                    weight="semibold"
                                    color="neutral-950"
                                    className="text-2xl md:text-3xl lg:text-3xl"
                                >
                                    Pelatihan Mendatang
                                </Typography>
                                <Typography
                                    as="p"
                                    size="base"
                                    weight="normal"
                                    color="neutral-950"
                                    className="text-sm md:text-base leading-relaxed"
                                >
                                    Bergabunglah dengan program pelatihan terbaru kami dan tingkatkan skill teknis Anda bersama mentor berpengalaman.
                                </Typography>
                            </div>

                            {/* Field Training Menu */}
                            <div className="bg-[var(--color-primary-900)] rounded-full p-1">
                                <div className="flex">
                                    {trainingFields.map((field) => (
                                        <Button
                                            key={field.id}
                                            size="sm"
                                            shape="solid"
                                            color="neutral-50"
                                            className={`flex-auto h-auto text-xs sm:text-sm font-medium transition-all duration-200 border-0 lg:text-medium lg:px-1 lg:py-3 ${
                                                selectedField === field.id 
                                                ? 'text-[var(--color-neutral-50)] hover:text-[var(--color-accent-600)]' 
                                                : 'text-white hover:bg-[var(--color-accent-600)]'
                                            }`}
                                            onClick={() => setSelectedField(field.id)}
                                        >
                                            {field.title}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            {/* Training Details */}
                            <div className="space-y-4 lg:space-y-6 lg:mt-10">
                                <Typography
                                    as="h3"
                                    size="lg"
                                    weight="semibold"
                                    color="neutral-950"
                                    className="text-xl md:text-2xl lg:text-2xl"
                                >
                                    {currentTraining.title}
                                </Typography>
                                <Typography
                                    as="p"
                                    size="base"
                                    weight="normal"
                                    color="neutral-950"
                                    className="text-sm md:text-base leading-relaxed"
                                >
                                    {currentTraining.description}
                                </Typography>
                            </div>

                            {/* Training Button */}
                            <div className="">
                                <button 
                                    className="group flex items-center gap-2 text-[var(--color-accent-600)] hover:text-[var(--color-accent-700)] transition-colors duration-200 cursor-pointer"
                                    onClick={() => router.push(`/pelatihan/${selectedField}`)}
                                >
                                    <Typography
                                        as="span"
                                        size="sm"
                                        weight="semibold"
                                        color="accent-600"
                                        className="text-sm md:text-base group-hover:text-[var(--color-accent-700)]"
                                    >
                                        Lihat Detail
                                    </Typography>
                                    <Icon
                                        icon="arrow-right"
                                        type="image"
                                        src="/src/rightarrow.svg"
                                        size="sm"
                                        color="accent-600"
                                        alt="Arrow"
                                        className="transition-transform group-hover:translate-x-1 w-4 h-4 md:w-5 md:h-4 "
                                    />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Poster Area - Absolute Positioned Full Right */}
                    <div className="h-full absolute top-0 right-0 bottom-0 w-[30%%] hidden lg:block z-20">
                        <div 
                            className="relative w-full h-full cursor-pointer group"
                            onClick={handlePosterClick}
                        >
                            <Image
                                src={currentPoster}
                                alt={`${trainingFields.find(field => field.id === selectedField)?.title} Poster`}
                                fullWidth={true}
                                aspectRatio="auto"
                                shape="rounded"
                                fit="contain"
                                className="w-full h-full rounded-2xl transition-all duration-300 group-hover:scale-95"
                            />
                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                                <div className="bg-[var(--color-primary-900)] backdrop-blur-sm rounded-full py-2 px-4">
                                    <Typography
                                        as="span"
                                        size="sm"
                                        weight="medium"
                                        color="neutral-50"
                                        className="text-xs"
                                    >
                                        Klik untuk memperbesar
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Poster */}
                    <div className="w-full lg:hidden mt-6">
                        <div 
                            className="relative cursor-pointer group"
                            onClick={handlePosterClick}
                        >
                            <Image
                                src={currentPoster}
                                alt={`${trainingFields.find(field => field.id === selectedField)?.title} Poster`}
                                size="sm"
                                shape="rounded"
                                fit="cover"
                                className="w-full h-full rounded-2xl transition-all duration-300"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Poster Modal */}
            {showPosterModal && (
                <div 
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                    onClick={closePosterModal}
                >
                    <div className="relative lg:max-w-lg lg:max-h-[79vh] w-full">
                        <button
                            onClick={closePosterModal}
                            className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                        >
                            <Typography
                                as="span"
                                size="lg"
                                weight="normal"
                                color="neutral-50"
                            >
                                ✕ Tutup
                            </Typography>
                        </button>
                        <Image
                            src={currentPoster}
                            alt={`${trainingFields.find(field => field.id === selectedField)?.title} Poster`}
                            fullWidth={true}
                            aspectRatio="auto"
                            shape="rounded"
                            fit="contain"
                            className="w-full h-full rounded-2xl"
                        />
                    </div>
                </div>
            )}
        </>
    )
}
