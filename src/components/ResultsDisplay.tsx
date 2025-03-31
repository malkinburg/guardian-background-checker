
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, FileText, Calendar, User, MapPin, Phone, Mail } from "lucide-react";

interface ResultsDisplayProps {
  result: "cleared" | "flagged" | null;
  onReset: () => void;
  onClose: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, onReset, onClose }) => {
  const referenceNumber = `GCP-${Math.floor(100000 + Math.random() * 900000)}`;
  const issueDate = new Date().toLocaleDateString();
  const expiryDate = new Date(Date.now() + 365*24*60*60*1000).toLocaleDateString();
  
  return (
    <div className="py-6 text-center space-y-6">
      {result === "cleared" ? (
        <>
          <div className="w-24 h-24 bg-green-100 rounded-full mx-auto flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-green-700">
            Congratulations, you have been Cleared by NCC!
          </h3>
          <p className="text-slate-600">
            Your background check has been successfully completed and you are cleared to proceed.
          </p>
          
          <div className="bg-green-50 p-4 rounded-md text-left">
            <div className="flex items-center mb-3">
              <FileText className="h-5 w-5 text-green-700 mr-2" />
              <h4 className="font-semibold text-green-800">NCC Clearance Certificate</h4>
            </div>
            
            <div className="space-y-3">
              <p className="text-sm text-green-800 flex items-center">
                <span className="font-semibold w-32">Reference:</span> 
                <span>{referenceNumber}</span>
              </p>
              <p className="text-sm text-green-800 flex items-center">
                <span className="font-semibold w-32">Status:</span> 
                <span className="bg-green-200 text-green-800 px-2 py-0.5 rounded-full text-xs font-medium">Cleared</span>
              </p>
              <p className="text-sm text-green-800 flex items-center">
                <Calendar className="h-4 w-4 mr-2" /> 
                <span className="font-semibold w-28">Issued:</span> 
                <span>{issueDate}</span>
              </p>
              <p className="text-sm text-green-800 flex items-center">
                <Calendar className="h-4 w-4 mr-2" /> 
                <span className="font-semibold w-28">Valid Until:</span> 
                <span>{expiryDate}</span>
              </p>
            </div>
            
            <div className="mt-4 pt-3 border-t border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Verified Information</h4>
              <div className="space-y-2">
                <p className="text-sm text-green-800 flex items-center">
                  <User className="h-4 w-4 mr-2" /> 
                  <span className="font-semibold w-28">Name:</span> 
                  <span>Jane Doe</span>
                </p>
                <p className="text-sm text-green-800 flex items-center">
                  <Mail className="h-4 w-4 mr-2" /> 
                  <span className="font-semibold w-28">Email:</span> 
                  <span>jane@example.com</span>
                </p>
                <p className="text-sm text-green-800 flex items-center">
                  <Phone className="h-4 w-4 mr-2" /> 
                  <span className="font-semibold w-28">Phone:</span> 
                  <span>(123) 456-7890</span>
                </p>
                <p className="text-sm text-green-800 flex items-center">
                  <MapPin className="h-4 w-4 mr-2" /> 
                  <span className="font-semibold w-28">Address:</span> 
                  <span>123 Main St, Sydney NSW 2000</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-md text-left mt-4">
            <h4 className="font-semibold text-green-800 mb-2">What's Next?</h4>
            <ul className="space-y-2 text-sm text-green-800">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2"></span>
                Your clearance certificate is available to download from your profile.
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2"></span>
                Share your clearance reference number with potential employers.
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2"></span>
                Your certificate is valid for 12 months from the issue date.
              </li>
            </ul>
          </div>
        </>
      ) : (
        <>
          <div className="w-24 h-24 bg-amber-100 rounded-full mx-auto flex items-center justify-center">
            <AlertTriangle className="h-12 w-12 text-amber-600" />
          </div>
          <h3 className="text-2xl font-bold text-amber-700">
            Your application has been Flagged by NCC for further review.
          </h3>
          <p className="text-slate-600">
            This doesn't mean your application is denied. Our team will contact you for additional information to complete the review process.
          </p>
          
          <div className="bg-amber-50 p-4 rounded-md text-left">
            <div className="flex items-center mb-3">
              <FileText className="h-5 w-5 text-amber-700 mr-2" />
              <h4 className="font-semibold text-amber-800">Application Status</h4>
            </div>
            
            <div className="space-y-3">
              <p className="text-sm text-amber-800 flex items-center">
                <span className="font-semibold w-32">Reference:</span> 
                <span>{referenceNumber}</span>
              </p>
              <p className="text-sm text-amber-800 flex items-center">
                <span className="font-semibold w-32">Status:</span> 
                <span className="bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full text-xs font-medium">Manual Review Required</span>
              </p>
              <p className="text-sm text-amber-800 flex items-center">
                <Calendar className="h-4 w-4 mr-2" /> 
                <span className="font-semibold w-28">Submitted:</span> 
                <span>{issueDate}</span>
              </p>
              <p className="text-sm text-amber-800 flex items-center">
                <Calendar className="h-4 w-4 mr-2" /> 
                <span className="font-semibold w-28">Expected:</span> 
                <span>2-3 business days</span>
              </p>
            </div>
            
            <div className="mt-4 pt-3 border-t border-amber-200">
              <h4 className="font-semibold text-amber-800 mb-2">Additional Information Needed</h4>
              <ul className="space-y-2 text-sm text-amber-800">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mt-1.5 mr-2"></span>
                  Additional identity verification documentation
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mt-1.5 mr-2"></span>
                  Confirmation of previous address history
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mt-1.5 mr-2"></span>
                  Clarification on name variations (if applicable)
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-md text-left mt-4">
            <h4 className="font-semibold text-amber-800 mb-2">What's Next?</h4>
            <ul className="space-y-2 text-sm text-amber-800">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mt-1.5 mr-2"></span>
                A representative will contact you within 2-3 business days.
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mt-1.5 mr-2"></span>
                Check your email for communication from our verification team.
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mt-1.5 mr-2"></span>
                Have your reference number and ID ready when responding.
              </li>
            </ul>
          </div>
        </>
      )}
      <div className="flex justify-center space-x-4 pt-4">
        <Button 
          variant="outline" 
          onClick={onReset}
        >
          Start New Application
        </Button>
        <Button
          className="bg-teal-600 hover:bg-teal-700"
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default ResultsDisplay;
