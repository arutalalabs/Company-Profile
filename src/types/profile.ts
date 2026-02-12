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
export interface TalentBuildingProps {
  title?: string;
  description?: string;
  images?: string[];
}

export interface ServiceTab {
  id: string;
  label: string;
  title: string;
  description: string;
  imageSrc: string;
}

export interface IndustrySolutionsProps {
  mainTitle?: string;
  tabs?: ServiceTab[];
}