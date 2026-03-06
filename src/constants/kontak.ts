import type { MessageFormData } from '@/types/contact'

// ============================================
// ContactForm — Subject options
// ============================================

export const CONTACT_SUBJECT_OPTIONS: { value: string; label: string }[] = [
    { value: 'IT Education', label: 'IT Education' },
    { value: 'Resources', label: 'Resources' },
    { value: 'Software Services', label: 'Software Services' },
    { value: 'Partner', label: 'Partner' },
    { value: 'Lainnya', label: 'Lainnya' },
]

// ============================================
// ContactForm — Initial form state
// ============================================

export const INITIAL_FORM_DATA: MessageFormData = {
    senderName: '',
    senderEmail: '',
    organizationName: '',
    senderPhone: '',
    subject: [],
    messageBody: '',
}

// ============================================
// ContactInfo — Contact details
// ============================================

export const CONTACT_DETAILS = {
    email: 'admin@arutalab.com',
    whatsapp: '0851-8316-6005',
} as const
