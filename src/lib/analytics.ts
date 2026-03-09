type GtagEventParams = {
    [key: string]: string | number | boolean
}

export function trackEvent(eventName: string, params?: GtagEventParams): void {
    if (typeof window === 'undefined') return

    if (typeof window.gtag !== 'function') return

    window.gtag('event', eventName, params)
}

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
