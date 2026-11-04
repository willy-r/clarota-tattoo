import NoiseOverlay from "@/components/shared/NoiseOverlay";
import ScrollProgress from "@/components/shared/ScrollProgress";
import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Portfolio from "@/components/sections/Portfolio";
import StylesSection from "@/components/sections/Styles";
// import Testimonials from "@/components/sections/Testimonials";
import Booking from "@/components/sections/Booking";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import StructuredData from "@/components/shared/StructuredData";

export default function Home() {
  return (
    <>
      <StructuredData />
      <NoiseOverlay />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Portfolio />
        <StylesSection />
        {/* <Testimonials /> */}
        <Booking />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
