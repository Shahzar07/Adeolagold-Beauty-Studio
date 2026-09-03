import { Hero } from "@/components/home/Hero";
import { BrandStatement } from "@/components/home/BrandStatement";
import { CategoryTiles } from "@/components/home/CategoryTiles";
import { FeaturedCollection } from "@/components/home/FeaturedCollection";
import { CampaignBanner } from "@/components/home/CampaignBanner";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { AboutPreview } from "@/components/home/AboutPreview";
import { WhySection } from "@/components/home/WhySection";
import { Testimonials } from "@/components/home/Testimonials";
import { InstagramGrid } from "@/components/home/InstagramGrid";
import { JournalPreview } from "@/components/home/JournalPreview";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandStatement />
      <CategoryTiles />
      <FeaturedCollection />
      <CampaignBanner />
      <ServicesPreview />
      <AboutPreview />
      <WhySection />
      <Testimonials />
      <JournalPreview />
      <InstagramGrid />
    </>
  );
}
