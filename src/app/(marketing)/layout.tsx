"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { toast } from "sonner";
import { usePathname } from "next/navigation";

function comingSoonToast(label: string) {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    toast(`${label} — coming soon`);
  };
}

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isFullscreen = pathname === "/login";

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#191919] text-[#37352F] dark:text-[rgba(255,255,255,0.85)] font-sans antialiased">
      {/* Notion Top Navigation Bar */}
      {!isFullscreen && (
      <header className="h-14 border-b border-[rgba(55,53,47,0.09)] dark:border-[rgba(255,255,255,0.09)] sticky top-0 bg-white/95 dark:bg-[#191919]/95 backdrop-blur-md z-50 w-full">
        <div className="flex items-center justify-between px-6 h-full max-w-7xl mx-auto">
          <div className="flex items-center gap-8">
            <Link href="/">
              <Logo />
            </Link>
            
            <nav className="hidden lg:flex items-center gap-1 text-xs font-medium text-[rgba(55,53,47,0.75)] dark:text-neutral-300">
              <Link
                href="/product"
                className="px-2.5 py-1.5 rounded hover:bg-[#F1F1EF] dark:hover:bg-white/10 transition-colors"
              >
                Product
              </Link>
              <Link
                href="/resources"
                className="px-2.5 py-1.5 rounded hover:bg-[#F1F1EF] dark:hover:bg-white/10 transition-colors"
              >
                Resources
              </Link>
              <Link
                href="/developers"
                className="px-2.5 py-1.5 rounded hover:bg-[#F1F1EF] dark:hover:bg-white/10 transition-colors"
              >
                Developers
              </Link>
              <Link
                href="/enterprise"
                className="px-2.5 py-1.5 rounded hover:bg-[#F1F1EF] dark:hover:bg-white/10 transition-colors"
              >
                Enterprise
              </Link>
              <Link
                href="/pricing"
                className="px-2.5 py-1.5 rounded hover:bg-[#F1F1EF] dark:hover:bg-white/10 transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/demo"
                className="px-2.5 py-1.5 rounded hover:bg-[#F1F1EF] dark:hover:bg-white/10 transition-colors"
              >
                Request a demo
              </Link>
            </nav>
          </div>

          <nav className="flex items-center gap-3">
            <Link 
              href="/login" 
              className="text-xs font-medium text-[#37352F] dark:text-white px-3 py-1.5 rounded hover:bg-[#F1F1EF] dark:hover:bg-white/10 transition-colors"
            >
              Log in
            </Link>
            <Button asChild size="sm" className="bg-[#2383E2] hover:bg-[#1D6FBE] text-white h-8 px-3.5 text-xs font-semibold rounded-md shadow-xs border-none">
              <Link href="/signup">
                Get PipLearn free
              </Link>
            </Button>
          </nav>
        </div>
      </header>
      )}

      <main className="flex-1 flex flex-col">{children}</main>

      {/* Notion Style Footer */}
      {!isFullscreen && (
      <footer className="border-t border-[rgba(55,53,47,0.09)] dark:border-[rgba(255,255,255,0.09)] bg-white dark:bg-[#191919] pt-16 pb-16 px-6 text-xs text-[rgba(55,53,47,0.65)] dark:text-neutral-400">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 space-y-4">
            <Logo />
            <p className="text-[11px] text-[rgba(55,53,47,0.55)] dark:text-neutral-400 max-w-xs leading-relaxed">
              PipLearn is the connected workspace for Python developers, students, and engineers. Write, test, and master Python side-by-side with AI.
            </p>
            <div className="pt-2 text-[11px] text-[rgba(55,53,47,0.45)] dark:text-neutral-500">
              © {new Date().getFullYear()} PipLearn, Inc. All rights reserved.
            </div>
          </div>

          <div>
            <div className="font-semibold text-[#37352F] dark:text-white mb-3">Product</div>
            <ul className="space-y-2.5 text-[11px]">
              <li><Link href="/product" className="hover:underline">Product Overview</Link></li>
              <li><Link href="/courses" className="hover:underline">Courses &amp; Tracks</Link></li>
              <li><Link href="/sandbox" className="hover:underline">Interactive Sandbox</Link></li>
              <li><Link href="/practice" className="hover:underline">Practice Arena</Link></li>
              <li><Link href="/pricing" className="hover:underline">Pricing Plans</Link></li>
              <li><Link href="/demo" className="hover:underline">Request a Demo</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-[#37352F] dark:text-white mb-3">Solutions</div>
            <ul className="space-y-2.5 text-[11px]">
              <li><Link href="/enterprise" className="hover:underline">For Enterprise &amp; Teams</Link></li>
              <li><Link href="/developers" className="hover:underline">For Developers &amp; APIs</Link></li>
              <li><Link href="/courses/python" className="hover:underline">Python Masterclass</Link></li>
              <li><Link href="/projects" className="hover:underline">Project Briefs</Link></li>
              <li><Link href="/ai-mentor" className="hover:underline">Pip AI Mentor</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-[#37352F] dark:text-white mb-3">Resources</div>
            <ul className="space-y-2.5 text-[11px]">
              <li><Link href="/resources" className="hover:underline">Documentation &amp; Guides</Link></li>
              <li><Link href="/community" className="hover:underline">Community Forum</Link></li>
              <li><Link href="/leaderboard" className="hover:underline">Global Leaderboard</Link></li>
              <li><a href="#" onClick={comingSoonToast("Help Center")} className="hover:underline">Help Center</a></li>
              <li><a href="#" onClick={comingSoonToast("Status Page")} className="hover:underline">System Status</a></li>
            </ul>
          </div>
        </div>
      </footer>
      )}
    </div>
  );
}
