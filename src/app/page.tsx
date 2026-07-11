
import Categories from "@/components/home/Categories";
import FAQ from "@/components/home/FAQ";
import FeaturedEvents from "@/components/home/FeaturedEvents";
import Hero from "@/components/home/Hero";
import Newsletter from "@/components/home/NewsLetter";
import Statistics from "@/components/home/Statistics";
import Testimonials from "@/components/home/Testimonials";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function Home() {
  return (
   <main>
 <Hero></Hero>
 <FeaturedEvents/>
 <Categories/>
 <WhyChooseUs/>
 <Statistics/>
 <Testimonials/>
 <FAQ/>
 <Newsletter/>
   </main>
    
  );
}
