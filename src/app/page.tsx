import Image from "next/image";
import { getMetrics, getBrands } from "@/lib/data";
import { Header } from "@/components/header";
import { FundraiserMetrics } from "@/components/fundraiser-metrics";
import { ApprovedBrands } from "@/components/approved-brands";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/footer";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BrandRegistrationForm } from "@/components/brand-registration-form";

export default async function Home() {
  const metrics = await getMetrics();
  const allBrands = await getBrands();
  const approvedBrands = allBrands.filter(brand => brand.status === 'approved');
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero');

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center text-center">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
            <Image
                src={heroImage?.imageUrl || "https://picsum.photos/seed/hero/1600/900"}
                alt={heroImage?.description || "Abstract background"}
                fill
                className="object-cover -z-10"
                priority
                data-ai-hint={heroImage?.imageHint || "abstract lines"}
            />
            
            <div className="relative z-10 container px-4 md:px-6">
                <div className="max-w-3xl mx-auto space-y-4">
                    <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30 hover:bg-accent/30">Help Us Reach N1,000,000</Badge>
                    <h1 className="text-4xl font-headline font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl">
                        Get a Professional Website & Support a Great Cause
                    </h1>
                    <p className="text-lg text-muted-foreground md:text-xl">
                        We're building 100 simple, elegant websites for businesses to raise N1,000,000. 
                        Let's build your online presence together.
                    </p>
                    <div className="flex justify-center gap-4">
                        <BrandRegistrationForm />
                        <Button variant="outline" asChild>
                            <Link href="/faq">Learn More</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
        
        <section id="metrics" className="py-12 md:py-24">
          <div className="container">
            <FundraiserMetrics metrics={metrics} />
          </div>
        </section>

        <section id="brands" className="py-12 md:py-24 bg-secondary/20">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center mb-12">
                <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl">Our Progress So Far</h2>
                <p className="mt-4 text-muted-foreground">We're proud to have helped these brands get online. Check out their new websites!</p>
            </div>
            <ApprovedBrands brands={approvedBrands} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
