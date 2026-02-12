import Image from 'next/image';
import { Typography } from '@/components/atoms/typography';
import { Icon } from '@/components/atoms/icon';
import { SectionWrapper } from '@/components/atoms/SectionWrapper';

interface VisionMissionItem {
  text: string;
}

interface VisionMissionProps {
  title?: string;
  vision?: {
    title: string;
    description: string;
  };
  missions?: VisionMissionItem[];
  imageSrc?: string;
}

export default function VisionMission({
  title = "Visi & Misi",
  vision = {
    title: "Mendorong percepatan peningkatan kualitas SDM IT untuk menyongsong Indonesia Emas 2045.",
    description: ""
  },
  missions = [
    { text: "Mewujudkan mimpi menjadi bagian dalam pengembangan IT melalui pelatihan IT." },
    { text: "Menjadi pilihan utama dalam penyediaan IT resource melalui layanan head hunting dan outsource." },
    { text: "Menjadi mitra tepercaya dalam mendukung penyediaan software bagi industri dan" }
  ],
  imageSrc = "/src/profile/vision-mission.jpg"
}: VisionMissionProps) {

  return (
    <SectionWrapper background="gray" className="py-12 md:py-20 md:pb-40">
      <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-12">
        {/* Text Content */}
        <div className="flex-1">
          <Typography 
            as="h2" 
            size="2xl" 
            weight="bold" 
            color="neutral-950"
            className="text-2xl md:text-3xl lg:text-4xl"
          >
            {title}
          </Typography>
          
          {/* Vision */}
          <div className="mb-8">
            <Typography 
              as="h3" 
              size="lg" 
              weight="medium" 
              color="neutral-950"
              className="text-lg md:text-xl"
            >
              {vision.title}
            </Typography>
            {vision.description && (
              <Typography 
                as="p" 
                size="base" 
                color="neutral-600" 
                leading="relaxed"
                className="text-base md:text-lg"
              >
                {vision.description}
              </Typography>
            )}
          </div>

          {/* Missions */}
          <div className="space-y-2">
            {missions.map((mission, index) => (
              <div key={index} className="flex gap-3 items-start">
                <Typography 
                  as="p" 
                  size="base" 
                  color="neutral-600" 
                  leading="relaxed"
                  className="text-base md:text-lg flex-1"
                >
                  {mission.text}
                </Typography>
              </div>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="flex-1 w-full max-w-2xl">
          <div className="relative w-full h-[420px] aspect-[4/3] rounded-br-[50px] overflow-hidden shadow-xl">
            <Image
              src={imageSrc}
              alt="Vision and Mission"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}