import Image from 'next/image';
import { Typography } from '@/components/atoms/typography';
import { SectionWrapper } from '@/components/atoms/SectionWrapper';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  imageSrc?: string;
}

export default function HeroSection({
  title = "ArutalaLab",
  subtitle = "Transformasi Karir dan Solusi Digital Berkualitas",
  description = "Menghadirkan revolusi pendidikan dan solusi teknologi, ArutalaLab adalah wujud dari visi kami untuk mengubah wajah industri IT. Dibangun pada tahun 2022, kami berkomitmen untuk mencetak profesional IT masa depan, memberikan layanan Manpower terbaik, dan software services yang berkualitas.",
  imageSrc = "/src/hero-classroom.png"
}: HeroSectionProps) {
  return (
    <SectionWrapper background="white" className="py-12 md:py-20">
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0">
        {/* Text Content */}
        <div className="flex-1 space-y-6">
          <div className="space-y-4">
            <Typography 
              as="h1" 
              size="5xl" 
              weight="bold" 
              color="neutral-950"
              className="text-4xl md:text-5xl lg:text-6xl"
            >
              {title}
            </Typography>
            <Typography 
              as="h2" 
              size="2xl" 
              weight="medium" 
              color="neutral-600"
              className="text-xl md:text-2xl"
            >
              {subtitle}
            </Typography>
          </div>
          
          <Typography 
            as="p" 
            size="lg" 
            color="neutral-600" 
            leading="relaxed"
            className="text-base md:text-lg max-w-2xl"
          >
            {description}
          </Typography>
        </div>

        {/* Image */}
        <div className="flex-1 w-full max-w-2xl flex justify-end">
          <div className="relative w-lg aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
            <Image
              src={imageSrc}
              alt="ArutalaLab Team"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}