import type { Metadata } from 'next'
import { HeroResource, CTA } from '@/components';
import ITField from '@/components/organisms/resource/ITField';
import ProfitSection from '@/components/organisms/resource/ProfitSection';
import TestimonialSection from '@/components/organisms/resource/TestimonialTalentSection';
import { getSeoData, buildMetadata, SITE_URL } from '@/lib/api/seo'

export async function generateMetadata(): Promise<Metadata> {
    const seo = await getSeoData('resources')
    return buildMetadata(seo, {
        fallbackTitle: 'Resources | ArutalaLab',
        fallbackDescription: 'Akses resources IT profesional seperti talent outsourcing, headhunting, dan konsultasi teknologi dari ArutalaLab.',
        pageUrl: `${SITE_URL}/resources`,
    })
}

export default function ResourcePage() {
    return (
        <main className="min-h-screen bg-white">
            <HeroResource />
            <ITField />
            <ProfitSection />
            {/* hide terlebih dahulu karena image belum tersedia */}
            {/* <TerstimonialSection /> */}
            <CTA 
                title="Mencari Talent?"
                description="Jangan biarkan sumber daya manusia menghambat pengembangan proyek IT anda, konsultasikan segera dengan kami!" 
            />
        </main>
    );
}