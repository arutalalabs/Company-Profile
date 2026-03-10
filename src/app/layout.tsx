import '@/styles/global.css'
import { Montserrat } from 'next/font/google'
import { Header } from '@/components'
import { Footer } from '@/components'
import type { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import { getSeoData, buildMetadata, SITE_URL } from '@/lib/api/seo'

export async function generateMetadata(): Promise<Metadata> {
    const seo = await getSeoData('home')
    return buildMetadata(seo, {
        isLayout: true,
        fallbackTitle: 'ArutalaLab',
        fallbackDescription:
            'ArutalaLab merupakan platform untuk IT Education, Resources, dan Software Services yang mendukung pertumbuhan individu dan perusahaan.',
        pageUrl: SITE_URL,
    })
}

// export const metadata: Metadata = {
//     title: {
//         default: 'ArutalaLab',
//         template: '%s | ArutalaLab'
//     },
//     description: 'ArutalaLab merupakan platform untuk IT Education, Resources, dan Software Services yang mendukung pertumbuhan individu dan perusahaan.',
//     keywords: ['IT Education', 'Resources', 'Software Services'],
//     authors: [{ name: 'ArutalaLab' }],
//     creator: 'ArutalaLab',
//     openGraph: {
//         type: 'website',
//         locale: 'id_ID',
//         url: 'https://arutalalab.com',
//         title: 'ArutalaLab',
//         description: 'ArutalaLab merupakan platform untuk IT Education, Resources, dan Software Services yang mendukung pertumbuhan individu dan perusahaan.',
//         siteName: 'ArutalaLab',
//         images: [{ url: '/logo.png', width: 1200, height: 630 }]
//     },
//     robots: {
//         index: true,
//         follow: true,
//         googleBot: { index: true, follow: true }
//     }
// }

const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-sans',
    weight: ['300', '400', '500', '600', '700']
})

const menuItems = [
    { label: 'IT Education', href: '/it-education' },
    { label: 'Courses', href: '/courses' },
    { label: 'Resources', href: '/resources' },
    { label: 'Software Services', href: '/software-services' },
    { label: 'Profile', href: '/profile' },
    { label: 'Mitra', href: '/mitra' },
    { label: 'Article', href: '/articles' }
]

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="id" className={montserrat.variable}>
            <head>
                <link
                    rel="preconnect"
                    href={
                        process.env.NEXT_PUBLIC_API_URL ||
                        'https://backend-cms-arutala.vercel.app'
                    }
                />
                <link
                    rel="dns-prefetch"
                    href={
                        process.env.NEXT_PUBLIC_API_URL ||
                        'https://backend-cms-arutala.vercel.app'
                    }
                />
            </head>
            
            <body className="font-sans">
                {/* <GoogleTagManager gtmId="G-GDEN7QC20C" /> */}
                {/* <GoogleAnalytics gaId="G-GDEN7QC20C" /> */}
                <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!} />

                <Header
                    logo={{
                        src: '/src/common/logo.png',
                        alt: 'Logo Perusahaan',
                        href: '/'
                    }}
                    menuItems={menuItems}
                    contactButton={{
                        label: 'Kontak',
                        href: '/kontak'
                    }}
                />
                {children}

                <Footer
                    logo={{
                        src: '/src/common/logo.png',
                        alt: 'Logo Perusahaan'
                    }}
                    layananItems={[
                        { label: 'IT Education', href: '/it-education' },
                        { label: 'Courses', href: '/courses' },
                        { label: 'Resources', href: '/resources' },
                        {
                            label: 'Software Services',
                            href: '/software-services'
                        }
                    ]}
                    lainnyaItems={[
                        { label: 'Profile', href: '/profile' },
                        { label: 'Mitra', href: '/mitra' },
                        { label: 'Article', href: '/articles' },
                        { label: 'Kontak', href: '/kontak' }
                    ]}
                    socialIcons={[
                        {
                            icon: '/src/common/instagram.svg',
                            href: 'https://www.instagram.com/arutalalab/',
                            alt: 'Instagram'
                        },
                        {
                            icon: '/src/common/youtube.svg',
                            href: 'https://www.youtube.com/@ArutalaLab',
                            alt: 'YouTube'
                        },
                        {
                            icon: '/src/common/linkedin.svg',
                            href: 'https://www.linkedin.com/company/pt-arutala-mitra-mandiri/posts/?feedView=all',
                            alt: 'LinkedIn'
                        }
                    ]}
                />
            </body>
        </html>
    )
}
