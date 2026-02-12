import { Typography, Image } from '@/components';
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
  imageSrc = "/src/profile/hero-classroom.jpg"
}: HeroSectionProps) {
  return (
    <SectionWrapper background="white" className="py-12 md:py-20">
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-4">
        {/* Text Content */}
        <div className="flex-1 space-y-8">
          <div className="">
            <Typography 
              as="h1" 
              size="2xl" 
              weight="bold" 
              color="neutral-950"
              className="text-2xl md:text-3xl lg:text-4xl"
            >
              {title}
            </Typography>
            <Typography 
              as="h2" 
              size="xl" 
              weight="medium" 
              color="neutral-600"
              className="text-xl md:text-xl"
            >
              {subtitle}
            </Typography>
          </div>
          
          <Typography 
            as="p" 
            size="base" 
            color="neutral-600" 
            leading="relaxed"
            className="text-base md:text-lg max-w-2xl"
          >
            {description}
          </Typography>
        </div>

        {/* Image */}
        <div className="flex-1 w-full max-w-2xl flex justify-center lg:justify-end">
          <div className="relative w-lg aspect-[4/3] rounded-tl-[50px] rounded-br-[50px] overflow-hidden shadow-xl">
            <Image
              src={imageSrc}
              alt="ArutalaLab Team"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}