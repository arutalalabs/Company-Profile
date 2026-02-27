import React from 'react';

interface SectionWrapperProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
    background?: 'white' | 'gray' | 'gradient';
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
    children,
    className = '',
    id,
    background = 'white',
}) => {
    const backgrounds = {
        white: 'bg-white',
        gray: 'bg-gray-50',
        gradient: 'bg-gradient-to-b from-[var(--color-primary-400)] to-[var(--color-primary-100)]',
    };

    return (
        <section
            id={id}
            className={`py-16 md:py-24 ${backgrounds[background]} ${className}`}
        >
            <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-md md:max-w-2xl lg:max-w-5xl 2xl:max-w-7xl">
                {children}
            </div>
        </section>
    );
};

interface SectionTitleProps {
    title: string;
    subtitle?: string;
    centered?: boolean;
    light?: boolean;
    className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
    title,
    subtitle,
    centered = true,
    light = false,
    className = '',
}) => {
    const textColor = light ? 'text-white' : 'text-navy-900';
    const subtitleColor = light ? 'text-gray-300' : 'text-gray-600';
    const alignment = centered ? 'text-center' : 'text-left';

    return (
        <div className={`mb-12 ${alignment} ${className}`}>
            <h2 className={`text-3xl md:text-4xl font-bold ${textColor} mb-4`}>
                {title}
            </h2>
            {subtitle && (
                <p className={`text-lg ${subtitleColor} max-w-5xl ${centered ? 'mx-auto' : ''}`}>
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default SectionWrapper;
