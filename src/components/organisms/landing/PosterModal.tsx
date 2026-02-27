import { Image, Typography } from '@/components'
import type { UpcomingCourse } from '@/types/course'

interface PosterModalProps {
    course: UpcomingCourse
    posterUrl: string
    onClose: () => void
}

export function PosterModal({ course, posterUrl, onClose }: PosterModalProps) {
    return (
        <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div className="relative lg:max-w-lg lg:max-h-[79vh] w-full">
                <button
                    onClick={onClose}
                    className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                >
                    <Typography as="span" size="lg" weight="normal" color="neutral-50">
                        ✕ Tutup
                    </Typography>
                </button>
                <Image
                    src={posterUrl}
                    alt={`${course.course_title} Poster`}
                    fullWidth={true}
                    aspectRatio="auto"
                    shape="rounded"
                    fit="contain"
                    className="w-full h-full rounded-2xl"
                />
            </div>
        </div>
    )
}