// types/profile.ts

export interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  imageSrc?: string;
}

export interface VisionData {
  title: string;
  description?: string;
}

export interface MissionItem {
  text: string;
}

export interface VisionMissionProps {
  title?: string;
  vision?: VisionData;
  missions?: MissionItem[];
  imageSrc?: string;
}