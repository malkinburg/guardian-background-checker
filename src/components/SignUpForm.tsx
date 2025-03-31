
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface SignUpFormProps {
  onClose: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onClose }) => {
  const navigate = useNavigate();
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
  
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    
    // Store form data in session storage
    sessionStorage.setItem('personalDetails', JSON.stringify(formData));
    
    toast({
      title: "Application Submitted",
      description: "Your application has been received. Proceeding to the detailed check process.",
    });
    
    // Close the modal
    onClose();
    
    // Navigate to personal details page
    navigate("/personal-details");
  };

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
              I understand and consent to the background check through Guardian Care Pro.
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
          Start Background Check
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
