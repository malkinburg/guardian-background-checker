
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { useToast } from "@/hooks/use-toast";
import CheckProgressStepper from '@/components/CheckProgressStepper';
import { Card } from '@/components/ui/card';
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertTriangle, Clock, Search, FileText, ShieldCheck, ArrowLeft } from 'lucide-react';

const CheckStatus = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [checkState, setCheckState] = useState<
    "initializing" | "document_verification" | "police_check" | "final_assessment" | "completed"
  >("initializing");
  
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<"cleared" | "flagged" | null>(null);
  const [currentStepDetails, setCurrentStepDetails] = useState<string[]>([]);
  
  const steps = [
    { id: 1, label: 'Details', status: 'completed' as const },
    { id: 2, label: 'Address', status: 'completed' as const },
    { id: 3, label: 'Identity', status: 'completed' as const },
    { id: 4, label: 'Work', status: 'completed' as const },
    { id: 5, label: 'Finalise', status: 'current' as const }
  ];
  
  const checkId = "10662663";
  
  // Simulate the check process
  useEffect(() => {
    const runCheck = async () => {
      // Initializing
      setCheckState("initializing");
      setProgress(10);
      setCurrentStepDetails([
        "Preparing application data",
        "Connecting to verification services",
        "Initiating background check process",
      ]);
      
      // Document verification
      await new Promise(resolve => setTimeout(resolve, 3000));
      setCheckState("document_verification");
      setProgress(30);
      setCurrentStepDetails([
        "Verifying identity documents",
        "Checking address history",
        "Validating personal information",
        "Cross-referencing provided details",
      ]);
      
      // Police check
      await new Promise(resolve => setTimeout(resolve, 4000));
      setCheckState("police_check");
      setProgress(60);
      setCurrentStepDetails([
        "Submitting request to Police Checking Service",
        "Searching national database records",
        "Performing interstate record checks",
        "Analyzing criminal history information",
      ]);
      
      // Final assessment
      await new Promise(resolve => setTimeout(resolve, 4000));
      setCheckState("final_assessment");
      setProgress(90);
      setCurrentStepDetails([
        "Compiling check results",
        "Performing final assessment",
        "Generating clearance certificate",
        "Preparing final report",
      ]);
      
      // Complete
      await new Promise(resolve => setTimeout(resolve, 3000));
      setCheckState("completed");
      setProgress(100);
      
      // Randomly determine result
      const isCleared = Math.random() > 0.5;
      setResult(isCleared ? "cleared" : "flagged");
      
      toast({
        title: isCleared ? "Background Check Complete" : "Further Review Required",
        description: isCleared 
          ? "You have been cleared by our verification process."
          : "Your application has been flagged for manual review.",
        variant: isCleared ? "default" : "destructive",
      });
    };
    
    runCheck();
  }, [toast]);
  
  const getStepIcon = () => {
    switch (checkState) {
      case "document_verification":
        return <FileText className="h-8 w-8 text-blue-600 animate-pulse" />;
      case "police_check":
        return <ShieldCheck className="h-8 w-8 text-blue-600 animate-pulse" />;
      case "final_assessment":
        return <CheckCircle className="h-8 w-8 text-blue-600 animate-pulse" />;
      default:
        return <Clock className="h-8 w-8 text-blue-600 animate-pulse" />;
    }
  };
  
  const getStepTitle = () => {
    switch (checkState) {
      case "initializing":
        return "Initializing Background Check";
      case "document_verification":
        return "Document & Identity Verification";
      case "police_check":
        return "National Police Check";
      case "final_assessment":
        return "Final Assessment";
      case "completed":
        return result === "cleared" ? "Check Completed - Cleared" : "Check Completed - Manual Review Required";
      default:
        return "Processing";
    }
  };
  
  const startNewCheck = () => {
    navigate("/");
  };
  
  const renderCertificate = () => {
    const referenceNumber = `GCP-${Math.floor(100000 + Math.random() * 900000)}`;
    const issueDate = new Date().toLocaleDateString();
    const expiryDate = new Date(Date.now() + 365*24*60*60*1000).toLocaleDateString();
    
    return result === "cleared" ? (
      <Card className="p-6 bg-green-50 border-green-200">
        <div className="flex items-center mb-4">
          <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mr-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-green-800">Background Check Clearance Certificate</h3>
            <p className="text-sm text-green-700">
              Certificate Reference: {referenceNumber}
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-green-800 font-medium">Status</p>
              <p className="text-sm bg-green-200 text-green-800 px-2 py-1 rounded-full w-fit font-medium">Cleared</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-green-800 font-medium">Check Type</p>
              <p className="text-sm text-green-800">National Police History Check</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-green-800 font-medium">Issue Date</p>
              <p className="text-sm text-green-800">{issueDate}</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-green-800 font-medium">Expiry Date</p>
              <p className="text-sm text-green-800">{expiryDate}</p>
            </div>
          </div>
          
          <hr className="border-green-200" />
          
          <div className="space-y-2">
            <h4 className="font-medium text-green-800">Verified Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="space-y-1">
                <p className="text-xs text-green-700 font-medium">Full Name</p>
                <p className="text-sm text-green-800">Jane Doe</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-xs text-green-700 font-medium">Date of Birth</p>
                <p className="text-sm text-green-800">15/06/1985</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-xs text-green-700 font-medium">Current Address</p>
                <p className="text-sm text-green-800">123 Main St, Sydney NSW 2000</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-xs text-green-700 font-medium">Government ID</p>
                <p className="text-sm text-green-800">1234 5678 9012</p>
              </div>
            </div>
          </div>
          
          <hr className="border-green-200" />
          
          <div className="space-y-2">
            <h4 className="font-medium text-green-800">Result Summary</h4>
            <p className="text-sm text-green-800">
              Based on the name and date of birth information provided in your application,
              a search of the National Police History database has found <strong>no disclosable court outcomes or pending charges</strong>.
            </p>
          </div>
          
          <hr className="border-green-200" />
          
          <div className="space-y-2">
            <h4 className="font-medium text-green-800">Certificate Usage</h4>
            <ul className="space-y-1">
              <li className="text-sm text-green-800 flex items-start">
                <span className="h-2 w-2 rounded-full bg-green-500 mt-1.5 mr-2 shrink-0"></span>
                <span>This certificate is valid for 12 months from the issue date.</span>
              </li>
              <li className="text-sm text-green-800 flex items-start">
                <span className="h-2 w-2 rounded-full bg-green-500 mt-1.5 mr-2 shrink-0"></span>
                <span>Share this certificate reference number with potential employers.</span>
              </li>
              <li className="text-sm text-green-800 flex items-start">
                <span className="h-2 w-2 rounded-full bg-green-500 mt-1.5 mr-2 shrink-0"></span>
                <span>Download and print the full certificate from your Guardian Care Pro dashboard.</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    ) : (
      <Card className="p-6 bg-amber-50 border-amber-200">
        <div className="flex items-center mb-4">
          <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center mr-3">
            <AlertTriangle className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-amber-800">Manual Review Required</h3>
            <p className="text-sm text-amber-700">
              Application Reference: {referenceNumber}
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-amber-800 font-medium">Status</p>
              <p className="text-sm bg-amber-200 text-amber-800 px-2 py-1 rounded-full w-fit font-medium">Additional Review Required</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-amber-800 font-medium">Check Type</p>
              <p className="text-sm text-amber-800">National Police History Check</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-amber-800 font-medium">Submission Date</p>
              <p className="text-sm text-amber-800">{issueDate}</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-amber-800 font-medium">Estimated Completion</p>
              <p className="text-sm text-amber-800">2-3 business days</p>
            </div>
          </div>
          
          <hr className="border-amber-200" />
          
          <div className="space-y-2">
            <h4 className="font-medium text-amber-800">Additional Information Needed</h4>
            <ul className="space-y-2">
              <li className="text-sm text-amber-800 flex items-start">
                <span className="h-2 w-2 rounded-full bg-amber-500 mt-1.5 mr-2 shrink-0"></span>
                <span>Additional identity verification documentation</span>
              </li>
              <li className="text-sm text-amber-800 flex items-start">
                <span className="h-2 w-2 rounded-full bg-amber-500 mt-1.5 mr-2 shrink-0"></span>
                <span>Confirmation of previous address history</span>
              </li>
              <li className="text-sm text-amber-800 flex items-start">
                <span className="h-2 w-2 rounded-full bg-amber-500 mt-1.5 mr-2 shrink-0"></span>
                <span>Clarification on name variations (if applicable)</span>
              </li>
            </ul>
          </div>
          
          <hr className="border-amber-200" />
          
          <div className="space-y-2">
            <h4 className="font-medium text-amber-800">Next Steps</h4>
            <ul className="space-y-2">
              <li className="text-sm text-amber-800 flex items-start">
                <span className="h-2 w-2 rounded-full bg-amber-500 mt-1.5 mr-2 shrink-0"></span>
                <span>A representative will contact you within 2-3 business days.</span>
              </li>
              <li className="text-sm text-amber-800 flex items-start">
                <span className="h-2 w-2 rounded-full bg-amber-500 mt-1.5 mr-2 shrink-0"></span>
                <span>Check your email for communication from our verification team.</span>
              </li>
              <li className="text-sm text-amber-800 flex items-start">
                <span className="h-2 w-2 rounded-full bg-amber-500 mt-1.5 mr-2 shrink-0"></span>
                <span>Have your reference number and ID ready when responding.</span>
              </li>
            </ul>
          </div>
          
          <hr className="border-amber-200" />
          
          <div className="space-y-2">
            <h4 className="font-medium text-amber-800">Important Note</h4>
            <p className="text-sm text-amber-800">
              This additional review is a standard procedure in certain cases and does not necessarily indicate any issues with your application.
              Many applications requiring further review are successfully cleared after additional information is provided.
            </p>
          </div>
        </div>
      </Card>
    );
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
          {checkState !== "completed" ? (
            <div className="py-6 text-center space-y-6">
              <div className="w-20 h-20 bg-blue-50 rounded-full mx-auto flex items-center justify-center mb-4">
                {getStepIcon()}
              </div>
              
              <h3 className="text-xl font-bold text-blue-700">
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
                      <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-1.5 mr-2"></span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="text-center text-sm text-slate-500 mt-4">
                <p>Reference: GCP-{checkId}</p>
                <p>This process may take a few moments. Please do not close this window.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold mb-2">
                {result === "cleared" ? 
                  "Congratulations! Your Check is Complete" : 
                  "Your Application Requires Additional Review"
                }
              </h1>
              
              {renderCertificate()}
              
              <div className="flex justify-center mt-6 space-x-4">
                <Button variant="outline" onClick={startNewCheck}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Return to Home
                </Button>
                
                <Button className="bg-teal-600 hover:bg-teal-700">
                  {result === "cleared" ? "Download Certificate" : "Contact Support"}
                </Button>
              </div>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
};

export default CheckStatus;
