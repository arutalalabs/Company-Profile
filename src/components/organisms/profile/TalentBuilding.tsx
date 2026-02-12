'use client';

import { Image } from '@/components/atoms/image';
import SectionWrapper, { SectionTitle } from '@/components/atoms/SectionWrapper';

interface TalentBuildingProps {
  title?: string;
  description?: string;
  images?: string[];
}

export default function TalentBuilding({
  title = "Bangun Talenta Bersama ArutalaLab",
  description = "ArutalaLab menyelenggarakan pelatihan IT yang berkualitas melalui bootcamp, kelas online/offline, workshop, dan webinar untuk meningkatkan kompetensi digital individu maupun kalangan industri.",
  images = []
}: TalentBuildingProps) {
  const displayImages = [...images, ...images, ...images, ...images]; // Duplicate for seamless loop

  return (
    <SectionWrapper 
        className="overflow-hidden bg-gradient-to-b from-[var(--color-primary-400)] to-[var(--color-primary-100)]"
    >
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
      <SectionTitle
        title={title}
        subtitle={description}
        centered
      />

      <div className="w-full relative">
        <div className="flex animate-marquee gap-6 md:gap-8 w-max px-4">
          {displayImages.map((src, index) => (
            <div 
              key={index} 
              className="relative w-[300px] md:w-[340px] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex-shrink-0"
            >
              <Image
                src={src}
                alt={`Talent Building Activity ${index + 1}`}
                aspectRatio="auto"
                fullWidth
                fit="cover"
                className="wfull h-full object-cover "
              />
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
