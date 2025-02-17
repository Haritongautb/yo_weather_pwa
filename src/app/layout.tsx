import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { MainLayout } from "@/layouts";
import { ClientOnly } from "@/HOC";
import { MetadataEnum } from "@/types";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  applicationName: MetadataEnum.APP_NAME,
  title: {
    default: MetadataEnum.APP_DEFAULT_TITLE,
    template: MetadataEnum.APP_TITLE_TEMPLATE,
  },
  description: MetadataEnum.APP_DESCRIPTION,
  manifest: "/manifest.json",
  icons: {
    icon: "weather.svg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: MetadataEnum.APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: MetadataEnum.APP_NAME,
    title: {
      default: MetadataEnum.APP_DEFAULT_TITLE,
      template: MetadataEnum.APP_TITLE_TEMPLATE,
    },
    description: MetadataEnum.APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: MetadataEnum.APP_DEFAULT_TITLE,
      template: MetadataEnum.APP_TITLE_TEMPLATE,
    },
    description: MetadataEnum.APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#87CEEB" },
    { media: "(prefers-color-scheme: dark)", color: "#708090" },
  ],
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} px-[20px] py-[30px] 2xl:py-[65px] 2xl:px-[78px] w-full h-full bg-white_mode dark:bg-dark_mode z-0`}
      >
        <ClientOnly>
          <MainLayout>{children}</MainLayout>
        </ClientOnly>
      </body>
    </html>
  );
}
