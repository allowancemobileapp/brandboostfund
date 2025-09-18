import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center md:items-start text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Brand Boost Fundraiser. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/faq"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            FAQ
          </Link>
          <Link
            href="/admin"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Admin Panel
          </Link>
        </div>
      </div>
    </footer>
  );
}
