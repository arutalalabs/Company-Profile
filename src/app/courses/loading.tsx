import { Typography } from '@/components'

export default function Loading() {
    return (
        <main className="min-h-screen bg-white">
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-[var(--color-primary-200)] border-t-[var(--color-accent-600)] rounded-full animate-spin mx-auto mb-4" />
                    <Typography as="p" size="base" color="neutral-600">
                        Memuat pelatihan...
                    </Typography>
                </div>
            </div>
        </main>
    )
}
