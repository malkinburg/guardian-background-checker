
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Loader, CheckCircle, Clock, Search, FileText, ShieldCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import ResultsDisplay from "./ResultsDisplay";

interface SignUpFormProps {
  onClose: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onClose }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "Jane Doe",
    email: "jane@example.com",
    phone: "(123) 456-7890",
    dob: "1985-06-15",
    address: "123 Main St, Sydney NSW 2000",
    governmentId: "1234 5678 9012",
    consent: false,
  });
  
  const [formState, setFormState] = useState<
    "input" | "processing" | "document_check" | "identity_verification" | "police_check" | "final_review" | "result"
  >("input");
  
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<"cleared" | "flagged" | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentStepDetails, setCurrentStepDetails] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    
    // Clear error for field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.governmentId.trim()) newErrors.governmentId = "Government ID is required";
    if (!formData.consent) newErrors.consent = "You must consent to the background check";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Please correct the errors",
        description: "There are issues with your form submission.",
        variant: "destructive",
      });
      return;
    }
    
    // Start the background check process
    setFormState("processing");
    setProgress(10);
    
    toast({
      title: "Application Submitted",
      description: "Your application has been received by NCC. Processing will begin shortly.",
    });

    // Simulate the process steps
    runProcessFlow();
  };

  const runProcessFlow = () => {
    // Simulating the flow through different steps with timeouts
    const steps = [
      { 
        state: "processing", 
        progress: 10, 
        duration: 2000,
        details: ["Initializing application", "Connecting to NCC secure servers", "Preparing data for verification"]
      },
      { 
        state: "document_check", 
        progress: 30, 
        duration: 3000,
        details: [
          "Validating government ID format",
          "Checking ID expiration status",
          "Verifying document authenticity",
          "Document check complete"
        ]
      },
      { 
        state: "identity_verification", 
        progress: 50, 
        duration: 4000,
        details: [
          "Cross-referencing personal details",
          "Verifying address history",
          "Validating contact information",
          "Address verification complete"
        ]
      },
      { 
        state: "police_check", 
        progress: 70, 
        duration: 5000,
        details: [
          "Initiating National Police Check",
          "Searching national database",
          "Checking interstate records",
          "Analyzing results",
          "Police check complete"
        ]
      },
      { 
        state: "final_review", 
        progress: 90, 
        duration: 3000,
        details: [
          "Compiling verification data",
          "Conducting final assessment",
          "Preparing results",
          "Finalizing check status"
        ]
      },
      { 
        state: "result", 
        progress: 100, 
        duration: 0,
        details: []
      }
    ];

    // Process each step sequentially
    let currentIndex = 0;
    
    const processNextStep = () => {
      if (currentIndex < steps.length) {
        const step = steps[currentIndex];
        setFormState(step.state as any);
        setProgress(step.progress);
        setCurrentStepDetails(step.details);
        
        currentIndex++;
        
        if (step.duration > 0) {
          setTimeout(processNextStep, step.duration);
        } else {
          // Final step - determine the result
          const isCleared = Math.random() > 0.5;
          setResult(isCleared ? "cleared" : "flagged");
          
          toast({
            title: isCleared ? "Background Check Complete" : "Further Review Required",
            description: isCleared 
              ? "You have been cleared by NCC."
              : "Your application has been flagged for manual review.",
            variant: isCleared ? "default" : "destructive",
          });
        }
      }
    };
    
    // Start the process
    processNextStep();
  };

  const resetForm = () => {
    setFormState("input");
    setResult(null);
    setProgress(0);
    setCurrentStepDetails([]);
  };

  const renderStepIcon = () => {
    switch (formState) {
      case "document_check":
        return <FileText className="h-6 w-6 text-teal-600 animate-pulse" />;
      case "identity_verification":
        return <Search className="h-6 w-6 text-teal-600 animate-pulse" />;
      case "police_check":
        return <ShieldCheck className="h-6 w-6 text-teal-600 animate-pulse" />;
      case "final_review":
        return <CheckCircle className="h-6 w-6 text-teal-600 animate-pulse" />;
      default:
        return <Clock className="h-6 w-6 text-teal-600 animate-pulse" />;
    }
  };
  
  const getStepTitle = () => {
    switch (formState) {
      case "processing":
        return "Initializing Background Check";
      case "document_check":
        return "Document Verification";
      case "identity_verification":
        return "Identity Verification";
      case "police_check":
        return "National Police Check";
      case "final_review":
        return "Final Assessment";
      default:
        return "Processing";
    }
  };

  if (formState === "result") {
    return <ResultsDisplay result={result} onReset={resetForm} onClose={onClose} />;
  }

  if (formState !== "input") {
    return (
      <div className="py-6 text-center space-y-6">
        <div className="w-20 h-20 bg-teal-50 rounded-full mx-auto flex items-center justify-center mb-4">
          {renderStepIcon()}
        </div>
        
        <h3 className="text-xl font-bold text-teal-700">
          {getStepTitle()}
        </h3>
        
        <div className="space-y-3 px-2 py-4">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-slate-500">{progress}% Complete</p>
        </div>
        
        <div className="bg-slate-50 p-4 rounded-md text-left space-y-3 max-h-48 overflow-y-auto">
          <p className="text-sm font-medium text-slate-700">Processing Details:</p>
          <ul className="space-y-2">
            {currentStepDetails.map((detail, index) => (
              <li key={index} className="text-sm text-slate-600 flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-teal-500 mt-1.5 mr-2"></span>
                {detail}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="text-center text-sm text-slate-500 mt-4">
          <p>Reference: NCC-{Math.floor(100000 + Math.random() * 900000)}</p>
          <p>This process may take a few moments. Please do not close this window.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-2">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
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
          <Label htmlFor="dob">Date of Birth</Label>
          <Input
            id="dob"
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
            className={errors.dob ? "border-red-500" : ""}
          />
          {errors.dob && <p className="text-sm text-red-500">{errors.dob}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={errors.address ? "border-red-500" : ""}
          />
          {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
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
        </div>
        
        <div className="flex items-start space-x-2 pt-2">
          <Checkbox 
            id="consent" 
            name="consent"
            checked={formData.consent}
            onCheckedChange={(checked) => 
              setFormData({...formData, consent: checked as boolean})
            }
            className={errors.consent ? "border-red-500" : ""}
          />
          <div className="grid gap-1.5 leading-none">
            <Label htmlFor="consent" className="text-sm font-normal">
              I understand and consent to the background check through National Crime Check.
            </Label>
            {errors.consent && <p className="text-sm text-red-500">{errors.consent}</p>}
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-4 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button 
          type="submit" 
          className="bg-teal-600 hover:bg-teal-700"
        >
          Submit Application
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
