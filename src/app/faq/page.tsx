import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqItems = [
  {
    question: 'What do I get for N10,000?',
    answer:
      'You get a professionally designed, single-page website with a contact section and an FAQ section. We will build and host it for you on Vercel.',
  },
  {
    question: 'What is not included?',
    answer:
      'The base price does not include a custom domain name (like yourbrand.com) or a logo/favicon. These can be added for an additional fee.',
  },
  {
    question: 'How much is a custom domain?',
    answer:
      'A custom domain costs an extra N30,000. We will purchase it and connect it to your website for you.',
  },
  {
    question: 'Can you design a logo for me?',
    answer:
      'Yes, we can design a simple logo and a matching favicon for an additional N1,000.',
  },
  {
    question: 'How long will it take to get my website?',
    answer:
      'Your website will be live within 3 days after your brand is approved and we have all the necessary information from you.',
  },
  {
    question: "What do you mean by 'No web apps'?",
    answer:
      'We build static websites, which are great for showcasing your business, providing information, and capturing leads. We do not build complex applications with user accounts, databases, or dynamic functionality beyond a simple contact form.',
  },
  {
    question: 'Where will my website be hosted?',
    answer:
      'We host all websites on Vercel, a fast and reliable hosting platform. If you do not purchase a custom domain, your site will be available at a Vercel-provided URL (e.g., yourbrand.vercel.app).',
  },
];

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-3xl py-12 md:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-headline font-bold">Frequently Asked Questions</h1>
            <p className="mt-4 text-muted-foreground">
              Everything you need to know about our fundraiser and what you get.
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-lg text-left">{item.question}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
      <Footer />
    </div>
  );
}
