
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Logo from "@/components/Logo";
import { useToast } from "@/hooks/use-toast";
import CheckProgressStepper from '@/components/CheckProgressStepper';
import { Card } from '@/components/ui/card';
import { Camera, CreditCard, FileText, Upload } from 'lucide-react';

const IdentityVerification = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [verificationMethod, setVerificationMethod] = useState<string>('document');
  const [birthDetails, setBirthDetails] = useState({
    day: '',
    month: '',
    year: '',
    countryOfBirth: 'Australia'
  });
  
  const steps = [
    { id: 1, label: 'Details', status: 'completed' as const },
    { id: 2, label: 'Address', status: 'completed' as const },
    { id: 3, label: 'Identity', status: 'current' as const },
    { id: 4, label: 'Work', status: 'upcoming' as const },
    { id: 5, label: 'Finalise', status: 'upcoming' as const }
  ];
  
  const checkId = "10662663";
  
  const handleSelectBirthDetail = (field: string, value: string) => {
    setBirthDetails({
      ...birthDetails,
      [field]: value
    });
  };
  
  const handleContinue = () => {
    // Validate birth details
    if (!birthDetails.day || !birthDetails.month || !birthDetails.year) {
      toast({
        title: "Missing information",
        description: "Please complete all date of birth fields before continuing.",
        variant: "destructive",
      });
      return;
    }
    
    // Store in session storage (in a real app, would send to backend)
    sessionStorage.setItem('birthDetails', JSON.stringify(birthDetails));
    sessionStorage.setItem('verificationMethod', verificationMethod);
    
    toast({
      title: "Identity information saved",
      description: "Your identity information has been saved successfully.",
    });
    
    // Navigate to next step
    navigate("/work-details");
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
          <h1 className="text-2xl font-bold mb-6">Identity Verification</h1>
          
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-800">Date of birth</h2>
              <p className="text-sm text-slate-600">
                This should be your actual birth date (not a name day or other traditional date) and must match your identity documentation
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                <div className="space-y-2">
                  <Label htmlFor="birth-day">Day</Label>
                  <Select 
                    value={birthDetails.day} 
                    onValueChange={(value) => handleSelectBirthDetail('day', value)}
                  >
                    <SelectTrigger id="birth-day">
                      <SelectValue placeholder="Select a day" />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(31)].map((_, i) => (
                        <SelectItem key={i+1} value={(i+1).toString()}>
                          {i+1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="birth-month">Month</Label>
                  <Select 
                    value={birthDetails.month} 
                    onValueChange={(value) => handleSelectBirthDetail('month', value)}
                  >
                    <SelectTrigger id="birth-month">
                      <SelectValue placeholder="Select a month" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">January</SelectItem>
                      <SelectItem value="2">February</SelectItem>
                      <SelectItem value="3">March</SelectItem>
                      <SelectItem value="4">April</SelectItem>
                      <SelectItem value="5">May</SelectItem>
                      <SelectItem value="6">June</SelectItem>
                      <SelectItem value="7">July</SelectItem>
                      <SelectItem value="8">August</SelectItem>
                      <SelectItem value="9">September</SelectItem>
                      <SelectItem value="10">October</SelectItem>
                      <SelectItem value="11">November</SelectItem>
                      <SelectItem value="12">December</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="birth-year">Year</Label>
                  <Select 
                    value={birthDetails.year} 
                    onValueChange={(value) => handleSelectBirthDetail('year', value)}
                  >
                    <SelectTrigger id="birth-year">
                      <SelectValue placeholder="Select a year" />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(100)].map((_, i) => {
                        const year = new Date().getFullYear() - i;
                        return (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-800">Place of birth</h2>
              
              <div className="space-y-2">
                <Label>Were you born in Australia?</Label>
                <RadioGroup 
                  defaultValue="Australia" 
                  value={birthDetails.countryOfBirth}
                  onValueChange={(value) => handleSelectBirthDetail('countryOfBirth', value)}
                  className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Australia" id="australia" />
                    <Label htmlFor="australia">Yes, I was born in Australia</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Other" id="elsewhere" />
                    <Label htmlFor="elsewhere">No, I was born somewhere else</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-800">Identity documents</h2>
              <p className="text-sm text-slate-600">
                Please select how you'd like to verify your identity
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div 
                  className={`border ${verificationMethod === 'document' ? 'border-teal-600 bg-teal-50' : 'border-slate-200'} rounded-lg p-4 cursor-pointer transition-colors`}
                  onClick={() => setVerificationMethod('document')}
                >
                  <div className="flex justify-center">
                    <FileText className={`h-12 w-12 ${verificationMethod === 'document' ? 'text-teal-600' : 'text-slate-400'} mb-2`} />
                  </div>
                  <h3 className="font-medium text-center mb-2">Document Upload</h3>
                  <p className="text-xs text-slate-500 text-center">
                    Upload your driver license, passport, or other government ID
                  </p>
                </div>
                
                <div 
                  className={`border ${verificationMethod === 'camera' ? 'border-teal-600 bg-teal-50' : 'border-slate-200'} rounded-lg p-4 cursor-pointer transition-colors`}
                  onClick={() => setVerificationMethod('camera')}
                >
                  <div className="flex justify-center">
                    <Camera className={`h-12 w-12 ${verificationMethod === 'camera' ? 'text-teal-600' : 'text-slate-400'} mb-2`} />
                  </div>
                  <h3 className="font-medium text-center mb-2">Camera Verification</h3>
                  <p className="text-xs text-slate-500 text-center">
                    Use your camera to scan your ID and take a selfie
                  </p>
                </div>
                
                <div 
                  className={`border ${verificationMethod === 'card' ? 'border-teal-600 bg-teal-50' : 'border-slate-200'} rounded-lg p-4 cursor-pointer transition-colors`}
                  onClick={() => setVerificationMethod('card')}
                >
                  <div className="flex justify-center">
                    <CreditCard className={`h-12 w-12 ${verificationMethod === 'card' ? 'text-teal-600' : 'text-slate-400'} mb-2`} />
                  </div>
                  <h3 className="font-medium text-center mb-2">Financial Verification</h3>
                  <p className="text-xs text-slate-500 text-center">
                    Verify with your credit card or bank account details
                  </p>
                </div>
              </div>
              
              {verificationMethod === 'document' && (
                <Card className="p-4 mt-4 bg-slate-50">
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                    <Upload className="h-10 w-10 text-slate-400 mx-auto mb-2" />
                    <h3 className="font-medium">Upload your identification document</h3>
                    <p className="text-sm text-slate-500 mb-4">
                      Supported formats: JPG, PNG, PDF (max 10MB)
                    </p>
                    <Button 
                      variant="outline"
                      className="bg-white"
                    >
                      Choose File
                    </Button>
                    <p className="text-xs text-slate-400 mt-4">
                      For demonstration purposes only. No files will be uploaded.
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>
          
          <div className="flex justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={() => navigate("/address-history")}
            >
              Back
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

export default IdentityVerification;
