// types/testimonial.ts — Domain types for testimonials

export interface Testimonial {
    id: number
    text: string
    name: string
    company: string
    position: string
    image: string
}

export interface TestimonialSectionProps {
    category: string
    title: string
    sectionId?: string
    className?: string
}

// Types dari API response shape (digunakan oleh hook untuk transformasi)
export interface TestimoniData {
    author_name: string
    author_job_title: string
    author_company_name: string
    author_profile_url: string
    testimoni_content: string
}

export interface TestimoniCategory {
    testimoni_id: string
    author_name: string
    author_job_title: string
    author_company_name: string
    author_profile_url: string
    testimoni_content: string
}
