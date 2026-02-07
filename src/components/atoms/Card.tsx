import React from 'react';

interface CardCourseProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
}

export const CardCourse: React.FC<CardCourseProps> = ({
    children,
    className = '',
    hover = true
}) => {
    const hoverStyles = hover
        ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300'
        : '';

    return (
        <div className={`bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 ${hoverStyles} ${className}`}>
            {children}
        </div>
    );
};

interface CardHeaderProps {
    children: React.ReactNode;
    className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => (
    <div className={`mb-4 ${className}`}>{children}</div>
);

interface CardContentProps {
    children: React.ReactNode;
    className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => (
    <div className={className}>{children}</div>
);

interface CardFooterProps {
    children: React.ReactNode;
    className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => (
    <div className={`mt-4 ${className}`}>{children}</div>
);

export default CardCourse;
