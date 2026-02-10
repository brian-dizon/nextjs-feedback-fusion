import { Heart, Sparkle, Github, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t bg-muted/30 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo and Tagline */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-linear-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <Sparkle className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">Feedback Fusion</span>
            </div>
            <p className="text-muted-foreground max-w-xs leading-relaxed text-sm">
              The community-driven platform for suggesting, voting, and tracking the future of our product.
            </p>
          </div>

          {/* Links Column 1 */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/feedback" className="hover:text-primary transition-colors">Feedback List</Link></li>
              <li><Link href="/roadmap" className="hover:text-primary transition-colors">Public Roadmap</Link></li>
              <li><Link href="/feedback/new" className="hover:text-primary transition-colors">Submit Idea</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider">Community</h3>
            <div className="flex gap-4">
              <Link href="#" className="h-10 w-10 rounded-full border flex items-center justify-center hover:bg-background transition-colors text-muted-foreground hover:text-primary">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="h-10 w-10 rounded-full border flex items-center justify-center hover:bg-background transition-colors text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <span>© {currentYear} Feedback Fusion.</span>
            <span className="hidden md:inline">•</span>
            <div className="flex items-center gap-1">
              <span>Made with</span>
              <Heart className="h-3 w-3 text-red-500 fill-red-500" />
              <span>by the community.</span>
            </div>
          </div>
          
          <div className="flex gap-6">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
