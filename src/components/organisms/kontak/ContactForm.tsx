'use client'

import { useState } from 'react'
import { Typography, Button } from '@/components'
import { useContactForm } from '@/hooks/useContactForm'

/**
 * Komponen form kontak untuk mengirim pesan
 * Berisi form dengan validasi dan integrasi API
 */
export function ContactForm() {
    // State untuk form fields
    const [formData, setFormData] = useState({
        senderName: '',
        senderEmail: '',
        organizationName: '',
        senderPhone: '',
        subject: [] as string[],
        messageBody: ''
    })

    // Gunakan custom hook untuk submission logic
    const { isSubmitting, submitStatus, fieldErrors, submitForm, validateField } = useContactForm()

    // Handle blur untuk real-time validation
    const handleBlur = (fieldName: keyof typeof formData) => {
        validateField(fieldName, formData[fieldName])
    }

    // Pilihan subject
    const subjectOptions = [
        { value: 'IT Education', label: 'IT Education' },
        { value: 'Resource', label: 'Resource' },
        { value: 'Software Services', label: 'Software Services' },
        { value: 'Partner', label: 'Partner' },
        { value: 'Lainnya', label: 'Lainnya' }
    ]

    // Handle perubahan input
    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    // Handle perubahan subject (checkbox - hanya bisa pilih satu)
    const handleSubjectCheckboxChange = (value: string) => {
        setFormData((prev) => {
            const currentSubjects = prev.subject
            const isChecked = currentSubjects.includes(value)

            if (isChecked) {
                // Jika sudah dipilih, remove dari array (uncheck)
                return {
                    ...prev,
                    subject: []
                }
            } else {
                // Jika belum dipilih, replace array dengan value baru (hanya satu yang dipilih)
                return {
                    ...prev,
                    subject: [value]
                }
            }
        })
    }

    // Handle submit form
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Submit menggunakan custom hook
        const success = await submitForm(formData)

        // Reset form hanya jika berhasil
        if (success) {
            setFormData({
                senderName: '',
                senderEmail: '',
                organizationName: '',
                senderPhone: '',
                subject: [],
                messageBody: ''
            })
        }
    }

    return (
        <div className="bg-[#FFFFFF] border border-[var(--color-primary-900)] rounded-2xl shadow-xl p-8 lg:px-18 lg:py-14">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nama */}
                <div>
                    <label htmlFor="senderName" className="block mb-2">
                        <Typography weight="medium" color="neutral-950">
                            Nama <span className="text-red-500">*</span>
                        </Typography>
                    </label>
                    <input
                        type="text"
                        id="senderName"
                        name="senderName"
                        value={formData.senderName}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('senderName')}
                        required
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--color-primary-900)] focus:border-transparent outline-none transition-all ${
                            fieldErrors.senderName ? 'border-red-500' : 'border-neutral-300'
                        }`}
                        placeholder="Masukkan nama Anda"
                    />
                    {fieldErrors.senderName && (
                        <Typography size="sm" color="red-base" className="mt-1">
                            {fieldErrors.senderName}
                        </Typography>
                    )}
                </div>

                {/* Institusi/Organisasi */}
                <div>
                    <label htmlFor="organizationName" className="block mb-2">
                        <Typography weight="medium" color="neutral-950">
                            Institusi/Organisasi
                        </Typography>
                    </label>
                    <input
                        type="text"
                        id="organizationName"
                        name="organizationName"
                        value={formData.organizationName}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('organizationName')}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--color-primary-900)] focus:border-transparent outline-none transition-all ${
                            fieldErrors.organizationName ? 'border-red-500' : 'border-neutral-300'
                        }`}
                        placeholder="Masukkan nama institusi/organisasi"
                    />
                    {fieldErrors.organizationName && (
                        <Typography size="sm" color="red-base" className="mt-1">
                            {fieldErrors.organizationName}
                        </Typography>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="senderEmail" className="block mb-2">
                        <Typography weight="medium" color="neutral-950">
                            Email <span className="text-red-500">*</span>
                        </Typography>
                    </label>
                    <input
                        type="email"
                        id="senderEmail"
                        name="senderEmail"
                        value={formData.senderEmail}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('senderEmail')}
                        required
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--color-primary-900)] focus:border-transparent outline-none transition-all ${
                            fieldErrors.senderEmail ? 'border-red-500' : 'border-neutral-300'
                        }`}
                        placeholder="nama@email.com"
                    />
                    {fieldErrors.senderEmail && (
                        <Typography size="sm" color="red-base" className="mt-1">
                            {fieldErrors.senderEmail}
                        </Typography>
                    )}
                </div>

                {/* Phone */}
                <div>
                    <label htmlFor="senderPhone" className="block mb-2">
                        <Typography weight="medium" color="neutral-950">
                            Nomor Telepon <span className="text-red-500">*</span>
                        </Typography>
                    </label>
                    <input
                        type="tel"
                        id="senderPhone"
                        name="senderPhone"
                        value={formData.senderPhone}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('senderPhone')}
                        required
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--color-primary-900)] focus:border-transparent outline-none transition-all ${
                            fieldErrors.senderPhone ? 'border-red-500' : 'border-neutral-300'
                        }`}
                        placeholder="08123456789"
                    />
                    <Typography size="xs" color="neutral-600" className="mt-2 text-gray-900 italic block">
                        *Pastikan nomor WhatsApp aktif untuk memudahkan komunikasi dengan tim kami.
                    </Typography>
                    {fieldErrors.senderPhone && (
                        <Typography size="sm" color="red-base" className="mt-1">
                            {fieldErrors.senderPhone}
                        </Typography>
                    )}
                </div>

                {/* Subject - Checkbox Version */}
                <div>
                    <label className="block mb-3">
                        <Typography weight="medium" color="neutral-950">
                            Subject <span className="text-red-500">*</span>
                        </Typography>
                        <Typography size="sm" color="neutral-600" className="mt-1">
                            Pilih satu topik
                        </Typography>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        {subjectOptions.map((option) => (
                            <label
                                key={option.value}
                                className="flex items-center gap-3 cursor-pointer group transition-all"
                            >
                                <input
                                    type="checkbox"
                                    checked={formData.subject.includes(option.value)}
                                    onChange={() =>
                                        handleSubjectCheckboxChange(option.value)
                                    }
                                    className="w-5 h-5 flex-shrink-0 rounded border-neutral-300 cursor-pointer transition-all"
                                />
                                <Typography
                                    color="neutral-950"
                                    className="group-hover:text-[var(--color-primary-900)] transition-colors"
                                >
                                    {option.label}
                                </Typography>
                            </label>
                        ))}
                    </div>
                    {/* Hidden input untuk validasi required */}
                    <input
                        type="text"
                        value={formData.subject.length > 0 ? 'valid' : ''}
                        onChange={() => {}}
                        required
                        className="absolute opacity-0 pointer-events-none"
                        tabIndex={-1}
                    />
                    {fieldErrors.subject && (
                        <Typography size="sm" color="red-base" className="mt-2">
                            {fieldErrors.subject}
                        </Typography>
                    )}
                </div>

                {/* Pesan */}
                <div>
                    <label htmlFor="messageBody" className="block mb-2">
                        <Typography weight="medium" color="neutral-950">
                            Pesan <span className="text-red-500">*</span>
                        </Typography>
                    </label>
                    <textarea
                        id="messageBody"
                        name="messageBody"
                        value={formData.messageBody}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('messageBody')}
                        required
                        rows={5}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--color-primary-900)] focus:border-transparent outline-none transition-all resize-none ${
                            fieldErrors.messageBody ? 'border-red-500' : 'border-neutral-300'
                        }`}
                        placeholder="Tulis pesan Anda di sini..."
                    />
                    {fieldErrors.messageBody && (
                        <Typography size="sm" color="red-base" className="mt-1">
                            {fieldErrors.messageBody}
                        </Typography>
                    )}
                </div>

                {/* Status Message */}
                {submitStatus.type && (
                    <div
                        className={`p-4 rounded-lg ${
                            submitStatus.type === 'success'
                                ? 'bg-green-50 border border-green-200'
                                : 'bg-red-50 border border-red-200'
                        }`}
                    >
                        <Typography
                            color={
                                submitStatus.type === 'success'
                                    ? 'green-base'
                                    : 'red-base'
                            }
                            size="sm"
                        >
                            {submitStatus.message}
                        </Typography>
                    </div>
                )}

                {/* Submit Button */}
                <Button
                    type="submit"
                    color="accent-600"
                    size="md"
                    disabled={isSubmitting}
                    className=""
                >
                    {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
                </Button>
            </form>
        </div>
    )
}
