/**
 * Custom Hook untuk Contact Form
 * Menangani submit logic, loading state, dan error handling
 */

import { useState } from 'react'
import { messagesApi, type MessageFormData } from '@/lib/api/messages'

/**
 * Field-level validation errors
 */
interface FieldErrors {
    senderName?: string
    senderEmail?: string
    organizationName?: string
    senderPhone?: string
    subject?: string
    messageBody?: string
}

/**
 * Return type dari useContactForm hook
 */
interface UseContactFormReturn {
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

/**
 * Custom hook untuk mengelola contact form submission
 *
 * Features:
 * - Loading state management
 * - Error handling
 * - Success feedback
 * - Type-safe API calls
 *
 * @returns Object berisi state dan functions untuk form handling
 *
 * @example
 * ```tsx
 * function ContactForm() {
 *   const { isSubmitting, submitStatus, submitForm } = useContactForm()
 *
 *   const handleSubmit = async (e: FormEvent) => {
 *     e.preventDefault()
 *     const success = await submitForm(formData)
 *     if (success) {
 *       // Reset form atau redirect
 *     }
 *   }
 *
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       {submitStatus.type === 'error' && (
 *         <p>{submitStatus.message}</p>
 *       )}
 *       <button disabled={isSubmitting}>
 *         {isSubmitting ? 'Mengirim...' : 'Kirim'}
 *       </button>
 *     </form>
 *   )
 * }
 * ```
 */
export function useContactForm(): UseContactFormReturn {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<{
        type: 'success' | 'error' | null
        message: string
    }>({ type: null, message: '' })
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

    /**
     * Validation rules based on backend MessageCreateModel
     */
    const validationRules = {
        senderName: {
            minLength: 3,
            maxLength: 50,
            message: 'Nama pengirim harus antara 3 sampai 50 karakter'
        },
        senderEmail: {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Format email tidak valid'
        },
        organizationName: {
            minLength: 2,
            maxLength: 100,
            message: 'Nama organisasi minimal 2 karakter'
        },
        senderPhone: {
            pattern: /^[0-9]{10,15}$/,
            message: 'Nomor telepon harus berupa angka (10-15 digit)'
        },
        subject: {
            minItems: 1,
            message: 'Isi minimal satu subjek'
        },
        messageBody: {
            minLength: 10,
            maxLength: 2000,
            message: 'Pesan minimal 10 karakter dan maksimal 2000 karakter'
        }
    }

    /**
     * Validate single field
     * @param fieldName - Field to validate
     * @param value - Field value
     * @returns Error message or undefined if valid
     */
    const validateField = (fieldName: keyof MessageFormData, value: any): string | undefined => {
        const rules = validationRules[fieldName]
        if (!rules) return undefined

        // Validate string fields
        if (fieldName !== 'subject') {
            const strValue = String(value || '')

            // Check minLength
            if ('minLength' in rules && strValue.length < rules.minLength) {
                return rules.message
            }

            // Check maxLength
            if ('maxLength' in rules && strValue.length > rules.maxLength) {
                return rules.message
            }

            // Check pattern
            if ('pattern' in rules && !rules.pattern.test(strValue)) {
                return rules.message
            }
        }

        // Validate subject array
        if (fieldName === 'subject') {
            const arrayValue = Array.isArray(value) ? value : []
            if ('minItems' in rules && arrayValue.length < rules.minItems) {
                return rules.message
            }
        }

        return undefined
    }

    /**
     * Validate all fields
     * @param data - Form data to validate
     * @returns Field errors object
     */
    const validateAllFields = (data: MessageFormData): FieldErrors => {
        const errors: FieldErrors = {}

        Object.keys(data).forEach((key) => {
            const fieldName = key as keyof MessageFormData
            const error = validateField(fieldName, data[fieldName])
            if (error) {
                errors[fieldName] = error
            }
        })

        return errors
    }

    /**
     * Submit form data ke API
     *
     * @param data - Form data yang akan dikirim
     * @returns Promise<boolean> - true jika berhasil, false jika gagal
     */
    const submitForm = async (data: MessageFormData): Promise<boolean> => {
        setIsSubmitting(true)
        setSubmitStatus({ type: null, message: '' })
        setFieldErrors({})

        // Client-side validation
        const errors = validateAllFields(data)
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors)
            setSubmitStatus({
                type: 'error',
                message: 'Mohon periksa kembali form Anda'
            })
            setIsSubmitting(false)
            return false
        }

        try {
            const response = await messagesApi.send(data)

            if (response.success) {
                setSubmitStatus({
                    type: 'success',
                    message:
                        response.message ||
                        'Pesan Anda berhasil terkirim! Kami akan segera merespon.'
                })
                setFieldErrors({})
                return true
            } else {
                throw new Error(response.message || 'Gagal mengirim pesan')
            }
        } catch (error) {
            // Parse error untuk field-specific errors dari backend
            let errorMessage = 'Terjadi kesalahan. Silakan coba lagi.'
            
            if (error instanceof Error) {
                errorMessage = error.message
                
                // Try to parse field errors from API response
                try {
                    const errorData = JSON.parse(error.message)
                    if (errorData.errors && typeof errorData.errors === 'object') {
                        setFieldErrors(errorData.errors)
                        errorMessage = 'Mohon periksa kembali form Anda'
                    }
                } catch {
                    // Not JSON, use error message as is
                }
            }

            setSubmitStatus({
                type: 'error',
                message: errorMessage
            })
            return false
        } finally {
            setIsSubmitting(false)
        }
    }

    /**
     * Reset submit status ke initial state
     * Berguna untuk clear error/success message
     */
    const resetStatus = () => {
        setSubmitStatus({ type: null, message: '' })
        setFieldErrors({})
    }

    return {
        isSubmitting,
        submitStatus,
        fieldErrors,
        submitForm,
        resetStatus,
        validateField
    }
}
