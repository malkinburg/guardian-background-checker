
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import SignUpForm from "@/components/SignUpForm";
import FeaturesSection from "@/components/FeaturesSection";
import Logo from "@/components/Logo";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white py-4 shadow-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Logo />
          <Button 
            variant="outline" 
            onClick={() => setIsModalOpen(true)}
            className="hidden md:inline-flex"
          >
            Sign Up
          </Button>
        </div>
      </header>

      <main className="flex-grow">
        <HeroSection onSignUpClick={() => setIsModalOpen(true)} />
        <FeaturesSection />
      </main>

      <Footer />

      {/* Sign Up Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Start Your NCC Background Check
            </DialogTitle>
          </DialogHeader>
          <SignUpForm onClose={() => setIsModalOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
