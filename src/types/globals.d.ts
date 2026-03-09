/**
 * Deklarasi tipe global untuk `window.gtag`.
 * Diperlukan agar TypeScript mengenali fungsi GA4 yang dipasang
 * secara dinamis oleh <GoogleAnalytics> di layout.tsx.
 * Dokumentasi lengkap: src/lib/ANALYTICS.md
 */

interface Window {
    /**
     * Fungsi GA4 (gtag.js) yang tersedia secara global di browser.
     * Penggunaan: `window.gtag('event', 'nama_event', { parameter: nilai })`
     */
    gtag: (
        command: 'event' | 'config' | 'set' | 'js',
        targetOrDate: string | Date,
        params?: Record<string, unknown>
    ) => void
}
