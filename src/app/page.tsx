import { EarlyAccessSection } from "@/components/EarlyAccessSection";
import { DetailedFeatures } from "@/components/DetailedFeatures";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { IntegrationsSection } from "@/components/IntegrationsSection";
import { Navbar } from "@/components/Navbar";
import { PainPoints } from "@/components/PainPoints";
import { PipelineSection } from "@/components/PipelineSection";
import { ProductWalkthrough } from "@/components/ProductWalkthrough";
import { SalesJourney } from "@/components/SalesJourney";
import { WorkflowCompare } from "@/components/WorkflowCompare";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PipelineSection />
        <ProductWalkthrough />
        <SalesJourney />
        <IntegrationsSection />
        <DetailedFeatures />
        <WorkflowCompare />
        <PainPoints />
        <FAQ />
        <EarlyAccessSection />
      </main>
      <Footer />
    </>
  );
}
