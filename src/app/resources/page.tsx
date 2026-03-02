import { HeroResource, CTA } from '@/components';
import ITField from '@/components/organisms/resource/ITField';
import ProfitSection from '@/components/organisms/resource/ProfitSection';
import TestimonialSection from '@/components/organisms/resource/TestimonialTalentSection';

export default function ResourcePage() {
    return (
        <main className="min-h-screen bg-white">
            <HeroResource />
            <ITField />
            <ProfitSection />
            {/* hide terlebih dahulu karena image belum tersedia */}
            <TestimonialSection />
            <CTA 
                title="Mencari Talent?"
                description="Jangan biarkan sumber daya manusia menghambat pengembangan proyek IT anda, konsultasikan segera dengan kami!" 
            />
        </main>
    );
}