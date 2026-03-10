import type { Metadata } from 'next'
import { ContactInfo, ContactForm } from '@/components'
import { getSeoData, buildMetadata, SITE_URL } from '@/lib/api/seo'

export async function generateMetadata(): Promise<Metadata> {
    const seo = await getSeoData('kontak')
    return buildMetadata(seo, {
        fallbackTitle: 'Kontak | ArutalaLab',
        fallbackDescription: 'Hubungi tim ArutalaLab untuk informasi lebih lanjut tentang layanan IT Education, Resources, dan Software Services kami.',
        pageUrl: `${SITE_URL}/kontak`,
    })
}

export default function KontakPage() {
    return (
        <div className="min-h-screen bg-white py-10 lg:py-24 px-4 sm:px-6 lg:px-8">
            {/* Container dengan max width */}
            <div className="max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-5xl 2xl:max-w-7xl mx-auto">
                {/* Grid Layout 2 Kolom - Responsive */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    {/* Kolom Kiri - Informasi Kontak */}
                    <div className="lg:sticky lg:top-26">
                        <ContactInfo />
                    </div>

                    {/* Kolom Kanan - Form Kontak */}
                    <div>
                        <ContactForm />
                    </div>
                </div>
            </div>
        </div>
    )
}
