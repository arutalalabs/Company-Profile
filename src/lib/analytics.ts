type GtagEventParams = {
    [key: string]: string | number | boolean
}

export function trackEvent(eventName: string, params?: GtagEventParams): void {
    if (typeof window === 'undefined') return

    if (typeof window.gtag !== 'function') return

    window.gtag('event', eventName, params)
}

// Scroll Depth Events
export function trackScrollDepth(percent: number): void {
    trackEvent('percent_scrolled', { percent })
}

// Header Events
export function trackHeaderNavClick(label: string): void {
    trackEvent('header_nav_click', { label })
}

export function trackHeaderMobileMenuToggle(action: 'open' | 'close'): void {
    trackEvent('header_mobile_menu_toggle', { action })
}

// Footer Events
export function trackFooterNavClick(label: string): void {
    trackEvent('footer_nav_click', { label })
}

export function trackFooterSocialClick(platform: string): void {
    trackEvent('footer_social_click', { platform })
}

// Landing Page Events
export function trackHeroContactClick(): void {
    trackEvent('hero_contact_click')
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

export function trackTestimonialClick(source: string, category: string, buttonType: string): void {
    trackEvent('testimonial_click', { source, category, button_type: buttonType })
}

// Article Events
export function trackArticleReadMoreClick(title: string): void {
    trackEvent('article_read_more_click', { title })
}

export function trackArticleViewAllClick(): void {
    trackEvent('article_view_all_click')
}

// CTA Events
export function trackCTAClick(): void {
    trackEvent('cta_click')
}


// IT Education Page Events
export function trackLearningMethodCategoryClick(category: string): void {
    trackEvent('learning_method_category_click', { category })
}

export function trackAvailableCourseClick(): void {
    trackEvent('available_course_click')
}

// Course Detail Page Events
export function trackCourseDaftarClick(courseTitle: string, source: 'hero' | 'schedule_table'): void {
    trackEvent('course_daftar_click', { course_title: courseTitle, source })
}

export function trackCourseLihatDetailClick(courseTitle: string): void {
    trackEvent('course_lihat_detail_click', { course_title: courseTitle })
}

export function trackCourseExpandToggle(action: 'expand' | 'collapse'): void {
    trackEvent('course_expand_toggle', { action })
}

export function trackCourseFAQToggle(question: string, action: 'expand' | 'collapse'): void {
    trackEvent('course_faq_toggle', { question, action })
}


// Resource Page Events
export function trackITFieldHover(fieldTitle: string): void {
    trackEvent('it_field_hover', { field_title: fieldTitle })
}


// Software Services Page Events
export function trackProcessPhaseClick(phaseTitle: string): void {
    trackEvent('process_phase_click', { phase_title: phaseTitle })
}


// Profile Page Events
export function trackIndustrySolutionTabClick(tabLabel: string): void {
    trackEvent('industry_solution_tab_click', { tab_label: tabLabel })
}


// Article Pagination Events
export function trackArticlePaginationClick(page: number): void {
    trackEvent('article_pagination_click', { page })
}

export function trackArticleHeroPaginationClick(direction: 'prev' | 'next' | 'dot', slideIndex: number): void {
    trackEvent('article_hero_pagination_click', { direction, slide_index: slideIndex })
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
