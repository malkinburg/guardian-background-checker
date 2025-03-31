
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Clock, FileCheck, UserCheck, AlertCircle, Lock } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Shield className="h-12 w-12 text-teal-600" />,
      title: "Comprehensive Screening",
      description: "Our thorough background verification ensures all support workers meet your safety standards."
    },
    {
      icon: <Clock className="h-12 w-12 text-teal-600" />,
      title: "Rapid Results",
      description: "Receive your background check results quickly, with most checks completed within 1-2 business days."
    },
    {
      icon: <FileCheck className="h-12 w-12 text-teal-600" />,
      title: "Official Certification",
      description: "All background checks are officially certified by authorized government-approved screening providers."
    },
    {
      icon: <UserCheck className="h-12 w-12 text-teal-600" />,
      title: "Compliance Guarantees",
      description: "Stay compliant with industry regulations and ensure your team meets all legal requirements."
    },
    {
      icon: <AlertCircle className="h-12 w-12 text-teal-600" />,
      title: "Advanced Flagging System",
      description: "Our system highlights potential concerns, allowing for appropriate risk management and follow-up."
    },
    {
      icon: <Lock className="h-12 w-12 text-teal-600" />,
      title: "Secure Data Handling",
      description: "Your personal information is encrypted and handled with the highest security standards."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-teal-800 mb-4">Why Choose Guardian Care Pro</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Our platform provides secure, reliable background screening specifically designed for care professionals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-slate-200 hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-2">
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="text-xl text-teal-700">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
