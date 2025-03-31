
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/Logo";
import { useToast } from "@/hooks/use-toast";
import CheckProgressStepper from '@/components/CheckProgressStepper';
import { Card } from '@/components/ui/card';

const PersonalDetails = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "Jane Doe",
    email: "jane@example.com",
    phone: "(123) 456-7890",
    governmentId: "1234 5678 9012",
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const steps = [
    { id: 1, label: 'Details', status: 'current' as const },
    { id: 2, label: 'Address', status: 'upcoming' as const },
    { id: 3, label: 'Identity', status: 'upcoming' as const },
    { id: 4, label: 'Work', status: 'upcoming' as const },
    { id: 5, label: 'Finalise', status: 'upcoming' as const }
  ];
  
  const checkId = "10662663";
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.governmentId.trim()) newErrors.governmentId = "Government ID is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleContinue = () => {
    if (!validateForm()) {
      toast({
        title: "Missing information",
        description: "Please complete all required fields before continuing.",
        variant: "destructive",
      });
      return;
    }
    
    // Store in session storage (in a real app, would send to backend)
    sessionStorage.setItem('personalDetails', JSON.stringify(formData));
    
    toast({
      title: "Personal details saved",
      description: "Your personal details have been saved successfully.",
    });
    
    // Navigate to next step
    navigate("/address-history");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white py-4 shadow-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Logo />
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <CheckProgressStepper steps={steps} checkId={checkId} />
        
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">Personal Details</h1>
          
          <div className="bg-blue-50 p-4 rounded-md mb-6">
            <p className="text-blue-700">All information provided must match your identification documents.</p>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Legal Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={errors.fullName ? "border-red-500" : ""}
              />
              {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="governmentId">Government ID / License</Label>
              <Input
                id="governmentId"
                name="governmentId"
                value={formData.governmentId}
                onChange={handleChange}
                className={errors.governmentId ? "border-red-500" : ""}
              />
              {errors.governmentId && <p className="text-sm text-red-500">{errors.governmentId}</p>}
              <p className="text-xs text-slate-500">
                Enter your Driver License number, Passport number, or other government-issued ID.
              </p>
            </div>
          </div>
          
          <div className="flex justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
            <Button 
              className="bg-teal-600 hover:bg-teal-700"
              onClick={handleContinue}
            >
              Save & Continue
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default PersonalDetails;
