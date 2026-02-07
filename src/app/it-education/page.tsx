import { CTA } from '@/components'
import { 
    ITEducationHero,
    WhyITEducation,
    LearningMethods,
    Mentor,
    TestimonialSection,
    AvailableCourse
} from '@/components/organisms/it-education'

export default function ITEducationPage() {
    return (
        <main className="min-h-screen bg-white">
            <ITEducationHero />
            <WhyITEducation />
            <LearningMethods />
            <Mentor/>
            <AvailableCourse />
            <TestimonialSection />
            <CTA />
        </main>
    )
}