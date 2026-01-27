import { Typography, Tag, Button, Image } from '@/components'

export default function ITEducationHero() {
    return (
        <section className="container mx-auto px-15 py-16 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Text Content - Left Side */}
                <div className="flex flex-col space-y-1 order-2 lg:order-1">
                    {/* Title */}
                    <Typography 
                        as="h1" 
                        size="xl" 
                        weight="bold" 
                        color="neutral-950"
                        className="lg:text-3xl"
                    >
                        Wujudkan Karir Digital Impianmu dengan Program Edukasi Kami
                    </Typography>

                    {/* Description */}
                    <Typography 
                        as="p" 
                        size="lg" 
                        weight="normal" 
                        color="neutral-600" 
                        leading="relaxed"
                    >
                        ArutalaLab tempat dimana Arutalians bisa berkembang menjadi IT talent yang handal dan siap kerja. Kami menyediakan pelatihan berkualitas, mengasah keterampilan, dan membuka jalan karir baru di dunia teknologi. Gabung dan wujudkan aspirasi Arutalians bersama kami! 
                    </Typography>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-4 py-6">
                        <Tag 
                            variant="outline" 
                            size="md"
                            color='accent-600'
                            className='text-black rounded-xl'
                        >
                            Microservices
                        </Tag>
                        <Tag 
                            variant="outline" 
                            size="md"
                            color='accent-600'
                            className='text-black rounded-xl'
                        >
                            UI/UX Design
                        </Tag>
                        <Tag 
                            variant="outline" 
                            size="md"
                            color='accent-600'
                            className='text-black rounded-xl'
                        >
                            Quality Assurance
                        </Tag>
                        <Tag 
                            variant="outline" 
                            size="md"
                            color='accent-600'
                            className='text-black rounded-xl'
                        >
                            Back-End Development
                        </Tag>
                        <Tag 
                            variant="outline" 
                            size="md"
                            color='accent-600'
                            className='text-black rounded-xl'
                        >
                            Front-End Development
                        </Tag>
                        <Tag 
                            variant="outline" 
                            size="md"
                            color='accent-600'
                            className='text-black rounded-xl'
                        >
                            Basic Agile
                        </Tag>
                        <Tag 
                            variant="outline" 
                            size="md"
                            color='accent-600'
                            className='text-black rounded-xl'
                        >
                            Artificial Intelligence Apps Development
                        </Tag>
                        <Tag 
                            variant="outline" 
                            size="md"
                            color='accent-600'
                            className='text-black rounded-xl'
                        >
                            Software Project Management
                        </Tag>
                        <Tag 
                            variant="outline" 
                            size="md"
                            color='accent-600'
                            className='text-black rounded-xl'
                        >
                            Mobile Development
                        </Tag>
                    </div>
                    
                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button 
                            shape="solid"
                            color="accent-600" 
                            size="lg"
                            className="w-full sm:w-auto"
                        >
                            Konsultasi
                        </Button>
                    </div>
                </div>

                {/* Image - Right Side */}
                <div className="relative order-1 lg:order-2 flex items-center justify-center lg:justify-center">
                    <div className="relative w-full max-w-[480px] h-[300px] sm:h-[400px] lg:h-[500px]">
                        <Image
                            src="/src/edu-hero.webp"
                            alt="IT Education Hero"
                            fullWidth
                            fit='cover'
                            shape='rounded'
                            loading='eager'
                            className='h-full w-full object-center'
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
