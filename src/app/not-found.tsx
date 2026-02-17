import Link from 'next/link'
import { Typography, Button } from '@/components'

/**
 * Custom 404 Not Found page
 * Ditampilkan saat user mengakses URL yang tidak ada
 */
export default function NotFound() {
    return (
        <main className="min-h-screen bg-white">
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center max-w-md px-4">
                    <Typography
                        as="h1"
                        size="3xl"
                        weight="bold"
                        color="primary-900"
                        className="mb-2"
                    >
                        404
                    </Typography>
                    <Typography
                        as="h2"
                        size="xl"
                        weight="semibold"
                        color="neutral-950"
                        className="mb-4"
                    >
                        Halaman Tidak Ditemukan
                    </Typography>
                    <Typography
                        as="p"
                        size="base"
                        color="neutral-600"
                        className="mb-8"
                    >
                        Maaf, halaman yang Anda cari tidak tersedia atau telah
                        dipindahkan.
                    </Typography>
                    <Link href="/">
                        <Button
                            size="md"
                            shape="solid"
                            color="accent-600"
                        >
                            Kembali ke Beranda
                        </Button>
                    </Link>
                </div>
            </div>
        </main>
    )
}
