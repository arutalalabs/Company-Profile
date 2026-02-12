import { Typography } from '@/components'

export default function AboutSection() {
    return (
        <section className="py-12 lg:py-20 px-4">
            <div className="container mx-auto px-4 py-4 sm:px-0 sm:py-0 sm:max-w-2xl lg:max-w-5xl 2xl:max-w-7xl">
                {/* Section Title */}
                <div className="text-center mb-6 lg:mb-8">
                    <Typography
                        as="h2"
                        size="xl"
                        weight="bold"
                        color="primary-900"
                        className="mb-4 text-xl md:text-2xl lg:text-start 2xl:text-3xl"
                    >
                        Apa itu Software Services
                    </Typography>

                    <Typography
                        as="p"
                        size="sm"
                        weight="normal"
                        color="neutral-950"
                        leading="relaxed"
                        className="lg:text-sm 2xl:text-base"
                    >
                        Software Services adalah layanan pengembangan perangkat lunak yang membantu bisnis di Indonesia menciptakan aplikasi berkualitas tinggi melalui proses yang terstruktur, mulai dari perencanaan, pengembangan, hingga pengujian. Dengan pendekatan yang sistematis, software services memastikan perangkat lunak yang dihasilkan aman, sesuai kebutuhan bisnis, dan siap digunakan oleh pengguna.
                    </Typography>
                </div>
            </div>
        </section>
    )
}
