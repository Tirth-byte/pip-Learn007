import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppContextProvider } from "@/context/app-context";
import { Toaster } from "sonner";
import { PageTransition } from "@/components/shell/page-transition";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://piplearn.dev"),
  title: {
    default: "PipLearn — Learn Python Interactively",
    template: "%s | PipLearn",
  },
  description:
    "PipLearn is a modern, interactive Python learning platform with a built-in code sandbox, AI mentor, practice problems, and community — all in a Notion-inspired workspace.",
  openGraph: {
    title: "PipLearn — Learn Python Interactively",
    description:
      "Master Python with an AI-powered learning workspace. Code sandbox, guided courses, practice problems, and a vibrant community.",
    siteName: "PipLearn",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Inline script to restore theme from localStorage before paint to prevent light flash (FOIT)
const themeRestoreScript = `
(function(){
  try {
    var t = localStorage.getItem('piplearn_theme');
    var d = t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (d) document.documentElement.classList.add('dark');
  } catch(e){}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${newsreader.variable} font-sans h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-neutral-200 selection:text-black">
        <script dangerouslySetInnerHTML={{ __html: themeRestoreScript }} />
        <AppContextProvider>
          <TooltipProvider>
            <PageTransition>{children}</PageTransition>
          </TooltipProvider>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "var(--background)",
                border: "1px solid var(--border)",
                color: "var(--foreground)",
                fontSize: "13px",
                fontFamily: "var(--font-sans)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                borderRadius: "10px",
              },
            }}
          />
        </AppContextProvider>
      </body>
    </html>
  );
}

