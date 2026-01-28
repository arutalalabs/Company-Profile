import { Typography, Image } from '@/components'

interface CardData {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export default function WhyITEducation() {
  const cards: CardData[] = [
    {
      title: "Mentor Profesional",
      description: "Akses eksklusif ke jaringan mentor expert kami.",
      imageSrc: "/src/pro-mentor.png",
      imageAlt: "mentor profesional"
    },
    {
      title: "Simulasi Kerja Nyata",
      description: "Metode belajar menggunakan Project-based learning.",
      imageSrc: "/src/good-job.png",
      imageAlt: "simulasi kerja nyata"
    },
    {
      title: "Komunitas dan Networking",
      description: "Berkesempatan bertemu dengan orang-orang terbaik.",
      imageSrc: "/src/earth.png",
      imageAlt: "komunitas dan networking"
    }
  ];

  return (
    <section className="w-full px-4 py-12 md:pb-16">
        <div className="mx-auto max-w-xs sm:max-w-md md:max-w-xl lg:max-w-5xl 2xl:max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-4 2xl:grid-cols-4 gap-6 lg:gap-8">
                {/* Kolom 1: Title dan Deskripsi */}
                <div className="flex flex-col justify-center space-y-4">
                    <Typography 
                        as="h2" 
                        size="xl" 
                        weight="semibold" 
                        color="neutral-950"
                        leading='tight'
                        className="lg:text-3xl  2xl:text-4xl"
                    >
                        Mengapa ArutalaLab dapat Menjadi Pilihan Tepat
                    </Typography>
                    <Typography 
                        as="p"
                        size="sm"
                        weight="normal"
                        color="neutral-950"
                        className="lg:text-xs 2xl:text-sm"      
                    >
                        Di ArutalaLab, belajar hanyalah langkah awal. Kami mengintegrasikan pelatihan intensif berbasis standar industri dengan peluang nyata di dunia kerja. Melalui bimbingan mentor praktisi dan akses ke jaringan klien kami, kami memastikan transisi Anda dari peserta didik menjadi profesional yang siap berkarya berjalan mulus.
                    </Typography>
                </div>

                {/* Kolom 2-4: Cards */}
                {cards.map((card, index) => (
                    <div key={index} className="w-64 sm:w-72 mx-auto lg:w-full lg:flex lg:flex-col lg:justify-center">
                        <div className="bg-[var(--color-primary-300)] rounded-2xl flex flex-col h-full">
                            {/* Konten teks dengan flex-1 agar mengisi ruang */}
                            <div className="flex-1 flex flex-col">
                                <Typography 
                                    as="h3" 
                                    size="lg" 
                                    weight="semibold" 
                                    color="neutral-950" 
                                    leading='tight'
                                    className="mb-2 lg:text-2xl mx-4 mt-4 2xl:text-3xl"
                                >
                                    {card.title}
                                </Typography>
                                <Typography 
                                    as="p" 
                                    size="base" 
                                    weight="normal" 
                                    tracking="normal"
                                    color="neutral-950"
                                    className="mx-4 mb-4 lg:text-sm 2xl:text-base"
                                >
                                    {card.description}
                                </Typography>
                            </div>
                            
                            {/* Image tetap di bawah */}
                            <div className="bg-[var(--color-primary-900)] rounded-2xl flex items-center justify-center py-10 lg:py-8 2xl:py-11">
                                <div className="w-[110px] h-[110px] 2xl:w-[120px] 2xl:h-[120px] flex items-center justify-center">
                                    <Image
                                        src={card.imageSrc}
                                        alt={card.imageAlt}
                                        fit="contain"
                                        className="w-full h-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
}