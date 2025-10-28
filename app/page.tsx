"use client";
import ResumeBuilder from "@/components/ResumeBuilder";
import Footer from "@/components/shared/Footer";
import MobileWebViewWarningModal from "@/components/shared/MobileWebViewWarningModal";

const Home = () => {
  return (
    <div>
      <ResumeBuilder />
      <Footer />
      <MobileWebViewWarningModal />
    </div>
  );
};

export default Home;
