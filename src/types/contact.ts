// types/contact.ts — Domain types for contact form

export interface MessageFormData {
    senderName: string
    senderEmail: string
    organizationName?: string
    senderPhone: string
    subject: string[]
    messageBody: string
}

export interface FieldErrors {
    senderName?: string
    senderEmail?: string
    organizationName?: string
    senderPhone?: string
    subject?: string
    messageBody?: string
}

export interface UseContactFormReturn {
    /** Status loading saat submit */
    isSubmitting: boolean
    /** Status result dari submission */
    submitStatus: {
        type: 'success' | 'error' | null
        message: string
    }
    /** Field-level validation errors */
    fieldErrors: FieldErrors
    /** Function untuk submit form */
    submitForm: (data: MessageFormData) => Promise<boolean>
    /** Function untuk reset status */
    resetStatus: () => void
    /** Function untuk validate single field */
    validateField: (fieldName: keyof MessageFormData, value: any) => string | undefined
}
