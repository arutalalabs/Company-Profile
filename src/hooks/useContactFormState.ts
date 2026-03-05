import { useState } from 'react'
import { useContactForm } from '@/hooks/useContactForm'
import { INITIAL_FORM_DATA } from '@/constants/kontak'
import type { MessageFormData } from '@/types/contact'

export interface UseContactFormStateReturn {
    formData: MessageFormData
    isSubmitting: boolean
    submitStatus: { type: 'success' | 'error' | null; message: string }
    fieldErrors: import('@/types/contact').FieldErrors
    handleInputChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => void
    handleSubjectCheckboxChange: (value: string) => void
    handleBlur: (fieldName: keyof MessageFormData) => void
    handleSubmit: (e: React.FormEvent) => Promise<void>
}

export function useContactFormState(): UseContactFormStateReturn {
    const [formData, setFormData] = useState<MessageFormData>(INITIAL_FORM_DATA)
    const { isSubmitting, submitStatus, fieldErrors, submitForm, validateField } = useContactForm()

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubjectCheckboxChange = (value: string) => {
        setFormData((prev) => {
            const isChecked = prev.subject.includes(value)
            return {
                ...prev,
                subject: isChecked
                    ? prev.subject.filter((item) => item !== value)
                    : [...prev.subject, value],
            }
        })
    }

    const handleBlur = (fieldName: keyof MessageFormData) => {
        validateField(fieldName, formData[fieldName])
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const success = await submitForm(formData)
        if (success) {
            setFormData(INITIAL_FORM_DATA)
        }
    }

    return {
        formData,
        isSubmitting,
        submitStatus,
        fieldErrors,
        handleInputChange,
        handleSubjectCheckboxChange,
        handleBlur,
        handleSubmit,
    }
}
