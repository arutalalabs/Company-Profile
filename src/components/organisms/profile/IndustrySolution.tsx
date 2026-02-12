'use client';

import { useState } from 'react';
import { Button } from '@/components/atoms/button';
import { Typography } from '@/components/atoms/typography';
import { Image } from '@/components/atoms/image';
import SectionWrapper, { SectionTitle } from '@/components/atoms/SectionWrapper';

interface ServiceTab {
  id: string;
  label: string;
  title: string;
  description: string;
  imageSrc: string;
}

interface IndustrySolutionsProps {
  mainTitle?: string;
  tabs?: ServiceTab[];
}

export default function IndustrySolutions({
  mainTitle = "Solusi untuk semua Industri",
  tabs = [
    {
      id: "education",
      label: "IT Education",
      title: "Solusi Bagi Fresh Graduated",
      description: "Kami menyediakan program pendidikan dan pelatihan IT yang dirancang khusus untuk fresh graduate agar siap terjun ke dunia kerja. Materi disusun sesuai kebutuhan industri, dilengkapi dengan pembelajaran praktis untuk meningkatkan skill teknis dan profesional.",
      imageSrc: "/images/fresh-graduate.jpg"
    },
    {
      id: "resource",
      label: "IT Resource",
      title: "Penyediaan IT Resource",
      description: "Layanan head hunting dan outsourcing IT profesional untuk memenuhi kebutuhan SDM teknologi perusahaan Anda dengan talenta terbaik yang tersertifikasi.",
      imageSrc: "/images/it-resource.jpg"
    },
    {
      id: "software",
      label: "Software Services",
      title: "Pengembangan Software",
      description: "Solusi pengembangan software custom yang disesuaikan dengan kebutuhan bisnis Anda, dari konsep hingga implementasi dan maintenance.",
      imageSrc: "/images/software-dev.jpg"
    }
  ]
}: IndustrySolutionsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const currentTab = tabs.find(tab => tab.id === activeTab) || tabs[0];

  return (
    <SectionWrapper>
      {/* Main Title */}
      <SectionTitle title={mainTitle} className="mb-12 md:mb-16" />

      {/* Tab Navigation */}
      <div className="flex flex-col items-center mb-12 md:mb-16">
        {/* Mobile: Dropdown */}
        <div className="sm:hidden relative z-20">
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-auto bg-[var(--color-accent-600)] text-[var(--color-neutral-950)] rounded-full px-6 py-3 text-sm gap-4 font-medium flex items-center justify-between shadow-md"
            >
                <span>{currentTab.label}</span>
                <svg 
                    className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            
            {isDropdownOpen && (
                <>
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setIsDropdownOpen(false)}
                    />
                    
                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-[240px] mt-2 bg-[var(--color-primary-900)] rounded-2xl shadow-lg z-20 overflow-hidden">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => {
                                    setActiveTab(tab.id);
                                    setIsDropdownOpen(false);
                                }}
                                className={`w-full text-center px-4 py-3 text-sm font-medium transition-colors border-b border-[var(--color-primary-800)] last:border-0 ${
                                    activeTab === tab.id
                                        ? 'bg-[var(--color-accent-600)] text-[var(--color-neutral-950)]'
                                        : 'text-[var(--color-neutral-50)] hover:bg-[var(--color-accent-600)] hover:text-[var(--color-neutral-950)]'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>

        {/* Desktop: Button Group */}
        <div className="hidden sm:flex bg-[var(--color-primary-900)] rounded-full p-1 flex-wrap justify-center">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              size="md"
              shape="solid"
              color="neutral-50"
              className={`flex-auto h-auto text-xs sm:text-sm font-medium transition-all duration-200 border-0 lg:text-medium px-6 py-2 md:px-8 md:py-3 rounded-full ${
                activeTab === tab.id 
                ? 'bg-[var(--color-accent-600)] text-[var(--color-neutral-950)] hover:bg-[var(--color-accent-700)]' 
                : 'bg-transparent text-[var(--color-neutral-50)] hover:bg-[var(--color-accent-600)] hover:text-[var(--color-neutral-950)]'
            }`}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gray-200 mb-12"></div>

      {/* Content Area */}
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 max-w-6xl mx-auto">
        {/* Text Content */}
        <div className="flex-1 space-y-6">
          <Typography as="h3" size="3xl" weight="bold" color="neutral-950">
            {currentTab.title}
          </Typography>
          <Typography as="p" size="lg" color="neutral-600" leading="relaxed">
            {currentTab.description}
          </Typography>
        </div>

        {/* Image */}
        <div className="flex-1 w-full max-w-lg">
          <div className="relative w-full rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={currentTab.imageSrc}
              alt={currentTab.title}
              aspectRatio="landscape"
              fullWidth
              fit="cover"
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}