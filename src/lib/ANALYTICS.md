# Panduan Google Analytics 4 (GA4) — Untuk Pemula

## Daftar Isi
1. [Apa itu GA4 Event?](#apa-itu-ga4-event)
2. [Bagaimana Cara Kerjanya?](#bagaimana-cara-kerjanya)
3. [Struktur File](#struktur-file)
4. [Daftar Fungsi Tracking](#daftar-fungsi-tracking)
5. [Cara Menambah Event Baru](#cara-menambah-event-baru)
6. [Cara Melihat Hasil di Dashboard GA4](#cara-melihat-hasil-di-dashboard-ga4)
7. [Troubleshooting](#troubleshooting)

---

## Apa itu GA4 Event?

Google Analytics 4 bekerja dengan konsep **"event"**.

Setiap kali pengguna melakukan sesuatu di website — seperti klik tombol, isi form, atau lihat halaman — kita bisa "melaporkan" aksi tersebut ke GA4. Laporan inilah yang disebut **EVENT**.

| Jenis Event | Contoh |
|---|---|
| **Bawaan GA4** (otomatis) | `page_view`, `scroll`, `click`, `session_start` |
| **Custom** (kita buat sendiri) | `contact_form_submit`, `contact_form_success`, `contact_form_error` |

---

## Bagaimana Cara Kerjanya?

```
Pengguna klik tombol
        │
        ▼
ContactForm.tsx memanggil trackContactFormSubmit()
        │
        ▼
analytics.ts memanggil trackEvent()
        │
        ▼
trackEvent() memanggil window.gtag('event', ...)
        │
        ▼
Browser mengirim data ke server Google Analytics
        │
        ▼
Data muncul di dashboard analytics.google.com
```

### Komponen yang Terlibat

| File | Peran |
|---|---|
| `src/app/layout.tsx` | Memasang script GA4 (`<GoogleAnalytics>`) agar `window.gtag` tersedia di browser |
| `src/lib/analytics.ts` | Helper functions — jembatan antara kode React dan `window.gtag` |
| `src/types/globals.d.ts` | Deklarasi tipe TypeScript untuk `window.gtag` |
| `src/components/organisms/kontak/ContactForm.tsx` | Memanggil helper functions saat pengguna submit form |

---

## Struktur File

```
src/
├── app/
│   └── layout.tsx              ← Tempat <GoogleAnalytics gaId="..."> dipasang
├── lib/
│   ├── analytics.ts            ← Helper functions untuk tracking
│   └── ANALYTICS.md            ← Dokumentasi ini
└── types/
    └── globals.d.ts            ← Deklarasi tipe window.gtag
```

---

## Daftar Fungsi Tracking

### `trackEvent(eventName, params?)` — Fungsi Dasar

Fungsi paling dasar. Dipakai untuk mengirim event **apapun** ke GA4.

```ts
import { trackEvent } from '@/lib/analytics'

// Contoh: melacak klik tombol download
trackEvent('download_click', {
    file_name: 'panduan-it.pdf',
    page: '/resources'
})
```

| Parameter | Tipe | Wajib | Keterangan |
|---|---|---|---|
| `eventName` | `string` | Ya | Nama event. Gunakan huruf kecil dan underscore. |
| `params` | `object` | Tidak | Data tambahan. Nilai harus berupa `string`, `number`, atau `boolean`. |

---

### `trackContactFormSubmit(subjects)` — Klik Tombol Submit

Dipanggil **saat tombol "Kirim Pesan" diklik**, sebelum form diproses.
Berguna untuk mengetahui berapa banyak pengguna yang _mencoba_ mengirim pesan.

```ts
trackContactFormSubmit(['IT Education', 'Partner'])
```

**Event yang dikirim ke GA4:**
- Nama event: `contact_form_submit`
- Parameter: `subjects` → `"IT Education, Partner"`

---

### `trackContactFormSuccess(subjects)` — Form Berhasil Dikirim

Dipanggil **setelah server merespons sukses**.
Gunakan ini untuk mengukur **konversi** — berapa pengguna yang benar-benar berhasil mengirim pesan.

```ts
trackContactFormSuccess(['Software Services'])
```

**Event yang dikirim ke GA4:**
- Nama event: `contact_form_success`
- Parameter: `subjects` → `"Software Services"`

---

### `trackContactFormError(subjects, reason)` — Form Gagal Dikirim

Dipanggil **jika pengiriman gagal** (error server atau jaringan).
Berguna untuk mendeteksi masalah teknis yang dialami pengguna.

```ts
trackContactFormError(['IT Education'], 'submission_failed')
```

**Event yang dikirim ke GA4:**
- Nama event: `contact_form_error`
- Parameter: `subjects` → `"IT Education"`, `reason` → `"submission_failed"`

---

## Cara Menambah Event Baru

Misalnya kita ingin melacak klik tombol "Download" di halaman Resources.

### Langkah 1 — Tambahkan fungsi di `analytics.ts`

```ts
// src/lib/analytics.ts

/**
 * Melacak ketika pengguna mengunduh resource.
 * @param fileName - Nama file yang diunduh
 */
export function trackResourceDownload(fileName: string): void {
    trackEvent('resource_download', {
        file_name: fileName,
    })
}
```

### Langkah 2 — Impor dan gunakan di komponen

```tsx
// src/components/organisms/resource/ResourceCard.tsx
'use client'

import { trackResourceDownload } from '@/lib/analytics'

function ResourceCard({ fileName }: { fileName: string }) {
    const handleDownload = () => {
        trackResourceDownload(fileName) // ← panggil di sini
        // ... logika download
    }

    return <button onClick={handleDownload}>Download</button>
}
```

> **Catatan:** Fungsi tracking **hanya bisa dipakai di Client Component** (file dengan `'use client'`), karena `window` tidak tersedia di Server Component.

---

## Cara Melihat Hasil di Dashboard GA4

### Realtime (hasil langsung)
1. Buka [analytics.google.com](https://analytics.google.com)
2. Pilih property Anda
3. Klik menu **Reports** → **Realtime**
4. Scroll ke bagian **"Event count by Event name"**
5. Lakukan aksi di website (misal: submit form kontak)
6. Event `contact_form_submit` akan muncul dalam beberapa detik

### Laporan Historis
1. Klik menu **Reports** → **Engagement** → **Events**
2. Semua event yang pernah dikirim akan tercantum di sini beserta jumlahnya

### DebugView (untuk development)
1. Instal ekstensi Chrome: [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)
2. Aktifkan ekstensi, lalu buka website
3. Di GA4: klik **Admin** → **DebugView**
4. Setiap event akan tampil secara realtime beserta parameter-parameternya

---

## Troubleshooting

### Event tidak muncul di GA4

| Kemungkinan Penyebab | Solusi |
|---|---|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` tidak di-set | Tambahkan ke file `.env.local`: `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX` |
| Script GA4 belum dimuat saat event dikirim | `trackEvent` sudah dilengkapi pengecekan `window.gtag`, event akan diabaikan dengan aman |
| Ad blocker aktif di browser | Coba di browser tanpa ekstensi, atau gunakan Incognito |
| Data baru, GA4 butuh waktu | Data non-realtime bisa delay hingga 24-48 jam |

### TypeScript error: `Property 'gtag' does not exist on type 'Window'`

Pastikan file `src/types/globals.d.ts` sudah ada dan TypeScript membacanya.
Cek juga bahwa path `src/types` tercakup di `tsconfig.json` (biasanya sudah otomatis lewat `"include": ["src"]`).
