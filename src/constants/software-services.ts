import type { ProcessPhase, ContactStep, WhyChooseCard, Advantage } from '@/types/software-services'

// ============================================
// ProcessSection — Service phases
// ============================================

export const PROCESS_PHASES: ProcessPhase[] = [
    {
        id: 'perencanaan',
        title: 'Perencanaan',
        description:
            'Perencanaan merupakan tahapan awal dan paling krusial dalam software services. Pada tahap ini, tim akan memahami kebutuhan klien, tujuan bisnis, serta permasalahan yang ingin diselesaikan melalui solusi digital. Perencanaan yang terstruktur membantu memastikan proses pengembangan perangkat lunak berjalan terarah, efisien, dan sesuai dengan kebutuhan pengguna.',
        illustration: '/src/software-services/high-five.png',
        alurTitle: 'Alur Perencanaan',
        alurSteps: [
            'Komunikasi dan diskusi dengan klien untuk memahami kebutuhan bisnis dan gambaran aplikasi.',
            'Identifikasi kebutuhan pengguna, fitur utama, serta prioritas proyek.',
            'Penentuan ruang lingkup pengembangan agar proyek tetap fokus dan realistis.',
            'Penyusunan pendekatan pengembangan, estimasi waktu, dan tahapan kerja selanjutnya.',
        ],
        outputTitle: 'Output Perencanaan',
        outputItems: [
            'Dokumen Kebutuhan Proyek yang mencakup tujuan aplikasi dan kebutuhan pengguna.',
            'Dokumen Ruang Lingkup Proyek untuk menjaga fokus pengembangan.',
            'Rencana Tahapan Pengembangan sebagai panduan proses selanjutnya.',
        ],
    },
    {
        id: 'analisis',
        title: 'Analisis',
        description:
            'Tahapan penting dalam software services yang bertujuan menerjemahkan kebutuhan bisnis dan pengguna ke dalam spesifikasi sistem yang jelas. Pada tahap ini, seluruh hasil perencanaan dianalisis secara menyeluruh untuk memastikan solusi perangkat lunak yang dikembangkan tepat guna, efisien, dan sesuai dengan kebutuhan pengguna di Indonesia.',
        illustration: '/src/software-services/nice-idea.png',
        alurTitle: 'Alur Analisis',
        alurSteps: [
            'Analisis dokumen kebutuhan proyek dan tujuan bisnis klien.',
            'Pengkajian alur bisnis, proses kerja, dan user flow aplikasi.',
            'Identifikasi kebutuhan teknis, integrasi sistem, serta potensi risiko.',
            'Penyusunan spesifikasi sistem sebagai acuan tahap desain dan pengembangan.',
        ],
        outputTitle: 'Output Analisis',
        outputItems: [
            'Dokumen Spesifikasi Kebutuhan Sistem (SRS) berisi daftar fitur, fungsi, dan kebutuhan sistem secara detail.',
            'Analisis Alur Bisnis dan Pengguna gambaran alur kerja dan proses yang didukung oleh sistem.',
            'Dokumen Kebutuhan Teknis & Integrasi yang menjelaskan kebutuhan teknologi, integrasi sistem, serta pertimbangan teknis.',
        ],
    },
    {
        id: 'perancangan',
        title: 'Perancangan',
        description:
            'Proses penerapan hasil desain dan perancangan ke dalam bentuk perangkat lunak yang dapat digunakan. Pada tahap ini, seluruh rancangan UI/UX, arsitektur sistem, database, serta alur data diimplementasikan melalui proses pengembangan yang terstruktur dan terkontrol. Implementasi dilakukan dengan fokus pada kualitas kode, performa sistem, keamanan, serta kesesuaian fungsi dengan kebutuhan bisnis dan pengguna di Indonesia.',
        illustration: '/src/software-services/product.png',
        alurTitle: 'Alur Perancangan',
        alurSteps: [
            'Menyusun struktur sistem dan komponen aplikasi agar pengembangan berjalan teratur dan scalable.',
            'Membuat alur penggunaan dan kerangka tampilan aplikasi sebagai dasar desain antarmuka.',
            'Merancang tampilan antarmuka yang intuitif, konsisten, dan sesuai dengan identitas bisnis serta kebutuhan pengguna.',
            'Merancang struktur database dan alur data untuk memastikan data tersimpan dengan aman, terorganisir, dan mengalir secara efisien di dalam sistem.',
            'Memvisualisasikan seluruh rancangan dengan kebutuhan bisnis, pengguna, dan kesiapan teknis sebelum masuk ke tahap pengembangan.',
        ],
        outputTitle: 'Output Perancangan',
        outputItems: [
            'Wireframe & User Flow Aplikasi, gambaran alur penggunaan dan struktur tampilan aplikasi.',
            'Desain UI/UX Aplikasi, desain visual antarmuka yang siap digunakan sebagai acuan pengembangan frontend.',
            'Dokumen Arsitektur Sistem, rancangan struktur sistem dan komponen aplikasi.',
            'Database Schema / ERD (Entity Relationship Diagram), gambaran struktur sistem sebagai acuan tahap implementasi.',
            'Data Flow Diagram & Spesifikasi Struktur Data, penjelasan alur data dan aturan pengelolaan data di dalam sistem.',
        ],
    },
    {
        id: 'implementasi',
        title: 'Implementasi',
        description:
            'Tahap implementasi adalah proses penerapan hasil desain dan perancangan ke dalam bentuk perangkat lunak yang dapat digunakan. Pada tahap ini, seluruh rancangan UI/UX, arsitektur sistem, database, serta alur data diimplementasikan melalui proses pengembangan yang terstruktur dan terkontrol. Implementasi dilakukan dengan fokus pada kualitas kode, performa sistem, keamanan, serta kesesuaian fungsi dengan kebutuhan bisnis dan pengguna di Indonesia.',
        illustration: '/src/software-services/high-five.png',
        alurTitle: 'Alur Implementasi',
        alurSteps: [
            'Menerapkan desain UI/UX ke dalam tampilan aplikasi agar interaktif, responsif, dan mudah digunakan.',
            'Mengembangkan logika sistem, API, serta pengelolaan data sesuai dengan arsitektur dan kebutuhan teknis.',
            'Membangun struktur database dan relasi data berdasarkan rancangan yang telah disepakati.',
            'Menghubungkan aplikasi dengan layanan pihak ketiga, API eksternal, atau sistem pendukung lainnya.',
            'Melakukan pengecekan kualitas kode untuk memastikan sistem stabil, aman, dan mudah dikembangkan.',
        ],
        outputTitle: 'Output Implementasi',
        outputItems: [
            'Aplikasi atau Sistem yang Berfungsi, fitur-fitur utama telah dikembangkan sesuai spesifikasi.',
            'Struktur Sistem dan Database; Sistem backend dan pengelolaan data yang telah terintegrasi.',
            'Dokumentasi Implementasi; Dokumen ringkas mengenai struktur aplikasi dan fitur yang telah dikembangkan.',
            'Kode Program Terstruktur & Terdokumentasi, kode yang rapi, aman, dan siap untuk tahap pengujian.',
            'Sistem berjalan secara menyeluruh dan saling terhubung.',
        ],
    },
    {
        id: 'pengujian',
        title: 'Pengujian',
        description:
            'Tahap pengujian adalah proses evaluasi menyeluruh untuk memastikan perangkat lunak yang dikembangkan berfungsi dengan benar, aman, dan sesuai dengan kebutuhan bisnis serta pengguna. Pada tahap ini, dilakukan berbagai jenis pengujian untuk mengidentifikasi potensi masalah, mengevaluasi performa sistem, serta memastikan kualitas keseluruhan produk sebelum diluncurkan.',
        illustration: '/src/software-services/high-five.png',
        alurTitle: 'Alur Pengujian',
        alurSteps: [
            'Menyusun rencana pengujian yang mencakup jenis pengujian, skenario, data uji, dan kriteria keberhasilan.',
            'Melakukan pengujian fungsional untuk memastikan setiap fitur bekerja sesuai spesifikasi dan kebutuhan bisnis.',
            'Melakukan pengujian non-fungsional untuk mengevaluasi performa, keamanan, skalabilitas, dan usability sistem.',
            'Mengidentifikasi, mencatat, dan melacak setiap bug atau masalah yang ditemukan selama pengujian.',
            'Melakukan pengujian ulang setelah perbaikan untuk memastikan masalah telah teratasi dan tidak menimbulkan dampak negatif pada bagian lain sistem.',
        ],
        outputTitle: 'Output Pengujian',
        outputItems: [
            'Laporan Hasil Pengujian yang merinci temuan, tingkat keparahan bug, dan rekomendasi perbaikan.',
            'Daftar Bug yang Teridentifikasi dan Terlacak; Bug yang ditemukan dicatat lengkap dengan status dan prioritasnya.',
            'Rencana Pengujian yang Terverifikasi; Dokumen yang menunjukkan bahwa sistem telah diuji sesuai rencana yang disepakati.',
            'Sistem yang Stabil dan Siap Rilis; Perangkat lunak yang telah lolos pengujian dan siap untuk digunakan oleh pengguna.',
        ],
    },
]

// ============================================
// ContactFlowSection — Contact steps
// ============================================

export const CONTACT_STEPS: ContactStep[] = [
    {
        id: 'explore',
        icon: '/src/software-services/explore.svg',
        title: 'Explore Services',
        description: 'Melihat daftar layanan serta memahami masalah apa yang Anda ingin selesaikan.',
    },
    {
        id: 'contact',
        icon: '/src/software-services/contact.svg',
        title: 'Contact Us',
        description: 'Anda dapat menghubungi melalui halaman kontak atau melalui email',
    },
    {
        id: 'consultation',
        icon: '/src/software-services/consultation.svg',
        title: 'Consultation',
        description: 'Diskusi dengan kami kebutuhan perangkat lunak Anda',
    },
    {
        id: 'negotiation',
        icon: '/src/software-services/negotiation.svg',
        title: 'Negotiation',
        description: 'Menyusun scope, estimasi waktu, biaya pekerjaan serta penetapan layanan',
    },
    {
        id: 'project',
        icon: '/src/software-services/project.svg',
        title: 'Project Kickoff',
        description: 'Tanda tangan kesepakatan yang telah didiskusikan serta penjadwalan proyek.',
    },
]

// ============================================
// WhyChooseSection — Reason cards
// ============================================

export const WHY_CHOOSE_CARDS: WhyChooseCard[] = [
    {
        title: 'Expertise',
        description:
            'Kami menyediakan Software Services yang mengacu pada standar terbaik industri internasional. Tim kami berpengalaman menangani berbagai platform dan teknologi, serta telah terlibat dalam proyek dari beragam sektor.',
    },
    {
        title: 'Customized',
        description:
            'Setiap kebutuhan klien bersifat unik. Oleh karena itu, kami menyesuaikan pemilihan software engineer berdasarkan jenis proyek, domain bisnis, tools yang digunakan, dan model kerja yang dibutuhkan.',
    },
    {
        title: 'Qualified Talent',
        description:
            'Sebagian besar tim kami terdiri dari level senior yang memiliki pemahaman kuat terhadap teori dan praktik perangkat lunak secara menyeluruh. Setiap engineer melalui proses seleksi yang ketat untuk memastikan kompetensi serta kemampuan komunikasi yang baik.',
    },
    {
        title: 'Security',
        description:
            'Keamanan dan kerahasiaan proyek merupakan prioritas utama kami. Tim kami menjunjung tinggi privasi klien dan menerapkan standar keamanan dalam seluruh proses.',
    },
]

// ============================================
// AdvantagesSection — Advantage items
// ============================================

export const ADVANTAGES: Advantage[] = [
    { icon: '/src/software-services/tim.svg', title: 'Tim Profesional Berpengalaman' },
    { icon: '/src/software-services/metode.svg', title: 'Metode Kerja Berbasis Industri' },
    { icon: '/src/software-services/realiable.svg', title: 'Reliable Delivery Approach' },
    { icon: '/src/software-services/fleksible.svg', title: 'Fleksibel untuk Semua Platform' },
    { icon: '/src/software-services/dokumetasi.svg', title: 'Dokumentasi Lengkap' },
    { icon: '/src/software-services/tools.svg', title: 'Tools dan Teknologi Andal' },
]
