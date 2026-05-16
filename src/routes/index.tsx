import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getHomeData } from "@/lib/products.functions";
import { Hero } from "@/components/home/Hero";
import { FilmStrip } from "@/components/home/FilmStrip";
import { Categories } from "@/components/home/Categories";
import { Marquee } from "@/components/home/Marquee";
import { FeaturedWorks } from "@/components/home/FeaturedWorks";
import { ArtistFeature } from "@/components/home/ArtistFeature";
import { Stats } from "@/components/home/Stats";
import { Manifesto } from "@/components/home/Manifesto";
import { Testimonials } from "@/components/home/Testimonials";
import { Newsletter } from "@/components/home/Newsletter";
import { Process } from "@/components/home/Process";
import { VideoReel } from "@/components/home/VideoReel";
import { JournalTeaser } from "@/components/home/JournalTeaser";
import { PressStrip } from "@/components/home/PressStrip";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data } = useQuery({
    queryKey: ["home"],
    queryFn: () => getHomeData(),
  });
  const products = data?.products ?? [];
  const testimonials = data?.testimonials ?? [];
  const journal = data?.journal ?? [];
  const press = data?.press ?? [];

  return (
    <>
      <Hero />
      <FilmStrip />
      <Categories />
      <Marquee />
      <FeaturedWorks products={products} />
      <ArtistFeature />
      <Stats />
      <Process />
      <VideoReel />
      <Manifesto />
      <JournalTeaser posts={journal} />
      <PressStrip items={press} />
      <Testimonials items={testimonials} />
      <Newsletter />
    </>
  );
}
