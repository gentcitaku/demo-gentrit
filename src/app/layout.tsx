import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import "./globals.css";
import {
	SITE_AUTHOR,
	SITE_DESCRIPTION,
	SITE_TITLE,
	SITE_URL,
} from "@/lib/constant";
import Script from "next/script";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-geist-mono",
});

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
	verification: {
		google: "0_oHutSL8uJkY0QSrnPYHvAct-BxnaoxFIxyGCZ1IPg",
	},
	other: {
		"google-adsense-account": "ca-pub-3965387646604716",
	},
};

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
	children: React.ReactNode;
}>) {
	return (
		<html
			lang='en'
			suppressHydrationWarning
			className={`${geist.variable} ${geistMono.variable}`}>
			<body className='font-sans antialiased bg-background text-foreground flex flex-col min-h-screen'>
				<ThemeProvider
					attribute='class'
					defaultTheme='dark'
					enableSystem>
					<Header />
					<main className='pt-20 grow'>{children}</main>
					<Footer />
				</ThemeProvider>
				{/* Google Analytics */}
				<Script
					strategy='afterInteractive'
					src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
				/>
				<Script
					id='google-analytics'
					strategy='afterInteractive'
					dangerouslySetInnerHTML={{
						__html: analyticsScript,
					}}
				/>
				{/* AdSense */}
				<Script
					async
					src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3965387646604716'
					crossOrigin='anonymous'
					strategy='afterInteractive'
				/>
			</body>
		</html>
	);
}
