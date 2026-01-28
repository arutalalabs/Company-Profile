import { Typography, Tag, Button, Image } from '@/components'

export default function ITEducationHero() {
    return (
        <section className="container mx-auto max-w-xs sm:max-w-md md:max-w-xl lg:max-w-5xl 2xl:max-w-7xl py-16">
            <div className="grid grid-cols-1 lg:flex flex-col-2 gap-10 lg:gap-18 items-center">
                {/* Text Content - Left Side */}
                <div className="flex flex-col gap-2 lg:gap-0 order-2 lg:order-1">
                    {/* Title */}
                    <Typography 
                        as="h1" 
                        size="xl" 
                        weight="bold" 
                        color="neutral-950"
                        className="text-2xl sm:text-xl md:text-2xl 2xl:text-3xl"
                    >
                        Wujudkan Karir Digital Impianmu dengan Program Edukasi Kami
                    </Typography>

                    {/* Description */}
                    <Typography 
                        as="p" 
                        size="sm" 
                        weight="normal" 
                        color="neutral-600" 
                        leading="relaxed"
                        className="text-sm sm:text-sm md:text-sm lg:text-sm 2xl:text-lg"
                    >
                        <b>ArutalaLab</b> tempat dimana Arutalians bisa berkembang menjadi IT talent yang handal dan siap kerja. Kami menyediakan pelatihan berkualitas, mengasah keterampilan, dan membuka jalan karir baru di dunia teknologi. Gabung dan wujudkan aspirasi Arutalians bersama kami! 
                    </Typography>

                    {/* Tags */}
                    <div className="hidden lg:block lg:flex lg:flex-wrap lg:gap-4 lg:py-6">
                        <Tag 
                            variant="outline" 
                            size="sm"
                            color='accent-600'
                            className='text-black rounded-xl'
                        >
                            Microservices
                        </Tag>
                        <Tag 
                            variant="outline" 
                            size="sm"
                            color='accent-600'
                            className='text-black rounded-xl'
                        >
                            UI/UX Design
                        </Tag>
                        <Tag 
                            variant="outline" 
                            size="sm"
                            color='accent-600'
                            className='text-black rounded-xl'
                        >
                            Quality Assurance
                        </Tag>
                        <Tag 
                            variant="outline" 
                            size="sm"
                            color='accent-600'
                            className='text-black rounded-xl'
                        >
                            Back-End Development
                        </Tag>
                        <Tag 
                            variant="outline" 
                            size="sm"
                            color='accent-600'
                            className='text-black rounded-xl'
                        >
                            Front-End Development
                        </Tag>
                        <Tag 
                            variant="outline" 
                            size="sm"
                            color='accent-600'
                            className='text-black rounded-xl'
                        >
                            Basic Agile
                        </Tag>
                        <Tag 
                            variant="outline" 
                            size="sm"
                            color='accent-600'
                            className='text-black rounded-xl'
                        >
                            Artificial Intelligence Apps Development
                        </Tag>
                        <Tag 
                            variant="outline" 
                            size="sm"
                            color='accent-600'
                            className='text-black rounded-xl'
                        >
                            Software Project Management
                        </Tag>
                        <Tag 
                            variant="outline" 
                            size="sm"
                            color='accent-600'
                            className='text-black rounded-xl'
                        >
                            Mobile Development
                        </Tag>
                    </div>
                    
                    {/* Buttons */}
                    <div className="mt-4 lg:mt-0">
                        <Button 
                            shape="solid"
                            color="accent-600" 
                            size="lg"
                            className="w-auto"
                        >
                            Konsultasi
                        </Button>
                    </div>
                </div>

                {/* Image - Right Side */}
                <div className="relative order-1 lg:order-2 flex items-center justify-center lg:justify-end">
                    <div className="relative w-full max-w-[200px] max-h-[200px] sm:max-w-[300px] sm:max-h-[280px] md:w-[400px] md:h-[400px]">
                        <Image
                            src="/src/edu-hero.webp"
                            alt="IT Education Hero"
                            fullWidth
                            fit='fill'
                            shape='rounded'
                            loading='eager'
                            className='h-auto w-auto object-center'
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
