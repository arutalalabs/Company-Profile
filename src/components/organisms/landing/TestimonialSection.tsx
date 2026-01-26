'use client'
import { Typography, Button, Icon, Image } from '@/components'
import { useState } from 'react'

export default function TestimonialSection() {
    const [currentTestimonial, setCurrentTestimonial] = useState(0)

    // Data testimoni
    const testimonials = [
        {
            id: 1,
            text: "ArutalaLab memberikan pengalaman belajar yang luar biasa. Program bootcamp mereka sangat terstruktur dan mentor-mentornya berpengalaman. Setelah menyelesaikan program, saya berhasil mendapatkan pekerjaan sebagai Software Tester di perusahaan teknologi ternama.",
            name: "Sarah Wijaya",
            company: "TechnoID Solutions",
            position: "Software Quality Assurance",
            image: "/src/mentor/Aldy Akbarrizky Senior Software Developer PT. Padepokan Tujuh Sembilan.webp"
        },
        {
            id: 2,
            text: "Pelatihan di ArutalaLab benar-benar mengubah karir saya. Materi yang diberikan sangat up-to-date dengan kebutuhan industri dan praktek langsung yang sangat membantu memahami konsep-konsep kompleks dalam software testing.",
            name: "Ahmad Rizki",
            company: "Digital Innovation Corp",
            position: "QA Engineer",
            image: "/src/mentor/Annisa Tika -Head of Social Media at Finansialku.webp"
        },
        {
            id: 3,
            text: "Workshop AI Development di ArutalaLab membuka wawasan saya tentang teknologi AI. Tim instruktur sangat kompeten dan metode pembelajarannya sangat engaging. Highly recommended untuk yang ingin terjun ke dunia AI!",
            name: "Maria Santos",
            company: "AI Startup Indonesia",
            position: "AI Developer",
            image: "/src/mentor/Asri Maspupah Dosen Teknik Informatika - Politeknik Negeri Bandung.webp"
        }
    ]

    // Functions untuk testimonial navigation
    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    const goToTestimonial = (index: number) => {
        setCurrentTestimonial(index)
    }

    return (
        <section className="bg-[#ffffff] w-full py-12 px-4 sm:px-6 lg:px-8 lg:py-20">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
                    <div className="flex-1">
                        <Typography
                            as="h2"
                            size="xl"
                            weight="semibold"
                            color="neutral-950"
                            className="text-2xl md:text-3xl lg:text-3xl"
                        >
                            Testimoni Peserta
                        </Typography>
                    </div>
                    
                    {/* Navigation Buttons */}
                    <div className="flex gap-2 sm:gap-3">
                        <Button
                            size="sm"
                            shape="outline"
                            color="accent-600"
                            onClick={prevTestimonial}
                            className="w-10 h-10 sm:w-12 sm:h-12 p-0 rounded-full border-2 hover:bg-[var(--color-accent-50)] transition-all duration-200"
                        >
                            <Icon
                                icon="arrow-left"
                                type="image"
                                src="/src/leftarrow.svg"
                                size="sm"
                                color="accent-600"
                                alt="Previous"
                                className="w-4 h-4 sm:w-5 sm:h-5"
                            />
                        </Button>
                        <Button
                            size="sm"
                            shape="outline"
                            color="accent-600"
                            onClick={nextTestimonial}
                            className="w-10 h-10 sm:w-12 sm:h-12 p-0 rounded-full border-2 hover:bg-[var(--color-accent-50)] transition-all duration-200"
                        >
                            <Icon
                                icon="arrow-right"
                                type="image"
                                src="/src/rightarrow.svg"
                                size="sm"
                                color="accent-600"
                                alt="Next"
                                className="w-4 h-4 sm:w-5 sm:h-5"
                            />
                        </Button>
                    </div>
                </div>

                {/* Testimonial Card */}
                <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden transition-all duration-300 hover:shadow-[0_12px_40px_rgb(0,0,0,0.15)]">
                    <div className="flex flex-col lg:flex-row min-h-[320px] sm:min-h-[350px] lg:min-h-[400px]">
                        {/* Left Content */}
                        <div className="flex-1 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
                            {/* Testimonial Text */}
                            <div className="mb-6 lg:mb-8">
                                <Typography
                                    as="p"
                                    size="lg"
                                    weight="normal"
                                    color="neutral-950"
                                    leading="relaxed"
                                    className="text-base sm:text-lg lg:text-base italic"
                                >
                                    "{testimonials[currentTestimonial].text}"
                                </Typography>
                            </div>

                            {/* Divider Line */}
                            <div className="w-full h-0.5 bg-[var(--color-primary-600)] mb-6 lg:mb-8"></div>

                            {/* Author Info */}
                            <div className="space-y-1">
                                <Typography
                                    as="h4"
                                    size="lg"
                                    weight="semibold"
                                    color="neutral-950"
                                    className="text-lg sm:text-xl"
                                >
                                    {testimonials[currentTestimonial].name}
                                </Typography>
                                <Typography
                                    as="p"
                                    size="base"
                                    weight="medium"
                                    color="accent-600"
                                    className="text-sm sm:text-base"
                                >
                                    {testimonials[currentTestimonial].position}
                                </Typography>
                                <Typography
                                    as="p"
                                    size="base"
                                    weight="normal"
                                    color="neutral-600"
                                    className="text-sm sm:text-base"
                                >
                                    {testimonials[currentTestimonial].company}
                                </Typography>
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="w-full lg:w-2/5 xl:w-1/3 h-48 sm:h-64 lg:h-auto overflow-hidden">
                            <Image
                                src={testimonials[currentTestimonial].image}
                                alt={testimonials[currentTestimonial].name}
                                fullWidth={true}
                                aspectRatio="square"
                                shape="square"
                                fit="cover"
                                className="w-full h-full object-cover object-center"
                            />
                        </div>
                    </div>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center mt-8 lg:mt-12">
                    <div className="flex gap-3">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToTestimonial(index)}
                                className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
                                    index === currentTestimonial
                                        ? 'bg-[var(--color-accent-600)] scale-110'
                                        : 'bg-[var(--color-accent-400)] hover:bg-[var(--color-accent-500)] hover:scale-105'
                                }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
