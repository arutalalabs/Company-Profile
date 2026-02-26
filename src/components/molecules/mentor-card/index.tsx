import { Typography } from '@/components/atoms/typography'
import type { Contributor } from '@/types/course'

export interface MentorCardProps {
    contributor: Contributor
}

export function MentorCard({ contributor }: MentorCardProps) {
    return (
        <div className="relative w-full h-[400px] overflow-hidden rounded-3xl group">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundImage: `url(${contributor.contributor_profile_url})` }}
            />
            
            {/* Linear Gradient Overlay - White to Black (vertical) */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 from-0% via-black/40 via-50% to-black/90 to-100%" />
            
            {/* Content - Bottom Left */}
            <div className="absolute bottom-0 left-0 p-6">
                <Typography
                    as="h3"
                    size="lg"
                    weight="semibold"
                    color="neutral-50"
                    className="line-clamp-1"
                >
                    {contributor.contributor_name}
                </Typography>
                <Typography
                    as="p"
                    size="sm"
                    weight="normal"
                    color="neutral-50"
                    className="line-clamp-1 mb-2"
                >
                    {contributor.contributor_job_title}
                </Typography>
                <Typography
                    as="p"
                    size="sm"
                    weight="medium"
                    color="neutral-50"
                    className="opacity-80 line-clamp-1"
                >
                    {contributor.contributor_company_name}
                </Typography>
            </div>
        </div>
    )
}
