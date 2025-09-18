import Image from "next/image";
import { getMetrics, getBrands } from "@/lib/data";
import { Header } from "@/components/header";
import { FundraiserMetrics } from "@/components/fundraiser-metrics";
import { ApprovedBrands } from "@/components/approved-brands";
import { Footer } from "@/components/footer";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BrandRegistrationForm } from "@/components/brand-registration-form";
import { AnimatedGoalBadge } from "@/components/animated-goal-badge";

export default async function Home() {
  const metrics = await getMetrics();
  const allBrands = await getBrands();
  const approvedBrands = allBrands.filter(brand => brand.status === 'approved');
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero');

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="relative w-full h-[80vh] min-h-[700px] flex items-center justify-center text-center">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
            <Image
                src={heroImage?.imageUrl || "https://picsum.photos/seed/hero/1600/900"}
                alt={heroImage?.description || "Abstract background"}
                fill
                className="object-cover"
                priority
                data-ai-hint={heroImage?.imageHint || "abstract lines"}
            />
            
            <div className="relative z-20 container px-4 md:px-6">
                <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6">
                    <AnimatedGoalBadge goal={metrics.goal} />
                    <h1 className="text-5xl font-headline font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
                        Your Vision, Online.
                    </h1>
                    <p className="max-w-2xl text-lg text-muted-foreground md:text-xl font-body">
                        We're building 100 professional websites for just N10,000 each to empower businesses and raise N1,000,000. Let's build yours.
                    </p>
                    <div id="register" className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 scroll-mt-20">
                        <BrandRegistrationForm />
                        <Button variant="outline" size="lg" asChild className="backdrop-blur-sm bg-background/30">
                            <Link href="/faq">Learn More</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
        
        <section id="metrics" className="py-24 sm:py-32 scroll-mt-20">
          <div className="container">
            <FundraiserMetrics metrics={metrics} />
          </div>
        </section>

        <section id="brands" className="py-24 sm:py-32 bg-secondary/20 border-t border-b border-border scroll-mt-20">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center mb-16">
                <h2 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl">Featured Brands</h2>
                <p className="mt-6 text-lg text-muted-foreground">We're proud to have helped these brands get online. Check out their new websites!</p>
            </div>
            <ApprovedBrands brands={approvedBrands} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
