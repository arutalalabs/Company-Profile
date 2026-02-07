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
  imageSrc = "/src/vision-mission.png"
}: VisionMissionProps) {
  const checkIcon = (
    <svg 
      className="w-6 h-6" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
      />
    </svg>
  );

  return (
    <SectionWrapper background="gray" className="py-12 md:py-20">
      <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-12">
        {/* Text Content */}
        <div className="flex-1 space-y-8">
          <Typography 
            as="h2" 
            size="5xl" 
            weight="bold" 
            color="neutral-950"
            className="text-3xl md:text-4xl lg:text-5xl"
          >
            {title}
          </Typography>
          
          {/* Vision */}
          <div className="space-y-4">
            <Typography 
              as="h3" 
              size="2xl" 
              weight="semibold" 
              color="neutral-950"
              className="text-xl md:text-2xl"
            >
              {vision.title}
            </Typography>
            {vision.description && (
              <Typography 
                as="p" 
                size="lg" 
                color="neutral-600" 
                leading="relaxed"
                className="text-base md:text-lg"
              >
                {vision.description}
              </Typography>
            )}
          </div>

          {/* Missions */}
          <div className="space-y-4">
            {missions.map((mission, index) => (
              <div key={index} className="flex gap-3 items-start">
                <div className="flex-shrink-0 w-6 h-6 mt-1">
                  <Icon 
                    icon={checkIcon} 
                    size="md" 
                    color="primary-600"
                  />
                </div>
                <Typography 
                  as="p" 
                  size="lg" 
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
          <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
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