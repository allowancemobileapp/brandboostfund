import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} BrandBoost Fund. All rights reserved.
        </p>
        <Link
          href="/admin"
          className="text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          Admin Panel
        </Link>
      </div>
    </footer>
  );
}
