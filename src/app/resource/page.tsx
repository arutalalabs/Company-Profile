import { HeroResource, CTA } from '@/components';
import ITField from '@/components/organisms/resource/ITField';
import ProfitSection from '@/components/organisms/resource/ProfitSection';
import TerstimonialSection from '@/components/organisms/resource/TerstimonialSection';

export default function ResourcePage() {
    return (
        <main className="min-h-screen bg-white">
            <HeroResource />
            <ITField />
            <ProfitSection />
            <TerstimonialSection />
            <CTA 
                title="Mencari Talent?"
                description="Jangan biarkan sumber daya manusia menghambat pengembangan proyek IT anda, konsultasikan segera dengan kami!" 
            />
        </main>
    );
}