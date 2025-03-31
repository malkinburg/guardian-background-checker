
import React from 'react';
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, Clock } from "lucide-react";

interface HeroSectionProps {
  onSignUpClick: () => void;
}

const HeroSection = ({ onSignUpClick }: HeroSectionProps) => {
  return (
    <section className="bg-gradient-to-b from-teal-50 to-white py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/2 space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-teal-800 leading-tight">
              Guardian Care Pro – Trusted Background Checks
            </h1>
            <p className="text-lg md:text-xl text-slate-600">
              Sign up and let us handle your background verification so you can focus on delivering quality care.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-teal-600 hover:bg-teal-700"
                onClick={onSignUpClick}
              >
                Sign Up for Background Check
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-teal-600 text-teal-700 hover:bg-teal-50"
              >
                Learn More
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-teal-600" />
                <span className="text-slate-700">Fast processing</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-teal-600" />
                <span className="text-slate-700">Secure verification</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-teal-600" />
                <span className="text-slate-700">24/7 support</span>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-slate-100 max-w-md mx-auto">
              <img 
                src="/placeholder.svg" 
                alt="Background Check Process" 
                className="w-full rounded-md"
              />
              <div className="mt-4 text-center p-3 bg-teal-50 rounded-md">
                <p className="text-teal-700 font-medium">
                  Trusted by over 5,000 care providers across Australia
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
