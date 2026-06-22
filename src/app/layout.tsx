import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { AppNavbar } from '@/components/AppNavbar'
import { Footer } from '@/components/Footer'
import './globals.css'
import { SITE_AUTHOR, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '@/lib/constant'
import Script from 'next/script'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
		"finance calculator",
		"loan calculator",
		"investment calculator",
		"retirement calculator",
		"tax calculator",
		"emi calculator",
		"sip calculator",
		"online financial calculator",
		"financial planning tool",
    "free financial calculator",
    "debt calculator",
    "gst calculator",
    "loan comparison calculator",
    "rd calculator",
    "fd calculator",
    "retirement calculator",
    "salary calculator",
	],
  authors: [{ name: SITE_AUTHOR }],
	publisher: SITE_AUTHOR,
	openGraph: {
		type: "website",
		locale: "en_US",
		url: SITE_URL,
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: SITE_TITLE,
			},
		],
	},
	robots: "index, follow",
	alternates: {
		canonical: SITE_URL,
	},
}

const analyticsScript = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX', {
    page_path: window.location.pathname,
  });
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning>
		  <meta name="google-adsense-account" content="ca-pub-3965387646604716">
				{/* Google Analytics */}
				<Script
					strategy='afterInteractive'
					src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`} // Replace with your Google Analytics ID
				/>
				<Script
					id='google-analytics'
					strategy='afterInteractive'
					dangerouslySetInnerHTML={{
						__html: analyticsScript,
					}}
				/>
				{/* Google Search Console */}
				<meta
					name='google-site-verification'
					content='XXXXXXXXXXXXXX' // Replace with your Google Search Console verification code
				/>
				{/* AdSense */}
				<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3965387646604716"
     crossorigin="anonymous"></script>
			</head>
      <body className="font-sans antialiased bg-background text-foreground flex flex-col min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AppNavbar />
          <main className="pt-20 flex-grow">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
