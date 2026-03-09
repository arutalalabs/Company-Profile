interface Window {
    gtag: (
        command: 'event' | 'config' | 'set' | 'js',
        targetOrDate: string | Date,
        params?: Record<string, unknown>
    ) => void
}
