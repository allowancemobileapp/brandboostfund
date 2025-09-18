import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center md:items-start text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} 100 Websites Fundraiser. All rights reserved.
          </p>
          <p>Contact: <a href="mailto:mrjames4good@gmail.com" className="hover:text-foreground">mrjames4good@gmail.com</a> | <a href="tel:09135067590" className="hover:text-foreground">09135067590</a></p>
        </div>
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
