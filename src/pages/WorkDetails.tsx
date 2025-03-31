
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

const WorkDetails = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [workData, setWorkData] = useState({
    workType: 'care',
    suburb: 'Melbourne',
    state: 'VIC',
    employerName: 'Guardian Care Services',
    employerContact: 'John Smith',
    employerPhone: '(03) 1234 5678',
    employerEmail: 'hr@guardiancare.com.au',
  });
  
  const steps = [
    { id: 1, label: 'Details', status: 'completed' as const },
    { id: 2, label: 'Address', status: 'completed' as const },
    { id: 3, label: 'Identity', status: 'completed' as const },
    { id: 4, label: 'Work', status: 'current' as const },
    { id: 5, label: 'Finalise', status: 'upcoming' as const }
  ];
  
  const checkId = "10662663";
  
  const handleChange = (field: string, value: string) => {
    setWorkData({
      ...workData,
      [field]: value,
    });
  };
  
  const handleContinue = () => {
    if (!workData.suburb || !workData.state) {
      toast({
        title: "Missing information",
        description: "Please complete all required work location fields before continuing.",
        variant: "destructive",
      });
      return;
    }
    
    // Store in session storage (in a real app, would send to backend)
    sessionStorage.setItem('workDetails', JSON.stringify(workData));
    
    toast({
      title: "Work details saved",
      description: "Your work details have been saved successfully.",
    });
    
    // Navigate to final step
    navigate("/check-status");
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
          <h1 className="text-2xl font-bold mb-6">Work Details</h1>
          
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-800">Type of Work</h2>
              
              <div className="space-y-2">
                <Label>What type of care work are you applying for?</Label>
                <RadioGroup 
                  value={workData.workType}
                  onValueChange={(value) => handleChange('workType', value)}
                  className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2"
                >
                  <div className={`p-3 border rounded-md ${workData.workType === 'care' ? 'bg-teal-50 border-teal-300' : 'border-slate-200'}`}>
                    <RadioGroupItem value="care" id="care" className="mb-1 mr-2" />
                    <Label htmlFor="care" className="font-medium">Aged Care & Disability Support</Label>
                    <p className="text-xs text-slate-500 ml-6">Working with elderly or people with disabilities</p>
                  </div>
                  
                  <div className={`p-3 border rounded-md ${workData.workType === 'childcare' ? 'bg-teal-50 border-teal-300' : 'border-slate-200'}`}>
                    <RadioGroupItem value="childcare" id="childcare" className="mb-1 mr-2" />
                    <Label htmlFor="childcare" className="font-medium">Childcare & Education</Label>
                    <p className="text-xs text-slate-500 ml-6">Working with children in care or educational settings</p>
                  </div>
                  
                  <div className={`p-3 border rounded-md ${workData.workType === 'health' ? 'bg-teal-50 border-teal-300' : 'border-slate-200'}`}>
                    <RadioGroupItem value="health" id="health" className="mb-1 mr-2" />
                    <Label htmlFor="health" className="font-medium">Healthcare Professional</Label>
                    <p className="text-xs text-slate-500 ml-6">Medical, nursing, or allied health services</p>
                  </div>
                  
                  <div className={`p-3 border rounded-md ${workData.workType === 'other' ? 'bg-teal-50 border-teal-300' : 'border-slate-200'}`}>
                    <RadioGroupItem value="other" id="other" className="mb-1 mr-2" />
                    <Label htmlFor="other" className="font-medium">Other Support Services</Label>
                    <p className="text-xs text-slate-500 ml-6">Administration, transport, or other support roles</p>
                  </div>
                </RadioGroup>
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-800">Location of work</h2>
              <p className="text-sm text-slate-600">
                This is the town and state where your role is located — office location, store location, etc.
                For work-at-home, rideshare, and taxi positions, use your residential address instead.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="space-y-2">
                  <Label htmlFor="work-suburb">Suburb/Town of work</Label>
                  <Input
                    id="work-suburb"
                    value={workData.suburb}
                    onChange={(e) => handleChange('suburb', e.target.value)}
                    placeholder="e.g., Melbourne"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="work-state">State of work</Label>
                  <Select 
                    value={workData.state} 
                    onValueChange={(value) => handleChange('state', value)}
                  >
                    <SelectTrigger id="work-state">
                      <SelectValue placeholder="Select a state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NSW">NSW</SelectItem>
                      <SelectItem value="VIC">VIC</SelectItem>
                      <SelectItem value="QLD">QLD</SelectItem>
                      <SelectItem value="WA">WA</SelectItem>
                      <SelectItem value="SA">SA</SelectItem>
                      <SelectItem value="TAS">TAS</SelectItem>
                      <SelectItem value="ACT">ACT</SelectItem>
                      <SelectItem value="NT">NT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-800">Employer details (optional)</h2>
              
              <div className="grid grid-cols-1 gap-4 mt-2">
                <div className="space-y-2">
                  <Label htmlFor="employer-name">Employer/Organization Name</Label>
                  <Input
                    id="employer-name"
                    value={workData.employerName}
                    onChange={(e) => handleChange('employerName', e.target.value)}
                    placeholder="e.g., Guardian Care Services"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="employer-contact">Contact Person Name</Label>
                  <Input
                    id="employer-contact"
                    value={workData.employerContact}
                    onChange={(e) => handleChange('employerContact', e.target.value)}
                    placeholder="e.g., John Smith"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employer-phone">Contact Phone</Label>
                    <Input
                      id="employer-phone"
                      value={workData.employerPhone}
                      onChange={(e) => handleChange('employerPhone', e.target.value)}
                      placeholder="e.g., (03) 1234 5678"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="employer-email">Contact Email</Label>
                    <Input
                      id="employer-email"
                      value={workData.employerEmail}
                      onChange={(e) => handleChange('employerEmail', e.target.value)}
                      placeholder="e.g., hr@guardiancare.com.au"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={() => navigate("/identity-verification")}
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

export default WorkDetails;
