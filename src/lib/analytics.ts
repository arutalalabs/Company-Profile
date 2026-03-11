type GtagEventParams = {
    [key: string]: string | number | boolean
}

export function trackEvent(eventName: string, params?: GtagEventParams): void {
    if (typeof window === 'undefined') return

    if (typeof window.gtag !== 'function') return

    window.gtag('event', eventName, params)
}

// Landing Page Events
export function trackHeroContactClick(source: string = 'landing_page'): void {
    trackEvent('hero_contact_click', { source })
}

export function trackHeroUpcomingCourseClick(): void {
    trackEvent('hero_upcoming_course_click', { source: 'landing_page' })
}

export function trackServiceCardClick(label: string): void {
    trackEvent('service_card_click', { label })
}

export function trackCourseCategoryClick(category: string): void {
    trackEvent('course_category_click', { category })
}

export function trackCourseDetailClick(courseTitle: string, category: string): void {
    trackEvent('course_detail_click', { course_title: courseTitle, category })
}

export function trackTestimonialClick(source: string, category:string, buttonType: string): void {
    trackEvent('testimonial_click', { source, category, button_type: buttonType })
}

// Article Events
export function trackArticleReadMoreClick(): void {
    trackEvent('article_read_more_click')
}

export function trackArticleViewAllClick(): void {
    trackEvent('article_view_all_click')
}

// CTA Events
export function trackCTAClick(): void {
    trackEvent('cta_click')
}

// Scroll Depth Events
export function trackScrollDepth(percent: number): void {
    trackEvent('percent_scrolled', { percent })
}

// Contact Form Events
export function trackContactFormSubmit(subjects: string[]): void {
    trackEvent('contact_form_submit', {
        subjects: subjects.join(', '),
    })
}

export function trackContactFormSuccess(subjects: string[]): void {
    trackEvent('contact_form_success', {
        subjects: subjects.join(', '),
    })
}

export function trackContactFormError(subjects: string[], reason: string): void {
    trackEvent('contact_form_error', {
        subjects: subjects.join(', '),
        reason,
    })
}

