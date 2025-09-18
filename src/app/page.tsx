import Image from "next/image";
import { getMetrics, getBrands } from "@/lib/data";
import { Header } from "@/components/header";
import { FundraiserMetrics } from "@/components/fundraiser-metrics";
import { ApprovedBrands } from "@/components/approved-brands";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/footer";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default async function Home() {
  const metrics = await getMetrics();
  const allBrands = await getBrands();
  const approvedBrands = allBrands.filter(brand => brand.status === 'approved');
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero');

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative w-full h-[50vh] min-h-[400px] flex items-center justify-center text-center">
            <Image
                src={heroImage?.imageUrl || "https://picsum.photos/seed/hero/1600/900"}
                alt={heroImage?.description || "Rocket launching"}
                fill
                className="object-cover"
                priority
                data-ai-hint={heroImage?.imageHint || "rocket launch"}
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 container px-4 md:px-6">
                <div className="max-w-3xl mx-auto space-y-4">
                    <Badge variant="secondary" className="bg-brand-pink/20 text-brand-pink border-brand-pink/30 hover:bg-brand-pink/30">Now Funding</Badge>
                    <h1 className="text-4xl font-headline font-bold tracking-tighter text-white sm:text-5xl md:text-6xl">
                        Fueling the Next Wave of Innovative Brands
                    </h1>
                    <p className="text-lg text-gray-200 md:text-xl">
                        BrandBoost Fund is a rolling fund dedicated to supporting and scaling emerging direct-to-consumer brands.
                    </p>
                </div>
            </div>
        </section>
        
        <section id="metrics" className="py-12 md:py-24">
          <div className="container">
            <FundraiserMetrics metrics={metrics} />
          </div>
        </section>

        <section id="brands" className="bg-white py-12 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center mb-12">
                <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl">Our Portfolio</h2>
                <p className="mt-4 text-muted-foreground">We're proud to back these incredible brands on their journey to success.</p>
            </div>
            <ApprovedBrands brands={approvedBrands} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
