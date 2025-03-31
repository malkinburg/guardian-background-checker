
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle } from "lucide-react";

interface ResultsDisplayProps {
  result: "cleared" | "flagged" | null;
  onReset: () => void;
  onClose: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, onReset, onClose }) => {
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
            <p className="text-sm text-green-800">
              <span className="font-semibold">NCC Reference:</span> GCP-{Math.floor(100000 + Math.random() * 900000)}
            </p>
            <p className="text-sm text-green-800">
              <span className="font-semibold">Status:</span> Cleared
            </p>
            <p className="text-sm text-green-800">
              <span className="font-semibold">Issued:</span> {new Date().toLocaleDateString()}
            </p>
            <p className="text-sm text-green-800">
              <span className="font-semibold">Valid Until:</span> {new Date(Date.now() + 365*24*60*60*1000).toLocaleDateString()}
            </p>
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
            <p className="text-sm text-amber-800">
              <span className="font-semibold">NCC Reference:</span> GCP-{Math.floor(100000 + Math.random() * 900000)}
            </p>
            <p className="text-sm text-amber-800">
              <span className="font-semibold">Status:</span> Manual Review Required
            </p>
            <p className="text-sm text-amber-800">
              <span className="font-semibold">Submitted:</span> {new Date().toLocaleDateString()}
            </p>
            <p className="text-sm text-amber-800">
              <span className="font-semibold">Expected Response:</span> 2-3 business days
            </p>
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
